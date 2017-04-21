var request = require("request");
var blockchainInfoAPI = "https://api.blockchain.info/charts/market-price?timespan=5weeks&rollingAverage=1days&format=json";


// sen get request to Bitcoin price API
request( blockchainInfoAPI, function(error, response, body) {
  if (error) {console.log(error);}
  // Parse to from json string to object
  var filteredMarketData = ( JSON.parse(body) ).values;
  // convert unix time to YYMMDD format
  for (var i = 0; i < filteredMarketData.length; i++) {
    filteredMarketData[i]["x"] = unixtime2YYMMDD( filteredMarketData[i]["x"] );
  }
  // Package for API
  var priceData = {data: filteredMarketData };
  console.log(priceData)


  send data to Cyfe dashboard widget API-endpoint
  request.post(
    "https://app.cyfe.com/api/push/58f92260867121476148803224444",
    { json: priceData },
    function(error, response, body) {
      console.log(body);
    }
  );
});



// Time conversion for spreadsheet



function padZero(number) {
    if (number < 10) {
        number = "0" + number;
    }

    return number;
}

function unixtime2YYMMDD(unixtime) {
    var milliseconds = unixtime * 1000,
        dateObject = new Date(milliseconds),
        temp = [];

    temp.push(dateObject.getUTCFullYear().toString().slice(2));
    temp.push(padZero(dateObject.getUTCMonth() + 1));
    temp.push(padZero(dateObject.getUTCDate()));

    return temp.join("");
}
