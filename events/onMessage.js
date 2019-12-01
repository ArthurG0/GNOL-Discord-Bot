
let indexFile = require('../index.js');

module.exports = (client, msg) => {
    //load the prefix, defined in index.js
    var CMD_PREFIX = indexFile.prefix;
    var helptext = indexFile.helptext;

    //if message is sent by the bot, ignore it
    if (msg.author == client.user) return;

    //if the channel is sent outside of bot-exp, ignore it
    if (msg.channel != client.channels.get('560673275232124929')) return;

    mapNumMessages = indexFile.mapNumMessages;
    mapNumMessages.set(msg.author.id, mapNumMessages.get(msg.author.id) + 1)
    //if message starts with the prefix, it's a command.
    if (msg.content.startsWith(CMD_PREFIX)) {
        parseCommand(client, msg, msg.content.substr(1).split(" "));
        return;
    }

    //
    
    

    // let numEnding = "th"
    // if (mapNumMessages.get(msg.author.id) % 10 == 1 && mapNumMessages.get(msg.author.id) != 11) numEnding = "st"
    // if (mapNumMessages.get(msg.author.id) % 10 == 2 && mapNumMessages.get(msg.author.id) != 12) numEnding = "nd"
    // if (mapNumMessages.get(msg.author.id) % 10 == 3 && mapNumMessages.get(msg.author.id) != 13) numEnding = "rd"


    //msg.channel.send(msg.author.toString() + " says: " + msg + '\n' + "It's their " + mapNumMessages.get(msg.author.id) + numEnding + " message!")
    msg.react("👀");
    if (msg.content.indexOf("nice") != -1) msg.react("👍");

    if (msg.content.indexOf("nice job") != -1) msg.react("❤️");


}

function parseCommand(client, message, args) {

    //console.log("mentioned: " + message.mentions);
    switch (args[0]) {
        case "coinflip":

            require('../commands/coinflip.js')(client, message, args);
            break;

        case "rand":

            require('../commands/rand.js')(client, message, args);
            break;

        case "giverole":

            require('../commands/giverole.js')(client, message, args);
            break;
        case "howmany":

            require('../commands/howmany.js')(client, message, args);
            break;

        case "revokeroles":
            require('../commands/revokerole.js/')(client, message, args);
            break;

        case "help":
            require('../commands/help.js')(client, message, args);
            break;

        case "weather":
            require('../commands/weather.js')(client, message, args);
            break;


        default:
            return;
    }
}