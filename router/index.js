const express = require('express');
const router = express.Router();
const data = require('../data.json');
const projects = data.projects;


router.get('/', (req, res) => {
    res.render('index', { data: projects });
})

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/project', (req, res) => {
    res.render('project')
    
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

module.exports = router;