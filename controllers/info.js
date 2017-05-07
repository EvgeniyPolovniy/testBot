const Telegram = require('telegram-node-bot');

class InfoController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  runMenu($) {
    $.runMenu({
      message: 'Выбери что-то:',
      layout: [1, 2, 1],
      'Пользователь': () => {
        $.sendMessage(JSON.stringify($.message.from), {
          reply_markup: JSON.stringify({
            remove_keyboard: true
          })
        });
      },
      'test2': () => {
        this.runMenu($)
      },
      'test3': () => {
        this.runMenu($)
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
    //$.runInlineMenu({
    //  layout: 2, //some layouting here
    //  method: 'sendMessage', //here you must pass the method name
    //  params: ['text'], //here you must pass the parameters for that method
    //  menu: [
    //    {
    //      text: '1', //text of the button
    //      callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
    //        console.log(1)
    //      }
    //    },
    //    {
    //      text: 'Exit',
    //      message: 'Are you sure?',
    //      layout: 2,
    //      menu: [ //Sub menu (current message will be edited)
    //        {
    //          text: 'Yes!',
    //          callback: () => {
    //
    //          }
    //        },
    //        {
    //          text: 'No!',
    //          callback: () => {
    //
    //          }
    //        }
    //      ]
    //    }
    //  ]
    //})
  }

  get routes() {
    return {
      'infoCommand': 'infoHandler'
    }
  }
}

module.exports = InfoController;
