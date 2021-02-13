const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>You made an oppsie👉👈👀. Go fix it babe 😘 #404</h1>')
});

module.exports = router;