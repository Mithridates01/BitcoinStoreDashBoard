var request = require("request");
var dateFns = require("date-fns");
var parse = require('date-fns/parse');
var subDays = require('date-fns/sub_days')
var format = require('date-fns/format')
// https://bitcoin-com-store.myshopify.com/admin/orders.json?status=any&created_at_min=2017-04-01&created_at_max=2017-05-01&fields=created-at,total-price&limit=250&page=1
// COUNT of orders
// https://bitcoin-com-store.myshopify.com/admin/orders/count.json?status=any&created_at_min=2017-04-01&created_at_max=2017-05-01

// SPLIT IMPLEMENTATION
// DUE to Shopify API request records limitation of 250 max; This will check total number of purchases for last 30 days
// and then split into multiple requests if total is greater than 250; then reassemble into one object
var apiKey             = process.env.SPOTIFY_API_KEY;
var apiPassword        = process.env.SPOTIFY_API_PASSWORD; //my be same as key
var hostname           = "bitcoin-com-store.myshopify.com";
var orderRecordsPath   = "/admin/reports.json";
var orderRecordsParams = "?status=any&created_at_min=2017-04-01&created_at_max=2017-05-01&fields=created-at,total-price&limit=250&page=1";

// last 30 days
var shopifyOrderRecords = "https://" + apiKey + ":" + apiPassword + "@" + hostname ;

// check order count

// function for picking starting date of last 30 days
var dateFormat = "YY-MM-DD"
var yesterdayDT = subDays( parse(Date.now()), 1 );
var endingYYMMDD = format(yesterdayDT, dateFormat);
var startingYYMMD = format(subDays( yesterdayDT, 30 ), dateFormat )
console.log(yesterdayDT, endingYYMMDD, startingYYMMD);


  // subtract 30 days for starting date

var shopifyOrderCount = "https://" + apiKey + ":" + apiPassword + "@" + hostname + orderCountPath + orderCountParams;
var orderCountPath     = "/admin/orders/count.json";
var orderCountParams   = "?status=any&created_at_min=" + "2017-04-01" + "&created_at_max=" + "2017-05-01";

// var orderCount;
// var shopifyRecordsLimit = 250;
// request( shopifyOrderCount, function(error, response, body) {
//   if (error) {
//     console.log(error);
//   } else {
//     orderCount = JSON.parse(body).count;
//     console.log(orderCount);
//   }
// });


// if (orderCount > shopifyRecordsLimit) {
//   // break into 15 requests; 2 day spans
// }


// request( spotifySalesApi, function(error, response, body) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });



// CREATE REPORT IMPLEMENTATION
// THIS CODE SHOULD CREATE A SALES REPORT WITH POST AND THEN BE ABLE TO PULL REPORT WITH REQUEST.
// WHEN SITE HAS MORE TRAFFIC THIS SHOULD BE IMPLEMENTED TO IMPROVE EFFICIENCY.

// var apiKey      = process.env.SPOTIFY_API_KEY;
// var apiPassword = process.env.SPOTIFY_API_PASSWORD; //my be same as key
// var hostname    = "bitcoin-com-store.myshopify.com";
// var path        = "/admin/reports.json";
// var query       = "";

// ORDER DATES AND PRICES

// var createReport = {
//   "report": {
//     "name": "A new app report",
//     "shopify_ql": "SHOW total_sales BY country FROM order ORDER BY total_sales SINCE -1m UNTIL today"
//   }
// }

// var spotifySalesApi = "https://" + apiKey + ":" + apiPassword + "@" + hostname + path ;



// request.post(
//   spotifySalesApi,
//   {json: createReport},
//   function(error, response, body) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });

// request( spotifySalesApi, function(error, response, body) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });
