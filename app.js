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
                var request = unirest("GET", "https://sister.yudharta.ac.id/rest/mahasiswa/index");
                    request.query({
                        "mhs_nim": "201569040006",
                    });
                    request.setHeader('SISTER_API_KEY', '1DB01956C3FDE2B6FB39AA275E22F1B2');
                    request.send("{}");
                    request.end(function(response) {
                        res.send(JSON.stringify({
                            "fulfillmentText" : response
                        }));
                        // if(response.error) {
                        //     res.setHeader('Content-Type', 'application/json');
                        //     res.send(JSON.stringify({
                        //         "fulfillmentText" : "Error. Can you try it again ? ",
                        //         "fulfillmentText" : "Error. Can you try it again ? "
                        //     }));
                        // } else if(response.body.results.length > 0) {
                        //     let result = response.body.results;
                        //     let output = '';
                        //     for(let i = 0; i<result.length;i++) {
                        //         output += result[i].title;
                        //         output+="\n"
                        //     }
                        //     res.setHeader('Content-Type', 'application/json');
                        //     res.send(JSON.stringify({
                        //         "fulfillmentText" : output,
                        //         "fulfillmentText" : output
                        //     })); 
                        // }
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
