const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const Joi = require('joi');

app.use("/bootstrap", express.static('./bootstrap/'));

const schema = Joi.object({
  name: Joi.string(),
  quote: Joi.string()
})

const rules = Joi.array().items(schema);

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function () {
  console.log('listening on 3000')
})


app.post('/LEDon', function(req, res) {
  console.log('LEDon button pressed!');
  // Run your LED toggling code here
});

app.post('/books', function(req, res) {
  console.log('LEDon button pressed!');
  res.sendFile(__dirname + '/books.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
  var form = req.body;

  var list = [];

  if (form.name != '' && form.quote != '') {

    fs.readFile('file.json', "UTF8", function (err, data) {
      if (err) { console.log('Error Reading File!') }
      try {
        list = JSON.parse(data);
        var test = rules.validate(list)
        console.log(test);
        console.log("Done")

        process(list);
      }
      catch (e) { console.log('JSON not valid') }
    });

    function process(list) {

      list.push(form);

      fs.writeFile('file.txt', JSON.stringify(list), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      res.redirect('/')
    }
  }
  else {
    console.log('Nothing Written');
    res.redirect('/emptyFieldsError');
  }
})

app.get('/emptyFieldsError', (req, res) => {
  res.sendFile(__dirname + '/emptyFieldsError.html');
})

