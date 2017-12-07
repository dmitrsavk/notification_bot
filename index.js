var TelegramBot = require('node-telegram-bot-api');


var token = '477749278:AAG8ZL2Nc78-3e-ORnMcVuBRF6JDjeQ1aKk';

var bot = new TelegramBot(token, {polling: true});

var notes = [];

var regexp = /\/напомни (.+) в (.+)/i;

bot.onText(regexp, function(msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push({
        uid: userId,
        time: time,
        text: text
    });

    bot.sendMessage(
        userId,
        'Отлично! Я обязательно напомню, если не сдохну :)'
    );
});

bot.onText(/\/help/i, function(msg, match) {
    var message = 'Напишите боту "/напомнить <напоминание> в <время>"\n';
    message += 'Например: "/напомнить поесть в 13:00"';

    bot.sendMessage(msg.from.id, message);
});

bot.on('new_chat_members', (msg) => {
    var message = 'Напишите боту "/напомнить <напоминание> в <время>"\n';
    message += 'Например: "/напомнить поесть в 13:00"';

    bot.sendMessage(msg.from.id, message);
});

setInterval(function() {
    for (var i = 0; i < notes.length; i++) {
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if (notes[i].time == curDate) {
                bot.sendMessage(
                    notes[i].uid,
                    'Напоминаю, что вы должны: ' + notes[i].text + ' сейчас.'
                );

                notes.splice(i, 1);
            }
        }
},10000);
