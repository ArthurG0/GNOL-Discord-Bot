module.exports = (client, message, args) => {

    if (args.length != 2 || !(args[1].startsWith("<@"))) {
        console.log(args.length);
        console.log(args[1]);
        message.channel.send('Usage: \`\`\`!revokeroles @<member>\`\`\`');
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

}