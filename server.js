const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const { request } = require('http');

const app =  express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Gett Request
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function(err, contents) {
    var words = JSON.parse(contents);
    res.send(words);
  });
});

// Post request
app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json',(err, data) => {
      // Check for error
      if (err) throw err;
      // Handle data gathering for json update
      let json = JSON.parse(data);
      let note = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv1()
      }
      // Add data to existing json array
      json.push(note);
  
      // Write updated json to array 
      fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
        // Check for error
        if (err) throw err;
        res.send('200');
      });
    });
  });