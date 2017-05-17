exports.handler = function(event, context, callback) {

  var request = require("request");

  //blockchain.info API calls for coin pricing 
  var twoWeekBtcPriceDates = "https://api.blockchain.info/charts/market-price?timespan=2weeks&rollingAverage=1days&format=json";
  var thirtyDayBtcPriceDates = "https://api.blockchain.info/charts/market-price?timespan=30days&rollingAverage=1days&format=json";

  // Cyfe Chart Endpoint APIs
  var CyfeEndPointBtc30daychart = process.env.CYFE_CHART_API;

  // 30 day chart for bitcoin price
  request( thirtyDayBtcPriceDates, function(error, response, body) {
    if (error) {console.log(error);}

    marketData = filterMarketData( ( JSON.parse(body) ).values );

    // Dashboard API payload;
    // Onduplicate prevents matching data from past combining in dashboard
    var priceData = {       data: marketData,
                     onduplicate: { "BTC-USD": "replace"},
                       yaxisshow: {"BTC-USD": "1"}
                    };
                    console.log(priceData);
    // send data to Cyfe dashboard widget API-endpoint
    request.post(
      CyfeEndPointBtc30daychart,
      { json: priceData },
      function(error, response, body) {
        console.log(body);
      }
    );


  });

  function filterMarketData(objectArr) {
    for (var i = 0; i < objectArr.length; i++) {
      objectArr[i].y = round( objectArr[i].y, 2 );
      objectArr[i].x = unixtime2YYMMDD( objectArr[i].x );
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


  // Use callback() and return information to the caller.
  callback(Error, Object);
};