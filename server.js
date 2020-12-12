const express = require('express');
const bodyParser= require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
  var form = req.body;
  
  var list = [];
  
  if(form.name != '' && form.quote != ''){
    fs.readFile('file.txt', "UTF8", function (err, data) {
      if(err){console.log('Error Reading File!')}
      console.log('C');
      list = JSON.parse(data);
      console.log('D');
      process(list);
    });
    function process(list){
      console.log('A');
      list.push(form);
      console.log('B');
      fs.writeFile('file.txt', JSON.stringify(list), function (err) {
          if (err) throw err;
            console.log('Saved!');
          });
          res.redirect('/') 
    }
  }
  else{
    console.log('Nothing Written');
    res.redirect('/emptyFieldsError');
  }
})

app.get('/emptyFieldsError', (req, res) => {
  res.sendFile(__dirname + '/emptyFieldsError.html');
})

