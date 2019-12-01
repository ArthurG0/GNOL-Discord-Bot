module.exports = (client, message, args) => {
    var gnol_server = require('../index.js').gnol_server;

    if (args.length < 3) {
        message.channel.send('Usage: \`\`\`!giverole @<member> <roleName>\`\`\`');
        return;
    }

    if (args[1].indexOf("@") != 1) {
        message.channel.send('Usage: \`\`\`!giverole @<member> <roleName>\`\`\`');
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
        message.channel.send(targetMember.user.toString() + ' is being promoted to ' + role.name + '!');
    }
    else {
        console.log("Role not found");
        message.channel.send('Role ' + rolename + 'not found.');
    }



}