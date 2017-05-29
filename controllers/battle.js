const Telegram = require('telegram-node-bot');
const mainMenu = require('../methods/mainMenu');

class BattleController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  battleHandler($) {
    $.sendMessage('Battle')
  }

  get routes() {
    return {
      'battleCommand': 'battleHandler'
    }
  }
}

module.exports = BattleController;