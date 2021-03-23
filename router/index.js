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
        //Without adding a next(), the app hangs on bad requests and logs errors on good requests?
        next();
    }
});

//Creates error
router.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    err.message = "Not Found";
    next(err);
  });
  
// //General error handler middleware
router.use((err, req, res, next) => {
    res.status = err.status || 500;
    res.message = err.message || 'Something Went Wrong';
    if(res.status === 404){
        res.render('page-not-found', { err: res });
        console.log(err.status, err.message);
    } else {
        res.render('error', { err: res });
        console.log(err.status, err.message);
    }
});

module.exports = router