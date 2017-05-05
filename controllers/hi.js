const Telegram = require('telegram-node-bot');

class HiController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  hiHandler($) {
    $.sendPhoto({ path: `${__dirname}/../img/cat.jpg`}).then(() => {
      $.sendMessage('Привет!');
    });
  }

  get routes() {
    return {
      'hiCommand': 'hiHandler'
    }
  }
}

module.exports = HiController;
