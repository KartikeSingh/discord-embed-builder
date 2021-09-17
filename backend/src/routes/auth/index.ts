import { Router } from 'express';

const router = Router();

const passport = require('passport');

router.get('/login', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('http://localhost:3001/api/auth')
});

router.get('/', (req, res) => {
    res.send(req.user);
})

export default router;