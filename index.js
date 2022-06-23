// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});



// whenever there is : it is a url parameter, and we can access it by req.params
app.get(`/api/:input`, (req, res) => {
    let input = req.params.input;
    let unix;
    let utc;

    if (input.includes('-') && !input.startsWith('-')){
      unix = new Date(input).getTime();
      utc = new Date(input).toString();
    
    } else {
      unix = parseInt(input);
      utc = new Date(unix).toString();
    }
   
    res.send({
      unix: unix,
      utc: utc
    });
  }
);

const port = process.env.PORT || 3000 ;

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
