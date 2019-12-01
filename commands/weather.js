
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = (client, message, args) => {

    console.log('weather command called');

    if (args.length < 2) {
        console.log(args.length);
        message.channel.send('Usage: \`\`\`!weather <City>\`\`\`');
        return;
    }
    var cityArguments = "";
    for(var i = 1; i < args.length; i++){
        cityArguments += args[i];
        if(i+1 < args.length) cityArguments += " ";
    }
    console.log(cityArguments);
    
    const httpRequest = new XMLHttpRequest();
    var weather_url = "https://api.openweathermap.org/data/2.5/weather"
    var full_url = weather_url + "?q=" + cityArguments + "&appid=" + process.env.OPEN_WEATHER_APIKEY;
    //this is needed when city is ambiguous, and city is san jose
    if(cityArguments === "San Jose") full_url = weather_url + "?id=5392171" + "&appid=" + process.env.OPEN_WEATHER_APIKEY;
    console.log(full_url);
    httpRequest.open("GET", full_url, true);
    var weather_response;
    httpRequest.onreadystatechange = function () {
        //if the request has returned:
        if (httpRequest.readyState === 4) {
            console.log('\n' + httpRequest.responseText);
            weather_response = JSON.parse(httpRequest.responseText);
            console.log('name of city: ' + weather_response.name);
            console.log('country' + weather_response.sys.country);
            console.log('weather, raw:cel ' + weather_response.main.temp + ':' + (weather_response.main.temp-273.15));
            console.log('weather description:' + weather_response.weather[0].description);
            console.log(message.author.toString());


            var messagetext = message.author.toString() + ", weather report for " + weather_response.name + "," + weather_response.sys.country + ":\n";
            messagetext +=  weather_response.weather[0].description + "\n";
            messagetext += "Temperature: " + (weather_response.main.temp-273.15) + "°C\n";
            messagetext += "Wind speed: " + weather_response.wind.speed + "m/s\n";

            message.channel.send(messagetext)




        }
    };
    httpRequest.send();
    console.log('sent!');



}