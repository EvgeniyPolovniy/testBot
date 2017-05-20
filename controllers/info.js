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
      layout: [1, 2, 2],
      'Кто я?': () => {
        client.get({ uri: 'user', query: { id } }).then(function (response) {
          if (response.length > 0) {
            $.sendMessage(`Зареган как "${response[0].firstName}"`);
          } else {
            $.sendMessage('Ты не зареган!');
          }
          self.runMenu($);
        }).catch(function (err) {
          $.sendMessage(`Ощибка в запросе! ${JSON.stringify(err)}`);
          self.runMenu($);
        });
      },
      'Все пользователи': () => {
        client.get('user').then(function (response) {
          $.sendMessage(JSON.stringify(response));
          self.runMenu($);
        }).catch(function (err) {
          $.sendMessage(`Ощибка в запросе! ${JSON.stringify(err)}`);
          self.runMenu($);
        });
      },
      'Зарегай меня!': () => {
        client.get({ uri: 'user', query: { id } }, { fullResponse: true }).then(function (response) {
          if (response.body.length === 2) {
            client.put('user', {
              id: $.message.from.id,
              username: $.message.from.username,
              firstName: $.message.from.firstName
            }).then((res) => {
              $.sendMessage(`Зарегал как "${res[0].firstName}"`);
              self.runMenu($);
            }).catch((err) => {
              $.sendMessage(`Ощибка в запросе! ${JSON.stringify(err)}`);
              self.runMenu($);
            });
          } else {
            $.sendMessage('Ты уже зареган!');
          }
          self.runMenu($);
        }).catch(function (err) {
          $.sendMessage(`Ощибка в запросе! ${JSON.stringify(err)}`);
          self.runMenu($);
        });
      },
      'Удали меня!': () => {
        client.get({ uri: 'user', query: { id } }).then(function (response) {
          if (response.length > 0) {
            client.delete({ uri: 'user/{id}', params: { id: response[0]._id } }).then(function (res) {
              $.sendMessage('Удалил!');
              self.runMenu($);
            }).catch(function (err) {
              $.sendMessage(`Ощибка в запросе! ${JSON.stringify(err)}`);
              self.runMenu($);
            });
          } else {
            $.sendMessage('Нет тебя!');
            self.runMenu($);
          }
        }).catch(function (err) {
          $.sendMessage(`Ощибка в запросе! ${JSON.stringify(err)}`);
          self.runMenu($);
        });
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
