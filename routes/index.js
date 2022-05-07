const express   = require('express');
const router    = express.Router();
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')
const passport  = require('passport')
const User      = require("../Models/User");
const Comm = require("../Models/Comments");

router.get('/', forwardAuthenticated,(req, res) =>
    res.render('welcome'));

router.get('/main', ensureAuthenticated,(req, res) =>
    res.render('main',{
        user:req.user
    }));

router.get('/profile/:name', ensureAuthenticated,async (req, res) => {
    let name = req.params.name;
    let user = await User.findOne({name: name});
    Comm.find({name:name}, (err, docs)=>{
        console.log(docs)
        res.render('profile',{
            user:req.user,
            user1: user,
            comments:docs,
        })
    })
})

router.get('/profile/edit/:name', ensureAuthenticated,async (req, res) => {
    let name = req.params.name;
    let user = await User.findOne({name: name});
    res.render('editP', {
        user1: user,
        user:req.user
    })
})
router.post('/profile/edit/:name', ensureAuthenticated, (req,res)=>{
    const{name, age, status} = req.body;
    const name1 = req.params.name

    User.findOne(({name:name1}))
        .then(id=>{
            User.updateOne({name:name1}, {$set: {name, status, age}},
                (err) => {
                    if (err){
                        throw err;
                    } else {
                        res.redirect('/profile/'+name1)
                    }
                })
        })
})

router.get('/profile2', ensureAuthenticated,(req, res) =>{
    let name = req.user.name
    Comm.find({name:name}, (err, docs)=>{
        console.log(docs)
        res.render('profile2',{
            user:req.user,
            comments:docs,
        })
    })

})



router.get('/edit/',ensureAuthenticated,(req, res) => {
    res.render('edit', {
        user: req.user
    })
})

router.post('/edit' ,ensureAuthenticated,(req, res) =>{
        const{name, age, status, game, city} = req.body;
        const _id = req.user._id

        User.findOne(({_id:_id}))
            .then(_id=>{
                User.updateOne({_id}, {$set: {name, age, status, game, city}},
                    (err) => {
                        if (err){
                            throw err;
                        } else {
                            res.redirect('/profile2')
                        }
                    })
            })
        console.log(req.body)
    });


module.exports = router;
