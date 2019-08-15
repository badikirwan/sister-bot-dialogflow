server.use(bodyParser.json());
server.post('/webhook', function (req, res) {
    if(req.body.queryResult.intent.displayName == "LihatNilaiAkademik") {
        if(req.body.queryResult.action == "LihatNilaiAkademik.LihatNilaiAkademik-custom" && req.body.queryResult.parameters.nim != null 
            && req.body.queryResult.parameters.semester != null) {
                var request = unirest("GET", " https://sister.yudharta.ac.id/rest/hasil_studi/nilai");
                    request.headers({
                        "SISTER_API_KEY": ""
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
                                "fulfillmentText" : "Kesalahan. Bisakah Anda mencobanya lagi? ",
                            }));
                        } else if(response.body.data.length > 0) {
                            let result = response.body.data;
                            let output = '';
                            for(let i = 0; i<result.length;i++) {
                                output += i+1 + ". " + result[i].mk_nama + " : " + result[i].nilai_huruf;
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
                    "SISTER_API_KEY": ""
                });
                request.query({
                    "id_smtr": req.body.queryResult.parameters.tahun
                });
                request.send("{}");
                request.end(function(response) {
                    if(response.error) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({
                            "fulfillmentText" : "Kesalahan. Bisakah Anda mencobanya lagi?",
                        }));
                    } else if(response.body.data.length > 0) {
                        let result = response.body.data;
                        let output = '';
                        for(let i = 0; i<result.length;i++) {
                            output += i+1 + ". " + result[i];
                            output+="\n"
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({
                            "fulfillmentText" : output,
                        })); 
                    }
                });              
        }
    } 
});
