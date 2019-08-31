// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/timestamp/:date_string?",(req,res)=>{
  const time = req.params.date_string;
  let date;


  function checkFormat(time,convertTime) {
    // check if number format
      if (isNaN(convertTime)) {
        date = new Date(decodeURI(time));
    } else {
      // check ISO-8601 format
      Date.parse(convertTime)
        date = new Date(convertTime * 1000);
    }
  }
  


  function displayResult () {
    let unix = Math.round(date.getTime());
    let utf = [date.toUTCString()].join(' ');
    if(!unix || !utf) res.send({"error" : "Invalid Date" })
    res.send({"unix":unix,"utf":utf});
  }

  checkFormat(time,Number(time))
    displayResult();


});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});