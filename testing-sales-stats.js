const request = require('request');
const EventEmitter = require('events').EventEmitter;
// Dates Library modules
const parse = require('date-fns/parse');
const subDays = require('date-fns/sub_days')
const format = require('date-fns/format')

// SPLIT IMPLEMENTATION
    // due to Shopify API request records limitation of 250 max; This will check total number of purchases for last 30 days
    // and then split into multiple requests if total is greater than 250; then reassemble into one object
var apiKey             = process.env.SHPOTIFY_API_KEY;
var apiPassword        = process.env.SHPOTIFY_API_PASSWORD;
var hostname           = "bitcoin-com-store.myshopify.com";

// create date range last 30 days
var dateFormat = "YYYY-MM-DD"
var yesterdayDT = subDays( parse(Date.now()), 1 );

var dateRang = {
  endingYYYYMMDD  : format(yesterdayDT, dateFormat),
  startingYYYYMMD : format(subDays( yesterdayDT, 30 ), dateFormat )
}
// console.log(dateRang.startingYYYYMMD, dateRang.endingYYYYMMDD);

var orderCountPath     = "/admin/orders/count.json";
var orderCountParams   = "?status=any&created_at_min=" + dateRang.startingYYYYMMD + "&created_at_max=" + dateRang.endingYYYYMMDD;
var shopifyOrderCount = "https://" + apiKey + ":" + apiPassword + "@" + hostname + orderCountPath + orderCountParams;
// console.log(shopifyOrderCount);


// Check order count
var orderCount;
var shopifyRecordsLimit = 250;

request( shopifyOrderCount, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    orderCount = JSON.parse(body).count;
    console.log(orderCount);

    if (orderCount > shopifyRecordsLimit) {
      // break into 15 requests; 2 day spans
      // console.log("to many orders");
      // retreiveShopifySalesData()
      console.log(retreiveShopifySalesData());
    } else {

    }
  }
});


function sendSalesDataCyfeDashBoard() {


}

function orgSalesData() {

}

function shopifyAPICalls(argument) {
  // body...
}

function combineMultiDataCallResults(){

}



function retreiveShopifySalesData(startDate, endDate, callback) {
  startDate = startDate || dateRang.startingYYYYMMD;
  endDate   = endDate   || dateRang.endingYYYYMMDD;
  console.log("start & end dates",startDate,endDate);

  var salesData;

  var orderRecordsPath   = "/admin/orders.json";
  var orderRecordsParams = "?status=any&created_at_min=" + startDate + "&created_at_max=" + endDate + "&fields=created-at,total-price&limit=250&page=1";
  var shopifyOrderRecords = "https://" + apiKey + ":" + apiPassword + "@" + hostname + orderRecordsPath + orderRecordsParams;

// This is way to nested.... get help with refactor
  request.get(shopifyOrderRecords, function(error, response, body){
    console.log(error);
    // console.log(body);
    salesData = body;
  })
  // return data
  while (salesData === undefined) {};
  console.log(salesData, "logging");
  return salesData;
}
