const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//forr making code reusable
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
//epress middleware
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n');
  next();
});

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/', (req, res) =>{
   res.render('home.hbs', {
    pageTitle: 'Home Page' ,
    welcomeMessage: 'Welcome to dashboard'
   });
});

app.get('/about', (req, res) =>{
   res.render('about.hbs', {
    pageTitle: 'About Page'
   });
});

app.get('/project', (req, res) =>{
  res.render('project.hbs', {
   pageTitle: 'Title : Project Page'
  });
});

//bad - send back json with errorMessage
app.get('/bad', (req, res) =>{
   res.send({
    errorMessage: 'Unable to handle request'
   });
});

app.listen(3000, ()=>{
console.log('Server is up on port 3000');
});
