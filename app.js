const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const apiKey = "XXXX";
    const query = req.body.cityName;
    const url = "https://api.weatherapi.com/v1/current.json?key=7fd6ee5501c748e3b7a73000233003&q=" + query;

    https.get(url, function(response) {

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.current.temp_f;
            const description = weatherData.current.condition.text;
            const icon = weatherData.current.condition.icon;
            const imgURL = "https:" + icon;
            res.write("<h1>The temperate in "+ query +" is " + temp +"f</h1>");
            res.write("<h3>The weather is currently: " + description +"</h3>");
            res.write("<img src=" + imgURL +">");
            res.send();
        })
    })
})



app.listen(6507, function(){
    console.log("Now listening on 6507");
});
