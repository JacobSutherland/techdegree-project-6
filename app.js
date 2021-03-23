const express = require('express');
const app = express();
const routes = require('./router/index.js');
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.set('view engine', 'pug');

app.listen(process.env.PORT || port, console.log(`Server is live on port ${port}`));