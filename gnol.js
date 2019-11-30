const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv/config');
require('./.env');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//console.log(process.env)
const TOKEN = process.env.GNOL_BOT_TOKEN;
let gnol_server;

const helptext = "List of commands:\n- !coinflip - bot will respond with a message \"heads\" of \"tails\", tagging the user\n- !rand and !rand <argument> - bot will respond with a random number from 1 to the indicated argument (10 by default)" +
    "\n- !giverole @<user> <rolename> - if a role exists on a server, bot will grant a user such a role" +
    "\n- !revokeroles @<user> - bot will revoke all server roles of the user specified" +
    "\n- !howmany - bot will respond with the number of messages that exist in a channel since it was last deployed" +
    "\n- !help - bot will respons with the text describing different commands" + 
    "\n- !weather <City> - bot will respond with the current weather for the specified city, if it can"



console.log(TOKEN);
client.login(TOKEN);

client.on('ready', () => {
    console.log("Connected as: " + client.user.tag)


    //this prints all available commands into console
    //console.log(helptext)



    //client.user.setActivity("you from outside", {type: "WATCHING"})

    //prints name of all servers it's connected to

    gnol_server = client.guilds.find(guild => guild.name === 'Gnol-Server')

    var mapNumMessages = new Map()
    gnol_server.members.forEach((member) => {
        mapNumMessages.set(member.user.id, 0);
    })

    //this lists all members in the guild
    // gnol_server.members.forEach((member) =>{
    //     console.log(member.user.id)
    //     console.log(member.user.username)
    //     console.log(member.user.discriminator)
    //     console.log('\n')
    // })

    let me = gnol_server.members.find(member => member.user.username === 'ArthurG')
    let bgdn = gnol_server.members.find(member => member.user.discriminator === '8218')
    let self = gnol_server.members.find(member => member.id === '534190085625741342')
    //console.log(bgdn.user.username)
    //bgdn.user.send("Hello, user:" + bgdn.user.username + ":" + bgdn.user.discriminator + ", nice to see you.")
    //console.log("message sent")

    var date = new Date(Date.now());
    //console.log()
    //bot-experiments: 560673275232124929
    let bot_exp = client.channels.get("560673275232124929");
    
    
    
    //bot greets
    bot_exp.send(me.user.toString() + ' I am online!\nTime is ' + date.getHours() + ':' + date.getMinutes() + ':' + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()));

    /* this code sends a text message in order I want
    let insta_avatar = new Discord.Attachment("https://i.ytimg.com/vi/nQ7XUCBcAQg/maxresdefault.jpg")
    setTimeout(function(){
        bot_exp.send("You'll pay for this.\nBots >> Humans")
    }, 300)
    bot_exp.send("You shouldn't have shared my existence with your instagram, human", insta_avatar)
    */

















    const CMD_PREFIX = '!';
    client.on('message', (msg) => {
        if (msg.author == client.user) return
        else if (msg.channel == bot_exp) {

            //if message starts with the prefix, it's a command.
            if (msg.content.startsWith(CMD_PREFIX)) {

                parseCommand(msg.content.substr(1).split(" "), msg);

                return;
            }

            mapNumMessages.set(msg.author.id, mapNumMessages.get(msg.author.id) + 1)
            let numEnding = "th"
            if (mapNumMessages.get(msg.author.id) % 10 == 1 && mapNumMessages.get(msg.author.id) != 11) numEnding = "st"
            if (mapNumMessages.get(msg.author.id) % 10 == 2 && mapNumMessages.get(msg.author.id) != 12) numEnding = "nd"
            if (mapNumMessages.get(msg.author.id) % 10 == 3 && mapNumMessages.get(msg.author.id) != 13) numEnding = "rd"
            bot_exp.send(msg.author.toString() + " says: " + msg + '\n' + "It's their " + mapNumMessages.get(msg.author.id) + numEnding + " message!")
            msg.react("👀")
            if (msg.content.indexOf("nice") != -1) msg.react("👍")
        }

    })

})

function parseCommand(args, message) {
    //console.log("mentioned: " + message.mentions);
    switch (args[0]) {
        case "coinflip":

            var rand = Math.random();
            if (rand > 0.5) message.channel.send('heads');
            else message.channel.send('tails');
            break;

        case "rand":

            var ceiling = args.length > 1 ? parseInt(args[1]) : 10;
            message.channel.send(Math.floor(Math.random() * ceiling + 1));
            break;

        case "giverole":

            if (args.length < 3) {
                message.channel.send('Usage: !giverole @<member> <roleName>');
                return;
            }
            else {

                if (args[1].indexOf("@") === -1) {
                    message.channel.send('Usage: !giverole @<member> <roleName>');
                    return;
                }

                var authorMember = message.channel.guild.members.find(tmp => tmp.user.id === message.author.id)
                var targetMember = message.channel.guild.members.find(tmp => tmp.user.id === message.mentions.users.array()[0].id)
                if (!targetMember) {
                    console.log('Undefined person');
                    return;
                }

                var rolename = "";
                for (var i = 2; i < args.length; i++) rolename += args[i] + " ";
                rolename = rolename.substr(0, rolename.length - 1);
                var role = (gnol_server.roles.find(role => role.name === rolename));
                if (role != null) {
                    console.log(targetMember.user.toString() + ' is being promoted to ' + role.name + '!');
                    targetMember.addRole(role.id);
                    message.channel.send(targetMember.user.toString() + ' has been promoted to ' + role.name + '!');
                }
                else {
                    console.log("Role not found");
                    message.channel.send('Role ' + rolename + 'not found.');
                }
            }

            break;
        case "howmany":
            console.log(message.channel.messages.size);
            message.channel.send('Channel contains ' + message.channel.messages.size + ' messages')

            break;

        case "revokeroles":
            if (args.length != 2 || !(args[1].startsWith("<@"))) {
                console.log(args.length);
                console.log(args[1]);
                message.channel.send('Usage: !revokeroles @<member>');
                return;
            }
            else {
                var targetMember = message.channel.guild.members.find(tmp => tmp.user.id === message.mentions.users.array()[0].id)
                if (!targetMember) {
                    console.log('Undefined person');
                    return;
                }
                targetMember.removeRoles(targetMember.roles);
                message.channel.send(targetMember.user.toString() + '\'s roles have been revoked')
            }
            break;

        case "help":
            if (args.length == 1) {
                message.channel.send(helptext)
            }
            break;

        case "weather":
            if (args.length < 2) {
                console.log(args.length);
                console.log(args[1]);
                message.channel.send('Usage: !weather <City>');
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
            return;


        default:
            return;
    }
}

