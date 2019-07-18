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
                var request = unirest("GET", " https://sister.yudharta.ac.id/rest/hasil_studi/nilai");
                    request.headers({
                        "SISTER_API_KEY": "1DB01956C3FDE2B6FB39AA275E22F1B2"
                    });
                    request.query({
                        "nim": req.body.queryResult.parameters.nim,
                        "smt": req.body.queryResult.parameters.semester
                    });
                    request.send("{}");
                    request.end(function(response) {
                        if(response.error) {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                "fulfillmentText" : "Error. Can you try it again ? ",
                            }));
                        } else if(response.body.data.length > 0) {
                            let result = response.body.data;
                            let output = '';
                            for(let i = 0; i<result.length;i++) {
                                output += i+1 + ". " + result[i].mk_nama + "\n"+ "Nilai : " + result[i].nilai_huruf;
                                output+="\n"
                            }
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                "fulfillmentText" : output,
                            })); 
                        }
                    });
                
            }
    } else if(req.body.queryResult.intent.displayName == "LihatKalenderAkademik") {
        if(req.body.queryResult.action == "LihatKalenderAkademik" && req.body.queryResult.parameters.tahun != null) {
            var request = unirest("GET", "https://sister.yudharta.ac.id/rest/kalender/index");
                request.headers({
                    "SISTER_API_KEY": "1DB01956C3FDE2B6FB39AA275E22F1B2"
                });
                request.query({
                    "id_smtr": req.body.queryResult.parameters.tahun
                });
                request.send("{}");
                request.end(function(response) {
                    if(response.error) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({
                            "fulfillmentText" : "Error. Can you try it again ? ",
                        }));
                    } else if(response.body.data.length > 0) {
                        let result = response.body.data;
                        // let output = '';
                        // for(let i = 0; i<result.length;i++) {
                        //     output += result;
                        //     output+="\n"
                        // }
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({
                            "fulfillmentText" : result,
                        })); 
                    }
                });              
        }
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
