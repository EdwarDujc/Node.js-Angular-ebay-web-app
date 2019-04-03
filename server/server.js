var express = require("express");
var request = require("request");
var fs = require("fs");
fs.readdir("static/", function(err, files) {
   if (err) {
    fs.mkdir("static/", function(err) {
         if (err) {
             return console.error(err);
         }
         console.log("dir success");
     });
   }
});
var detailsPhotoArray;
var app = express();

app.get("/process_get", function(req, res) {

    var response;
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    console.log(req.query);

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

    console.log(url);

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body);
        res.send(body);
      }
    });

});

app.get("/details", function(req, res) {
  var response;
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  console.log(req.query);

  var url = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=Jincheng-USCCSCI5-PRD-916e2f5cf-2683f609&siteid=0&version=967&ItemID=";
  url += req.query.itemId;
  url += "&IncludeSelector=Description,Details,ItemSpecifics";

  console.log(url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body);
      res.send(body);
    }
  });
});

app.get("/photo*.png", function(req, res) {
    console.log(req.path);
    var index = req.path.substring(6);
    var hou = index.indexOf(".png");
    index = index.substring(0, hou);
    let urlPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + detailsPhotoArray[index].width + "&photoreference=" + detailsPhotoArray[index].photo_reference + "&key=" + googleapikey;

    res.redirect(urlPhoto);
});

app.get("/processing", function(req, res) {
    res.redirect("/");
});

app.get("/search-results", function(req, res) {
    res.redirect("/");
});

app.get("/place-detail", function(req, res) {
    res.redirect("/");
});

app.get("/favorate-results", function(req, res) {
    res.redirect("/");
});

app.use(express.static("dist"));

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("server run http://%s:%s", host, port);

});
