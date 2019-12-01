module.exports = (client, message, args) => {
    if (args.length != 1) {
        message.channel.send('Usage: \n\`\`\`!help\`\`\`');
        return;
    }
        console.log(require('../index.js').helptext)
        message.channel.send(require('../index.js').helptext);
        return;
}