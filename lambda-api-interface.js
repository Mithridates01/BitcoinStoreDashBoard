var request = require("request");

request("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR", function(error, response, body) {
  console.log("no error" || error);
  console.log(body);
});


