const express = require('express');
const mustacheExpress = require ('mustache-express');
const app = express();
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/test';

const port = process.env.PORT || 3000;

const beerData = require('./public/beers.json')

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (request, response) => {
    MongoClient.connect(dbUrl, async (err, db) => {
        var userData = beerData
        // var userData = await db.collection('data').find({}).toArray();
        response.render('index', {userData: userData})
    });
});

// app.get('/user/:id', (request, response) => {
//   MongoClient.connect(dbUrl, async (err, db) => {
//       var userData = await db.collection('beers').find({id: parseInt(request.params.id)}).toArray();
//       console.log(userData[0]);
//       response.render('user-page', userData[0]);
//   });
// });
//
// app.get('/unemployed', (request, response) => {
//     MongoClient.connect(dbUrl, async (err, db) => {
//         var userData = await db.collection('beers').find({job: null}).toArray();
//         response.render('employment', {userData:userData})
//     });
// });
//
// app.get('/employed', (request, response) => {
//     MongoClient.connect(dbUrl, async (err, db) => {
//         var userData = await db.collection('beers').find({job: { $ne: null}}).toArray();
//         response.render('employment', {userData: userData})
//     });
// });

app.listen(port);
