var fs = require('fs');
var yahooFinance = require("yahoo-finance");

var restify = require('restify')
var server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

var request = require('request')

 
var customers = require('./stocks.js')

request.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20%3D%20%22goog%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(err, res, body) {
  if (err) {
    console.log("Error")
  }
  console.log(body)
  
})


server.get('/stockmarket', function(req, res) {
  console.log('GET /stockmarket')
  const searchTerm = req.query.q
  console.log('q='+searchTerm)
  

  customers.search(searchTerm, function(data) {
    console.log(data)
    res.setHeader('content-type', 'application/json');
    res.send(data.code, data.response);
    res.end();
  })
})

server.post('/stockmarket', function(req, res) {
  console.log('POST /')
  const auth = req.authorization
  const body = req.body
  const host = req.headers.host
  console.log(typeof req.files)
  customers.add(host, auth, body, req.files, function(data) {
    console.log('DATA RETURNED')
    console.log(data)
    res.setHeader('content-type', 'application/json');
    res.send(data.code, data.response);
    res.end();
  })
})

var port = process.env.PORT || 8080;
server.listen(port, function (err) {
  if (err) {
      console.error(err);
  } else {
    console.log('App is ready at : ' + port)}
  })

