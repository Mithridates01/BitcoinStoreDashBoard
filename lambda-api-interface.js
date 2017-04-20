var request = require("request");

var cryptoCompareAPI = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";
var blockchainInfoAPI = "https://api.blockchain.info/charts/Market-Price?timespan=5weeks&format=json";

var testData = [
    {
      "x": 1489622400,
      "y": 1180.945657142857
    },
    {
      "x": 1489708800,
      "y": 1091.1718875
    },
    {
      "x": 1489795200,
      "y": 952.2323625
    },
    {
      "x": 1489881600,
      "y": 1029.8008125000001
    },
    {
      "x": 1489968000,
      "y": 1049.0844875
    },
    {
      "x": 1490054400,
      "y": 1118.6300428571428
    },
    {
      "x": 1490140800,
      "y": 1028.7268625
    },
    {
      "x": 1490227200,
      "y": 1038.789
    }
];

// sen get request to Bitcoin price API
request( blockchainInfoAPI, function(error, response, body) {
  if (error) {
    console.log(error);
  }

                     // JSON.parse(body)
  var priceData = {data: [ testData ]};


  // send data to Cyfe dashboard widget API-endpoint
  request.post(
    "https://app.cyfe.com/api/push/58f92260867121476148803224444",
    { json: priceData },
    function(error, response, body) {
      console.log(body);
    }
  );
});
