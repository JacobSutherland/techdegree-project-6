const express = require('express');
const app = express();
const routes = require('./router/index.js');
const newError = require('./middleware/newError.js');
const throwError = require('./middleware/throwError.js');
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(newError);
app.use(throwError);


app.set('view engine', 'pug');

app.listen(process.env.PORT || port, console.log(`Server is live on port ${port}`));