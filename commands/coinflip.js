module.exports = (client, message, args) => {
    var rand = Math.random();
    if (rand > 0.5) message.channel.send('heads');
    else message.channel.send('tails');
    return;
}