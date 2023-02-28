const express = require("express");
const mainRouter = express.Router()
const userModel = require("../models/userModel");

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
        req.body.password = await /**crypto.cryptPassword**/(req.body.password);
        let newUser = new userModel(req.body)
        await newUser.save()
        res.redirect('/userLogin')
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

mainRouter.get('/', async (req, res) => {
    try {
        res.redirect('/companyLogin')
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})


module.exports = mainRouter