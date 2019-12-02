module.exports = (client) => {
    console.log("Connected as: " + client.user.tag);

    var gnol_server = require('../index').gnol_server;
    var bot_exp = require('../index').bot_exp;
    var me = gnol_server.members.find(member => member.user.username === 'ArthurG')

    var date = new Date(Date.now());

    //send a message to #bot-experiments, tagging me (Arthur), and with Time/Date
    //bot_exp.send(me.user.toString() + ' I am online!\nTime is ' + date.getHours() + ':' + date.getMinutes() + ':' + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()));
    return;
}