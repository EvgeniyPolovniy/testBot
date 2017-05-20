const Telegram = require('telegram-node-bot');
const RequestClient = require('reqclient').RequestClient;

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
    $.sendMessage(`Привет, ${$.message.from.firstName}`);
    client.get({ uri: 'user', query: { id: $.message.from.id } }).then(function (response) {
      if (response.length > 0) {
        $.sendMessage(`Зареган как "${response[0].firstName}"`);
      } else {
        $.sendMessage('У тебя еще нет персонажа, давай его создадим. Введи ник своего персонажа:');
        $.waitForRequest.then((msg) => {
          self.createHero($, $.message.from.id, msg.message.text);
        });
      }
    }).catch(function (err) {
      $.sendMessage(`Ощибка в запросе! ${JSON.stringify(err)}`);
    });
  }

  createHero($, user, name) {
    $.runInlineMenu({
      layout: 2, // some layouting here
      method: 'sendMessage', // here you must pass the method name
      params: [`Точно "${name}"?`], // here you must pass the parameters for that method
      menu: [{
        text: 'Да', // text of the button
        // to your callback will be passed callbackQuery and response from method
        callback: (callbackQuery, message) => {
          client.post('hero', {
            userId: user,
            heroName: name
          }).then(() => {
            $.sendMessage(`Поздравляю, твой Герой создан!`);
          }).catch((err) => {
            $.sendMessage(`Ощибка в запросе! ${JSON.stringify(err, message)}`);
          });
        }
      }, {
        text: 'Нет', // text of the button
        // to your callback will be passed callbackQuery and response from method
        callback: (callbackQuery, message) => {
          console.log(message, name);
        }
      }// , {
      //   text: 'Exit',
      //   message: 'Are you sure?',
      //   layout: 2,
      //   menu: [{ // Sub menu (current message will be edited)
      //     text: 'Yes!',
      //     callback: () => {
      //     }
      //   }, {
      //     text: 'No!',
      //     callback: () => {
      //     }
      //   }]
      // }
      ]
    });
  }

  get routes() {
    return {
      startCommand: 'startHandler'
    };
  }
}

module.exports = StartController;
