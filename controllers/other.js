const Telegram = require('telegram-node-bot');

class OtherCommandController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    $.sendMessage('Я не понимаю :(');
  }
}

module.exports = OtherCommandController;
