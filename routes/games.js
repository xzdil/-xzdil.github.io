const express   = require('express');
const router    = express.Router();

const {ensureAuthenticated, admin} = require("../config/auth");
const Game = require("../Models/Game");
const Comm = require("../Models/Comments");

function authRole(role){
    return (req,res,next)=>{
        if (req.user.role !== role) {
            res.render('main', {
                user:req.user
            });
        } else{
            next();
        }
    }}

router.get('/show/:name', ensureAuthenticated,async (req, res) => {
    let name = req.params.name;
    let comm = await Comm.find({gameName: name})
    console.log(comm + 'coms')
    Game.findOne({name: name}, (err, docs) => {
        console.log(docs)
        res.render('game', {
            game: docs,
            user: req.user,
            coms: comm
        })
    })
})

router.post('/show/:name',ensureAuthenticated, (req,res)=>{
    let gameName = req.params.name
    let name = req.user.name
    let {com} = req.body
    Comm.findOne({com:com}).then(user=>{
        const newComm = new Comm({
            name,
            gameName,
            com,
        });
        newComm.save().then(user =>{
            res.redirect('/games/show/'+gameName);
        }).catch(err=> console.log(err))

    })
})

router.get('/add', ensureAuthenticated,authRole(1), (req,res)=>
    res.render('addgame',{
        user:req.user
    }));

router.post('/add',ensureAuthenticated,authRole(1),(req,res)=>{
    const { name, description } = req.body;
    let errors = [];

    if(errors.length>0){
        res.render('addGame', {
            errors,
            name,
            description
        });
        console.log(errors);
    } else{
        Game.findOne({ name : name })
            .then(async game => {
                if (game) {
                    errors.push({msg: 'Game is already exists'});
                    res.render('addGame', {
                        errors,
                        name,
                        description,
                    });

                } else {

                        const newGame = new Game({
                            name,
                            description,

                        });
                        newGame.save()
                            .then(game => {
                                req.flash('success_msg', 'Successfully registered!')
                                res.redirect('/games/show/' + name);
                            })
                            .catch(err => console.log(err))

                    }
                })
            }

})

router.get('/delete/:com', ensureAuthenticated,(req,res)=>{
    let com1 = req.params.com
    console.log(com1)
    console.log(Comm.findOneAndDelete({com:com1}, (err, docs)=>{
        console.log(docs + " Uka")
        res.redirect('/games/show/'+docs.gameName)
    }))
})

router.get('/', ensureAuthenticated,async (req, res) => {
    let games = await Game.find();
    res.render('games',{
        games:games,
        user:req.user
    })
})

router.get('/edit/:name', ensureAuthenticated, async (req, res) => {
    let name = req.params.name;
    let comm = await Comm.find({gameName: name})
    Game.findOne({name: name}, (err, docs) => {
        console.log(docs)
        res.render('editgame', {
            game: docs,
            user: req.user,
            coms: comm
        })
    })
})

router.post('/edit/:name', ensureAuthenticated, (req,res)=>{
    let name = req.params.name;
    let {avatar, developer, publisher, release, description, platforms} = req.body
    Game.findOneAndUpdate({name:name},{$set:{avatar, developer, publisher, release, description, platforms}}).then(res.redirect('/games/show/'+name))
})


module.exports = router;
