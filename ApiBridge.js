var request = require("request");
var blockchainInfoAPI = "https://api.blockchain.info/charts/market-price?timespan=5weeks&rollingAverage=1days&format=json";


// sen get request to Bitcoin price API
request( blockchainInfoAPI, function(error, response, body) {
  if (error) {console.log(error);}

  marketData = filterMarketData( ( JSON.parse(body) ).values )

  // Package for API
  var priceData = {data: marketData };
  console.log(priceData)


  // send data to Cyfe dashboard widget API-endpoint
  request.post(
    "https://app.cyfe.com/api/push/58fa37bbdb79f0278724893226715",
    { json: priceData },
    function(error, response, body) {
      console.log(body);
    }
  );
});


function filterMarketData(objectArr) {
  for (var i = 0; i < objectArr.length; i++) {
    objectArr[i]["y"] = round( objectArr[i]["y"], 2 );
    objectArr[i]["x"] = unixtime2YYMMDD( objectArr[i]["x"] );
    changeKeyName("x", "date", objectArr[i]);
    changeKeyName("y", "BTC-USD", objectArr[i]);
  }


  return objectArr;
}

// Rounding to nearest cent
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


// Rename object key 
function changeKeyName(currentKeyStr, newKeyStr, object) {
  if ( object.hasOwnProperty(currentKeyStr) ) {
    object[newKeyStr] = object[currentKeyStr];
    delete object[currentKeyStr];
  }
}


// Time conversion UNIX to YY-MM-DD
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

    return temp.join("-");
}
