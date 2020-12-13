const express = require('express');
const bodyParser= require('body-parser');
const fs = require('fs');
const app = express();
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string(),
  quote: Joi.string()
})


const rules = Joi.array().items(schema);


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


      // const value = schema.validate({ username: 'abc'});
      // console.log(value);

      // if(value.error != undefined){
      //   console.log('Invalid JSON')
      // }
      

    fs.readFile('file.json', "UTF8", function (err, data) {
      if(err){console.log('Error Reading File!')}      
      // console.log(schema.validate(data));
      // if(schema.validate(data).error != undefined){
      //   console.log('B');
      try{
        list = JSON.parse(data);
        var test = rules.validate(list)
        console.log(test);
        console.log("Done")

        process(list);
      }
      catch(e){console.log('JSON not valid')}
      // }
      //var input = Joi.array().items(data)
      
    });

    function process(list){
      
      list.push(form);
      
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

