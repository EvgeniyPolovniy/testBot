const Telegram = require('telegram-node-bot');
const mainMenu = require('../methods/mainMenu');

class HiController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  hiHandler($) {
    $.sendPhoto({ path: `${__dirname}/../img/cat.jpg`}).then(() => {
      $.sendMessage('Привет!').then(
        mainMenu($)
      );
    });
  }

  get routes() {
    return {
      'hiCommand': 'hiHandler'
    }
  }
}

module.exports = HiController;
