const StartController = require('./controllers/start');
const HiController = require('./controllers/hi');
const InfoController = require('./controllers/info');
const BattleController = require('./controllers/battle');
const OtherCommandController = require('./controllers/other');
const Telegram = require('telegram-node-bot');

const tg = new Telegram.Telegram('352043782:AAGxsChELExgAjTgXat6ePTY9sBD55xGzT4', {
  workers: 1
});

class CustomCommand extends Telegram.BaseCommand {
  /**
   * @param {function} filterCallback
   * @param {string} [handler]
   */
  constructor(filterCallback, handler) {
    super();
    this._filterCallback = filterCallback;
    this._handler = handler;
  }

  /**
   * @param {Scope} scope
   * @returns {boolean}
   */
  test(scope) {
    return this._filterCallback(scope)
  }

  /**
   * @returns {string}
   */
  get handlerName() {
    return this._handler;
  }
}

tg.router
  .when(new Telegram.TextCommand('/start', 'startCommand'), new StartController())
  .when(new Telegram.TextCommand('/hi', 'hiCommand'), new HiController())
  .when(new Telegram.TextCommand('/info', 'infoCommand'), new InfoController())
  .when(new CustomCommand(($) => {
    return $.message.text == '☠️ Бой';
  }, 'battleCommand'), new BattleController())
  .otherwise(new OtherCommandController());
