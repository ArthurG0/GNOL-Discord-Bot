module.exports = (client, message, args) => {

    if(args.length > 2){
        message.channel.send('Usage: \`\`\`!howmany\`\`\` for server info or\n\`\`\`!howmany @<member>\`\`\` for member info');
        return;
    }
    
    if(args.length == 1){
    console.log(message.channel.messages.size);
    message.channel.send('Channel contains ' + message.channel.messages.size + ' messages.');
    return;
    }

    if(args.length == 2){
        if(args[1].indexOf("@") != 1){
            message.channel.send('Usage: \`\`\`!howmany\`\`\` for server info or\n\`\`\`!howmany @<member>\`\`\` for member info');
            return;
        }
        var targetMember = message.channel.guild.members.find(tmp => tmp.user.id === message.mentions.users.array()[0].id);
        var map = require('../index.js').mapNumMessages;
        var memberMessageCount = mapNumMessages.get(targetMember.id);

        message.channel.send(targetMember.toString() + " has sent " + memberMessageCount + " messages in this channel so far.");
    }

}