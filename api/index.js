var fs = require('fs');
var yahooFinance = require("yahoo-finance");

var restify = require('restify')
var server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

 
var customers = require('./stocks.js')

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

server.get('/stockmarket2', function(req, res) {
  yahooFinance.historical ({
    symbol: 'AAPL',
    from: '2012-01-01',
    to: '2012-12-31',
}, function (err, quotes) {
  res.send(quotes);
});
})