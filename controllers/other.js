const Telegram = require('telegram-node-bot');

class OtherCommandController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    $.sendMessage('Такой команды нет...');
  }
}

module.exports = OtherCommandController;
