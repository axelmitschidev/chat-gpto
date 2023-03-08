const express = require("express");
const mainRouter = express.Router()
const userModel = require("../models/userModel");
const authGuard = require("../services/authGuard")
const store = require('store')

mainRouter.get('/register', async (req, res) => {
    try {
        res.render('register.twig')
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})
mainRouter.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        let newUser = new userModel(req.body)
        newUser.save()
            .then(() => {
                console.log('Utilisateur enregistré avec succès !');
            })
            .catch((err) => {
                console.log('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
            });
        res.redirect('/login')
    } catch (err) {
        res.send(err)
    }

})

mainRouter.get('/login', async (req, res) => {
    try {
        res.render('login.twig')
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

mainRouter.post('/login', async (req, res) => {
    try {
        let user = await userModel.findOne({
            name: req.body.name,
            password: req.body.password,
        })
        if (user) {
            
            req.session.userId = user._id
            store.set('test',user.nom)
            res.redirect('/home')
        } else {
            res.redirect('login')
        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

mainRouter.get('/', async (req, res) => {
    try {
        res.redirect('/login')
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

mainRouter.get('/home', authGuard, async (req, res) => {
    try {
        res.render('index.twig')
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})



module.exports = mainRouter