const HiController = require('./controllers/hi');
const InfoController = require('./controllers/info');
const OtherCommandController = require('./controllers/other');
const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram('352043782:AAGxsChELExgAjTgXat6ePTY9sBD55xGzT4', {
  workers: 1
});

tg.router.when(new Telegram.TextCommand('/hi', 'hiCommand'), new HiController())
  .when(new Telegram.TextCommand('/info', 'infoCommand'), new InfoController())
  .otherwise(new OtherCommandController());