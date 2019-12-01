module.exports = (client, message, args) => {
    if(args.length > 2){
        message.channel.send('Usage: \n\`\`\`!rand <optional ceiling = 10>\`\`\`');
        return;
    }
    var ceiling = args.length > 1 ? parseInt(args[1]) : 10;
    message.channel.send(Math.floor(Math.random() * ceiling + 1));
    return;
}