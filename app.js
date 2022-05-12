const express = require('express');
const path = require('path');
const app = express();

let port = 3000;
 
app.use(express.static(__dirname + '/public'));


app.listen(port, () => {
 console.log("Server listening on port " + port);
});

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/remindersdb");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

let loginSchema = new mongoose.Schema({
    username: String,
    password: String
   });

let User = mongoose.model("User", loginSchema);
   
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/addusername', (req, res) => {
    let myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });