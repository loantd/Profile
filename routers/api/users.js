const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./../../config/keys');
const passport = require('passport');
const Validator = require('validator');
const User = require('./../../models/User')
const validateRegister = require('./../../validator/register')

router.get('/tets', (req, res) => {
    res.json('Hello work')
})

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(404).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exits' });
        } else {
            const avatar = gravatar.url(
                req.body.email, {
                    s: '200',//Size
                    r: 'pg',//Rating
                    d: 'mm'//Default
                }
            );
            const newUser = new User({
                name: req.body.name,
                email :req.body.email,
                avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        console.log('loi')
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    })
})
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'User not found' })
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    console.log(isMatch)
                    if (isMatch) {
                        // return res.json({
                        //     success: true,
                        //     message: 'Login Success'
                        // })
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }
                        jwt.sign(
                            payload,
                            keys.secretOrkey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                return res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })
                    } else {
                        return res.status(404).json({
                            success: false,
                            message: 'Password incorrect !!'
                        })
                    }
                })
        })
})
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            msg: 'Ok'
        });
    }
);
module.exports = router;