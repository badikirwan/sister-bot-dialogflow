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
                var request = unirest("GET", "http://rest.badikirwan.com/nilai_akademik/index");
                    request.query({
                        "mhs_nim": req.body.queryResult.parameters.nim,
                        "mhs_semester": req.body.queryResult.parameters.semester
                    });
                    request.send("{}");
                    request.end(function(response) {
                        if(response.error) {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                "fulfillmentText" : "Error. Can you try it again ? ",
                            }));
                        } else {
                            let result = response.body;
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                "fulfillmentText" : "Nilai akademik anda" + result.ipk,
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

    } else if(req.body.queryResult.intent.displayName == "KartuUjian"){

    }

});

function sendMessage(messageText) {
    res.send(JSON.stringify({
        "fulfillmentText" : messageText
    }));
}

function callAPI() {

}

server.listen(port, function () {
    console.log("Server is up and running...");
});
