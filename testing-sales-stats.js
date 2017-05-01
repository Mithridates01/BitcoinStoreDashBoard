// var request = require("request");



var apiKey      = process.env.SPOTIFY_API_KEY;
var apiPassword = process.env.SPOTIFY_API_PASSWORD; //my be same as key
var hostname    = "https://bitcoin-com-store.myshopify.com";
var path        = "";
var query       = "";


var spotifySalesApi = apiKey + ":" + apiPassword + "@" + path + query;

request( spotifySalesApi, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
  }
});

