const express = require ("express");
 const https = require ("https");
const bodyParser = require ("body-parser");



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.get ("/" ,function(req,res){
  res.sendFile(__dirname + "/index.html");

 });

app.post ("/" ,function (req,res){

const query = req.body.cityName;

const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=a4502196109633a209fdcd4865e4b811";

  https.get(url ,function(response){

   response.on("data",function(data){
     const weatherData = JSON.parse(data);
     const date = new Date;
     const currentDateTIme = date.toLocaleString('en-US')
     const temp =weatherData.main.temp;
     const icon = weatherData.weather[0].icon;
     const imgUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    const weatherDescription= weatherData.weather[0].description;
    res.write("<h1>the weather in " + query + " is " + temp + " degree celcious!</h1>");
    res.write("<h2>and the " + weatherDescription + " </h2>");
    res.write ("<img src=" + imgUrl + " >")
    res.write("<h3>the current time is " + currentDateTIme + "</h3>");
    res.send();

   });

 });
});



















app.listen (3000,function (req,res){
  console.log("server is running at port 3000")
});
