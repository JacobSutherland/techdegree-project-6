const express = require('express');
const { render } = require('pug');
const router = express.Router();
const data = require('../data.json');
const projects = data.projects;


router.get('/', (req, res) => {
    res.render('index', { data: projects });
})

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/project/:id', (req, res) => {
    const page = req.params.id;
    res.render('project', 
    { 
        data: projects[page],
        technologies: projects[page].technologies,
        images: projects[page].image_urls
    });
});

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    res.render('page-not-found', { error: error });
    next(err);
});

router.use((err, req, res, next) => {
    const error = err;
    err.status = 500;
    err.message = 'something went wrong'
    res.render('error', { error: error })
    console.log(err.status, err.message);
});

module.exports = router