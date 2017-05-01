var request = require("request");



var apiKey      = process.env.SPOTIFY_API_KEY;
var apiPassword = process.env.SPOTIFY_API_PASSWORD; //my be same as key
var hostname    = "bitcoin-com-store.myshopify.com";
var path        = "/admin/reports.json";
var query       = "";

// ORDER DATES AND PRICES
// https://bitcoin-com-store.myshopify.com/admin/orders.json?status=any&created_at_min=2017-04-01&created_at_max=2017-05-01&fields=created-at,total-price&limit=250&page=1
// COUNT of orders
// https://bitcoin-com-store.myshopify.com/admin/orders/count.json?status=any&created_at_min=2017-04-01&created_at_max=2017-05-01

var createReport = {
  "report": {
    "name": "A new app report",
    "shopify_ql": "SHOW total_sales BY country FROM order ORDER BY total_sales SINCE -1m UNTIL today"
  }
}

var spotifySalesApi = "https://" + apiKey + ":" + apiPassword + "@" + hostname + path ;



request.post(
  spotifySalesApi,
  {json: createReport},
  function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
  }
});

request( spotifySalesApi, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
  }
});
