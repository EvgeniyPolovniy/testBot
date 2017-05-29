const RequestClient = require('reqclient').RequestClient;

const client = new RequestClient({
  baseUrl: 'http://localhost:3000/api/',
  debugRequest: true,
  debugResponse: true
});

function mainMenu ($) {
  client.get({ uri: 'user/{id}', params: { id: $.message.from.id } }).then(function (user) {
    if (user._id && user.nick.length > 0) {
      let msg = ``;
      msg += `&#128372; Ник: <b>${user.nick}</b>&#10;`;
      msg += `&#128160; LvL: ${user.stats.lvl}&#10;`;
      msg += `&#10084; Health: ${user.stats.health}&#10;`;
      msg += `&#9876; Strength: ${user.stats.strength}&#10;`;
      msg += `&#128737; Defence: ${user.stats.defence}&#10;`;
      msg += `&#127786; Dodge: ${user.stats.dodge}%&#10;`;
      $.runMenu({
        message: msg,
        layout: [3],
        resizeKeyboard: true,
        options: {
          parse_mode: 'HTML'
        },
        '🕴 Герой': () => {
          mainMenu ($, user);
        },
        '☠️ Бой': () => {
        },
        '🎒 Инвентарь': () => {
          $.sendMessage('В разработке');
          mainMenu ($, user);
        }
      });
    } else {
      $.sendMessage('/start');
    }
  });
};

module.exports = mainMenu;