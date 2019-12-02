module.exports = (client, message, args) => {

    console.log('revokerole is called with ' + args.toString());

    if (args.length < 3 || !(args[1].startsWith("<@"))) {
        console.log(args.length);
        console.log(args[1]);

        message.channel.send('Usage: \`\`\`!revokerole @<member> <role>\`\`\`or\n\`\`\`!revokerole @<member> all\`\`\`');
        return;
    }
    else {
        var targetMember = message.channel.guild.members.find(tmp => tmp.user.id === message.mentions.users.array()[0].id)
        if (!targetMember) {
            console.log(message.mentions.users.array()[0].toString() + ' not found.');
            message.channel.send(message.mentions.users.array()[0].toString() + ' not found.');
            return;
        }
        if(args[2] === "all"){
            targetMember.removeRoles(targetMember.roles);
            console.log('All roles were removed for ' + targetMember.toString());
            message.channel.send('All roles were removed for ' + targetMember.toString());
            return;
        }
        var role = "";
        for(var i = 2; i < args.length; i++){
            role += args[i];
            if(i+1 < args.length) role += " ";
        }
        console.log('-' + role + '-');
        var arr = message.channel.guild.roles.array();
        for(var j = 0; j < arr.length; j++){
            console.log(arr[j].name);
        }
        //console.log(message.channel.guild.roles.array().toString());
        var desiredRole = message.channel.guild.roles.find(r => r.name === role);
        if(desiredRole === null){
            console.log(role + ' doesn\'t exist in the guild.');
            message.channel.send(role + ' doesn\'t exist in the guild.');
            return;
        }

        if(targetMember.roles.find(r => r === desiredRole) === null){
            console.log(targetMember.toString() + ' doesn\'t have ' + role + ' as their role.');
            message.channel.send(targetMember.toString() + ' doesn\'t have ' + role + ' as their role.');
            return;
        }

        targetMember.removeRole(desiredRole);
        console.log('Revoking ' + role + ' from ' + targetMember.toString());
        message.channel.send('Revoking ' + role + ' from ' + targetMember.toString());
        return;

    }

}