var express = require("express");
var request = require("request");

// var FrontUrl = "http://localhost:4200";
var FrontUrl = "http://csci571-jincheng-nodejs.us-east-2.elasticbeanstalk.com:8081";

var app = express();

app.get("/search", function(req, res) {

    var response;
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Origin", FrontUrl);
    // console.log(req.query);

    var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=Jincheng-USCCSCI5-PRD-916e2f5cf-2683f609&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50";
    var filterId = 0;
    //keyword
    url += "&keywords=" + req.query.keyword;
    //buyerPostalCode
    if (req.query.zipcodeCustom === "false") {
      url += "&buyerPostalCode=" + req.query.hereZipcode;
    } else {
      url += "&buyerPostalCode=" + req.query.userZipcode;
    }
    //maxDistance
    url += "&itemFilter(" + filterId + ").name=MaxDistance&itemFilter(" + filterId + ").value=" + req.query.distance;
    filterId ++;
    //shipping option
    if (req.query.shipping_free !== "false") {
      url += "&itemFilter(" + filterId + ").name=FreeShippingOnly&itemFilter(" + filterId + ").value=true";
      filterId ++;
    }
    if (req.query.shipping_local !== "false") {
      url += "&itemFilter(" + filterId + ").name=LocalPickupOnly&itemFilter(" + filterId + ").value=true";
      filterId ++;
    }
    //hide duplicate items
    url += "&itemFilter(" + filterId + ").name=HideDuplicateItems&itemFilter(" + filterId + ").value=true";
    filterId++;
    //condition
    if (req.query.condition_new !== "false" || req.query.condition_used !== "false" || req.query.condition_unspecified !== "false") {
      url += "&itemFilter(" + filterId + ").name=Condition";
      var conditionId = 0;
      if (req.query.condition_new !== "false") {
        url += "&itemFilter(" + filterId + ").value(" + conditionId + ")=New";
        conditionId++;
      }
      if (req.query.condition_used !== "false") {
        url += "&itemFilter(" + filterId + ").value(" + conditionId + ")=Used";
        conditionId++;
      }
      if (req.query.condition_unspecified !== "false") {
        url += "&itemFilter(" + filterId + ").value(" + conditionId + ")=Unspecified";
        conditionId++;
      }
      filterId++;
    }
    //category
    var categoryId = "";
    if (req.query.category === "art") {
      categoryId = "550";
    } else if (req.query.category === "baby") {
      categoryId = "2984";
    } else if (req.query.category === "books") {
      categoryId = "267";
    } else if (req.query.category === "clothing_shoes_accessories") {
      categoryId = "11450";
    } else if (req.query.category === "computers_tablets_networking") {
      categoryId = "58058";
    } else if (req.query.category === "health_beauty") {
      categoryId = "26395";
    } else if (req.query.category === "music") {
      categoryId = "11233";
    } else if (req.query.category === "video_games_consoles") {
      categoryId = "1249";
    } else {
      categoryId = "";
    }
    if (categoryId !== "") {
      url += "&categoryId=" + categoryId;
    }
    //seller info
    url += "&outputSelector(0)=SellerInfo";
    //store info
    url += "&outputSelector(1)=StoreInfo";

    // console.log(url);

    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(body);
        res.send(body);
      }
    });

});

app.get("/details", function(req, res) {
  var response;
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Origin", FrontUrl);
  // console.log(req.query);

  var url = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=Jincheng-USCCSCI5-PRD-916e2f5cf-2683f609&siteid=0&version=967&ItemID=";
  url += req.query.itemId;
  url += "&IncludeSelector=Description,Details,ItemSpecifics";

  // console.log(url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      //console.log(body);
      res.send(body);
    }
  });
});

app.get("/photos", function(req, res) {
  var response;
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Origin", FrontUrl);
  // console.log(req.query);

  var url = "https://www.googleapis.com/customsearch/v1?q=";
  url += req.query.keyword;
  url += "&cx=017030067582812733545:tk2vekergf8&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyClpgG450XgRvNOkY_mdNIc5W0MJgXxlLo";

  // console.log(url);
  // url = "www.amazon.com";

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(body);
      res.send(body);
    }
  });
});

app.get("/similar", function(req, res) {
  var response;
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Origin", FrontUrl);
  // console.log(req.query);

  var url = "http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=Jincheng-USCCSCI5-PRD-916e2f5cf-2683f609&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=";
  url += req.query.itemId;
  url += "&maxResults=20";

  // console.log(url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(body);
      res.send(body);
    }
  });
});

app.get("/zipcode", function(req, res) {
  var response;
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Origin", FrontUrl);
  // console.log(req.query);

  var url = 'http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=';
  url += req.query.zipcode;
  url += "&username=edwardcsci571&country=US&maxRows=5";

  // console.log(url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(body);
      res.send(body);
    }
  });
});

app.use(express.static("csci571-hw8"));

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("server run http://%s:%s", host, port);

});
