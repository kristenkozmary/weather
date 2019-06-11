const request = require('request')
var router = require('express').Router();

const CITY_COUNT = 4

var milwaukee = "Milwaukee";
var minneapolis = "Minneapolis";
var chicago = "Chicago";
var dallas = "Dallas";

//city ids from openweathermap
var milwaukee_id = 5263045;
var minneapolis_id = 5037649;
var chicago_id = 4887398;
var dallas_id = 4684888;

  router.get('/', function (req, res) {
    
    var secret = process.env.API_KEY;
    
  	//build api URL 
    const baseUrl = "http://api.openweathermap.org/data/2.5/group?id=";

		const apiSpecifics = milwaukee_id + "," + minneapolis_id + "," + chicago_id + "," + dallas_id + "&units=imperial&appid=" + secret;

		const locations = (url1, url2) => {
		   let newUrl = url1 + url2;
		   return newUrl;
    };
  
    request(locations(baseUrl, apiSpecifics), function (err, response, body) {
      if(err){
        res.render('index', {milWeather: null, milDesc: null, minWeather: null, minDesc: null, chiWeather: null, chiDesc: null, dalWeather: null, dalDesc: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body);
        console.log(weather);
        if(weather.list[0].main == undefined){
          res.render('index', {milWeather: null, milDesc: null, minWeather: null, minDesc: null, chiWeather: null, chiDesc: null, dalWeather: null, dalDesc: null, error: 'Error, please try again'});
        } else {
          var i;
          for (i = 0; i <CITY_COUNT; i++) {
            if (weatherData.list[i].name == "Milwaukee") {
              console.log("made it to milwaukee");
              var milwaukee_temp = weatherData.list[0].main.temp + '&deg;';
              var milwaukee_desc = weatherData.list[0].description;
            } else if (weatherData.list[i].name == "Minneapolis") {
                console.log("made it to minneapolis");
                var minneapolis_temp = weatherData.list[1].main.temp + '&deg;';
                var minneapolis_desc = weatherData.list[1].description;
              } else if (weatherData.list[i].name == "Chicago") {
                console.log("made it to chicago");
                var chicago_temp = weatherData.list[2].main.temp + '&deg;';
                var chicago_desc = weatherData.list[2].description;
                } else if (weatherData.list[i].name == "Dallas") {
                  console.log("made it to dallas");
                  var dallas_temp = weatherData.list[1].main.temp + '&deg;';
                  var dallas_desc = weatherData.list[1].description;
                } 
            }
          res.render('index', {milWeather: milwaukee_temp, milDesc: milwaukee_desc, minWeather: minneapolis_temp, minDesc: minneapolis_desc, chiWeather: chicago_temp, chiDesc: chicago_desc, dalWeather: dallas_temp, dalDesc: dallas_desc, error: null});
        }
      }
    });
  })



module.exports = router;