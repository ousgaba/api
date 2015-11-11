var request = require('request')
var util = require('util');
var yahooFinance = require('yahoo-finance');
var parser = require('xml2json');

require('colors');

var _ = require('lodash');

var SYMBOLS = [
  'AAPL',
  'AMZN',
  'GOOGL',
  'YHOO'
];

var url =  'http://query.yahooapis.com/v1/public/yql';
var startDate = '2012-01-01';
var endDate = '2012-01-08';
var data = encodeURIComponent('show tables');
//encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("YHOO","AAPL","GOOG","MSFT") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');

// Use the following on the postscript 
// https://cde305-ousbah-2.c9.io/stockmarket?q=show%20tables&diagnostics=true

exports.search = function(query, callback) {
  console.log('search success')
  if (typeof query !== 'string' || query.length === 0) {
    callback({code:400, response:{status:'error', message:'missing query (q parameter)'}})
  }
  
 
  const query_string = {q: data, maxResults: 40}
  
  request.get({url: url, qs: query_string}, function(err, res, body) {
      
             console.log(body)
        
        var json = parser.toJson(body); //returns a string containing the JSON structure by default 
      // console.log(json);
 /*      
       var _return=json;
        
         
    var totalReturned = _return.query.count;
    //OR: var totalReturned = _return.query.results.quote.length;
    for (var i = 0; i < totalReturned; ++i) {
        var stock = _return.query.results.quote[i];
        var symbol = stock.symbol;
        var percent_change = stock.Change_PercentChange;
        var changeRealTime = stock.ChangeRealtime;
        
    
}
 */
  
 /*            const dataSet = yahooFinance.historical({
          symbols: SYMBOLS,
          from: '2012-01-01',
          to: '2012-12-31',
          period: 'd'
        }, function (err, result) {
          if (err) { throw err; }
          _.each(result, function (quotes, symbol) {
            console.log(util.format(
              '=== %s (%d) ===',
              symbol,
              quotes.length
            ).cyan);
            if (quotes[0]) {
              console.log(
                '%s\n...\n%s',
                JSON.stringify(quotes[0], null, 2),
                JSON.stringify(quotes[quotes.length - 1], null, 2)
              );
            } else {
              console.log('N/A');
            }
          });
        });

 */
 
    if (err) {
      callback({code:500, response:{status:'error', message:'search failed', data:err}})
    }
    
   
    callback({code:200, response:{status:'success', message:body.length+' Stocks found', data:body}})
  })
}