const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv/config');
require('./.env');

//console.log(process.env)
const TOKEN = process.env.GNOL_BOT_TOKEN;
console.log(TOKEN);
client.login(TOKEN);

client.on('ready', () => {
    console.log("Connected as: " + client.user.tag)
    //client.user.setActivity("you from outside", {type: "WATCHING"})
    
    //prints name of all servers it's connected to
    var guilds = client.guilds.array()
    for(let i = 0; i < guilds.length; i++){
        console.log(guilds[i].name)
    }
    let gnol_server = client.guilds.find(guild=> guild.name === 'Gnol-Server')

    var mapNumMessages = new Map()
    gnol_server.members.forEach((member) =>{
        mapNumMessages.set(member.user.id, 0);
    })

    //this lists all members in thÑƒ guild
    // gnol_server.members.forEach((member) =>{
    //     console.log(member.user.id)
    //     console.log(member.user.username)
    //     console.log(member.user.discriminator)
    //     console.log('\n')
    // })

    let bgdn = gnol_server.members.find(member => member.user.discriminator === '8218')
    //console.log(bgdn.user.username)
    //bgdn.user.send("Hello, user:" + bgdn.user.username + ":" + bgdn.user.discriminator + ", nice to see you.")
    //console.log("message sent")
    
    var date = new Date(Date.now());
    //console.log()
    //bot-experiments: 560673275232124929
    let bot_exp = client.channels.get("560673275232124929");
    bot_exp.send('@here I am online!\nTime is ' + date);

    /* this code sends a text message in order I want
    let insta_avatar = new Discord.Attachment("https://i.ytimg.com/vi/nQ7XUCBcAQg/maxresdefault.jpg")
    setTimeout(function(){
        bot_exp.send("You'll pay for this.\nBots >> Humans")
    }, 300)
    bot_exp.send("You shouldn't have shared my existence with your instagram, human", insta_avatar)
    */

    const CMD_PREFIX = '!';

    client.on('message', (msg) =>{
        if(msg.author == client.user) return
        else if(msg.channel == bot_exp){

            if(msg.content.indexOf(CMD_PREFIX) != 1){
                var response = parseCommand(msg.content.substr(1).split(" "));
                if(response != '') msg.reply(response);
                return;
            }

            mapNumMessages.set(msg.author.id, mapNumMessages.get(msg.author.id)+1)
            let numEnding = "th"
            if(mapNumMessages.get(msg.author.id)%10 == 1 && mapNumMessages.get(msg.author.id)!= 11) numEnding = "st"
            if(mapNumMessages.get(msg.author.id)%10 == 2 && mapNumMessages.get(msg.author.id)!= 12) numEnding = "nd"
            if(mapNumMessages.get(msg.author.id)%10 == 3 && mapNumMessages.get(msg.author.id)!= 13) numEnding = "rd"
            bot_exp.send(msg.author.toString() + " says: " + msg + '\n' + "It's their " + mapNumMessages.get(msg.author.id) + numEnding + " message!")
            msg.react("👀")
            if(msg.content.indexOf("nice") != -1) msg.react("👍")
        }

    })
  

    console.log("finished")
})

function parseCommand(args){
    switch(args[0]){
        case "coinflip" :
            var rand = Math.random();
            if(rand > 0.5) return 'heads';
            else return 'tails';
        break;
        case "rand" :
            var ceiling = args.length > 1 ? parseInt(args[1]) : 10;
            return Math.floor(Math.random()*ceiling + 1);
        break; 
        default:
            return '';
    }
}

