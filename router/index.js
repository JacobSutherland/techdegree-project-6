const express = require('express');
const router = express.Router();
const data = require('../data.json');
const projects = data.projects;

//Home page
router.get('/', (req, res) => {
    res.render('index', { data: projects });
})

//Abou page
router.get('/about', (req, res) => {
    res.render('about');
});

//Project page
//renders projects by checking search parameter against existing ids
router.get('/project/:id', (req, res, next) => {
    const page = req.params.id;
    //lists all existing ids
    const pages = projects.map( i => i.id);
    //checks if id exists and renders page
    if(pages.includes(page)){
        res.render('project', 
        { 
            data: projects[page],
            technologies: projects[page].technologies,
            images: projects[page].image_urls
        });
    } else {
        next();
    }
});
//General Error Handler 
router.use((req, res, next) => {
    const err = new Error('Uh oh, think you might be lost');
    err.status = 404 || 500;
    err.message = 'Not Found';
    next(err);
});

//recives Error object and throws error based on status code
router.use((err, req, res, next) => {
    if(err.status === 404) {
        res.render('page-not-found', { err: err });
        console.log(err.status, err.message);
    } else {
        err.message = 'Something Went Wrong';
        err.status = 500;
        res.render('error', { err: err });
        console.log(err.status, err.message);
    };
});

module.exports = router