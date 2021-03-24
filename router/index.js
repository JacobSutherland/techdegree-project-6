const express = require('express');
const router = express.Router();
const data = require('../data.json');
const projects = data.projects;

//Home page
router.get('/', (req, res) => {
    res.render('index', { data: projects });
})

//About page
router.get('/about', (req, res) => {
    res.render('about');
});

//Project page
//renders projects by checking search parameter against existing ids
router.get('/project/:id', (req, res, next) => {
    const page = parseInt(req.params.id);
    //lists all existing ids
    const pages = projects.map( i => parseInt(i.id));
    //checks if id exists and renders page
    if(pages.includes(page)){
        res.render('project', 
        { 
            data: projects[page],
            technologies: projects[page].technologies,
            images: projects[page].image_urls
        });
    } else {
        //Without next() call, page hangs indefinitely on bad requests and never reaches error handling middleware
        next();
    }
});

module.exports = router;