const Telegram = require('telegram-node-bot');
const RequestClient = require('reqclient').RequestClient;

const client = new RequestClient({
  baseUrl: 'http://localhost:3000/api/',
  debugRequest: true,
  debugResponse: true
});

const rem = {
  reply_markup: JSON.stringify({
    remove_keyboard: true
  })
};

class InfoController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  runMenu($) {
    const self = this;
    const id = $.message.from.id;
    $.runMenu({
      message: 'Выбери что-то:',
      layout: [3],
      options: {
        resize_keyboard: true,
        parse_mode: 'HTML'
      },
      'Кто я?': () => {

      },
      'Все пользователи': () => {

      },
      'Закрыть меню': () => {
        $.sendMessage('Закрыл', {
          reply_markup: JSON.stringify({
            remove_keyboard: true
          })
        });
      }
    });
  }
  infoHandler($) {
    this.runMenu($);
  }

  get routes() {
    return {
      infoCommand: 'infoHandler'
    };
  }
}

module.exports = InfoController;
