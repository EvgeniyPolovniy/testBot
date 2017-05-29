const Telegram = require('telegram-node-bot');
const RequestClient = require('reqclient').RequestClient;
const mainMenu = require('../methods/mainMenu');

const client = new RequestClient({
  baseUrl: 'http://localhost:3000/api/',
  debugRequest: true,
  debugResponse: true
});

class StartController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  startHandler($) {
    const self = this;
    client.get({ uri: 'user/{id}', params: { id: $.message.from.id } }).then(function (response) {
      if (response._id && response.nick.length > 0) {
        mainMenu($);
      } else {
        $.sendMessage('У тебя еще нет персонажа, давай его создадим.');
        self.waitForName($);
      }
    });
  }

  waitForName($) {
    const self = this;
    $.sendMessage('Введи ник:');
    $.waitForRequest.then((msg) => {
      self.createHero($, $.message.from.id, msg.message.text);
    });
  }

  createHero($, user, name) {
    const self = this;
    $.runInlineMenu({
      layout: 2, // some layouting here
      method: 'sendMessage', // here you must pass the method name
      params: [`Точно "${name}"?`], // here you must pass the parameters for that method
      menu: [{
        text: 'Да',
        callback: (callbackQuery, message) => {
          client.post(
            'user',
            {
              userName: $.message.from.userName,
              firstName: $.message.from.firstName,
              id: $.message.from.id,
              nick: name
            }
          ).then(function (user) {
            mainMenu($);
          });
        }
      }, {
        text: 'Нет',
        callback: (callbackQuery, message) => {
          self.waitForName($)
        }
      }]
    });
  }

  get routes() {
    return {
      startCommand: 'startHandler'
    };
  }
}

module.exports = StartController;
