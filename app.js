const express = require('express');
const app = express();
const routes = require('./router/index.js');

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.set('view engine', 'pug');

app.listen(3000);