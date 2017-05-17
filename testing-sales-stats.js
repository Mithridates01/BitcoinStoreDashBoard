const request = require('request'); // Do i still need this?
const rp = require('request-promise');
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


// General sudo code
  // make call for orders count
  // break up orders count based on number
  // make required number of API requests for information
  // join requests into one object
  // do statistical analysis
  // send data to endpoint


var shopifyOrderCountOptions = {
  uri: shopifyOrderCount,
  headers: { 'User-Agent': 'Request-Promise'},
  json: true
}

rp(shopifyOrderCountOptions)
  .then(function(countResponse){
    console.log(countResponse)
    var shopifyRecordsLimit = 250;
    var limitError = countResponse < 7499;
    
    if (countResponse > shopifyRecordsLimit && limitError) {
      retreiveShopifySalesData().then(function(){

      });
    } else {
      console.log("*** Warning: Shopify limit error line 57 *** ")

    }


  })
  .catch(function(error){
    console.log(error)
  });


function retreiveAllShopifySalesData(startDate, endDate){
  var orderRecordsPath   = "/admin/orders.json";
  var datesArr = createDates30(startDate, endDate); //returns end/start date array
  var salesData = {};

  for (let i = 0; i < datesArr.length; i++) {
    let startDate = datesArr[i][0];
    let endDate = datesArr[i][1];
    let shopifyOrderRecords = "https://" + apiKey + ":" + apiPassword + "@" + hostname + orderRecordsPath + 
    "?status=any&created_at_min=" + startDate + "&created_at_max=" + endDate + "&fields=created-at,total-price&limit=250&page=1";
    let shopifyOrderRecordsOptions = {
      uri: shopifyOrderRecords,
      headers: { 'User-Agent': 'Request-Promise'},
      json: true
    }

    rp(shopifyOrderRecordsOptions)
      .then(function(daysOrderRecords) {
        salesData[i] + daysOrderRecords;
      })
      .catch(function(error){
        console.log(error)
      })
  }
  // this function still needs to return snyc.
}


function createDates30(startDate, endDate) {
  startDate = startDate || dateRang.startingYYYYMMD;
  endDate   = endDate   || dateRang.endingYYYYMMDD;
  console.log("start & end dates",startDate,endDate);

}

  // var orderRecordsParams = "?status=any&created_at_min=" + startDate + "&created_at_max=" + endDate + "&fields=created-at,total-price&limit=250&page=1";



// function retreiveShopifySalesData(startDate, endDate, callback) {
//   startDate = startDate || dateRang.startingYYYYMMD;
//   endDate   = endDate   || dateRang.endingYYYYMMDD;
//   console.log("start & end dates",startDate,endDate);

//   var salesData;


// // This is way to nested.... get help with refactor
//   request.get(shopifyOrderRecords, function(error, response, body){
//     console.log(error);
//     // console.log(body);
//     salesData = body;
//   })
//   // return data
//   while (salesData === undefined) {};
//   console.log(salesData, "logging");
//   return salesData;
// }
