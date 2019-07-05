// dependencies
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');
var unirest = require("unirest");
let errorResposne = {
    results: []
};
var port = process.env.PORT || 8080;
// create serve and configure it.
const server = express();

server.use(bodyParser.json());
server.post('/webhook', function (req, res) {
    if(req.body.queryResult.intent.displayName == "LihatNilaiAkademik") {
        if(req.body.queryResult.action == "LihatNilaiAkademik.LihatNilaiAkademik-custom" && req.body.queryResult.parameters.nim != null 
            && req.body.queryResult.parameters.semester != null) {
                var request = unirest("GET", "https://api.themoviedb.org/3/movie/top_rated");
                    request.query({
                        "page": "1",
                        "language": "en-US",
                        "api_key": "33a4f2f91284c9133695dfba6bd802da"
                    });
                    request.send("{}");
                    request.end(function(response) {
                        if(response.error) {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                "fulfillmentText" : "Error. Can you try it again ? ",
                                "fulfillmentText" : "Error. Can you try it again ? "
                            }));
                        } else if(response.body.results.length > 0) {
                            let result = response.body.results;
                            let output = '';
                            for(let i = 0; i<result.length;i++) {
                                output += result[i].title;
                                output+="\n"
                            }
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                "fulfillmentText" : output,
                                "fulfillmentText" : output
                            })); 
                        }
                    });
                
            }
    } else if(req.body.queryResult.intent.displayName == "LihatKalenderAkademik") {
        if(req.body.queryResult.action == "LihatKalenderAkademik" && req.body.queryResult.parameters.tahun != null) {
            res.send(JSON.stringify({
                "speech" : "Error. Can you try it tahun ? ",
                "displayText" : "Error. Can you try it tahun ? "
            }));                
        }

    } else if(req.body.queryResult.intent.displayName == ""){

    }

});

function sendMessage() {

}

function callAPI() {

}

server.listen(port, function () {
    console.log("Server is up and running...");
});
