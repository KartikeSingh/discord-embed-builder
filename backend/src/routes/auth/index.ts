import { Router } from 'express';

const router = Router();

const passport = require('passport');

router.get('/login', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('http://localhost:3000/menu')
});

router.get('/', (req, res) => {
    res.send(req.user);
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000');
})

export default router;