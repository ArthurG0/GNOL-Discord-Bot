const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv/config');
require('./.env');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

handleMessage = require('./events/onMessage.js');

//console.log(process.env)
const TOKEN = process.env.GNOL_BOT_TOKEN;
let gnol_server;

const CMD_PREFIX = '!';
module.exports.prefix = CMD_PREFIX;
const helptext = "List of commands:" + 
    "\n- \`!ping\` - bot will respond with the appropriate message to establish communication :)" + 
    "\n- \`!coinflip\` - bot will respond with a message \"heads\" of \"tails\", tagging the user" +
    "\n- \`!rand <ceiling=10>\` - bot will randomly choose a number between 1 and ceiling specified" + 
    "\n- \`!giverole @<user> <rolename>\` - if a role exists in a server, bot will grant a user such a role" +
    "\n- \`!revokerole @<user> <rolename>\` or \`!revokerole @<user> all\` - bot will revoke the specified role from the user" +
    "\n- \`!howmany\` or \`!howmany @<user>\` - bot will respond with the number of messages sent in a channel or sent by the user" +
    "\n- \`!help\` - bot will respond with this help text" + 
    "\n- \`!weather <city>\` - bot will respond with the current weather for the specified city"
module.exports.helptext = helptext;

console.log(TOKEN);
client.login(TOKEN);

client.on('ready', () => {
    // console.log("Connected as: " + client.user.tag);
    gnol_server = client.guilds.find(guild => guild.name === 'Gnol-Server')
    module.exports.gnol_server = gnol_server;

    var mapNumMessages = new Map()
    gnol_server.members.forEach((member) => {
        mapNumMessages.set(member.user.id, 0);
    })
    module.exports.mapNumMessages = mapNumMessages;

    //this lists all members in the guild
    // gnol_server.members.forEach((member) =>{
    //     console.log(member.user.id)
    //     console.log(member.user.username)
    //     console.log(member.user.discriminator)
    //     console.log('\n')
    // })

    let bot_exp = client.channels.get("560673275232124929");
    module.exports.bot_exp = bot_exp;

   require('./events/onReady.js')(client)
})

client.on('message', (msg) => {
    handleMessage(client, msg);
})



