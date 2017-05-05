import config
import telebot
import sqlite3

bot = telebot.TeleBot(config.token)

# BD connect
conn = sqlite3.connect('example.db', check_same_thread=False)
c = conn.cursor()

# Create table
c.execute('''CREATE TABLE IF NOT EXISTS users (id number, name text)''')

# Save (commit) the changes
conn.commit()
# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
conn.close()


@bot.message_handler(commands=['hi'])
def sayHi(message):
  conn = sqlite3.connect('example.db', check_same_thread=False)
  c = conn.cursor()
  c.execute('SELECT * FROM users WHERE id=:id', {'id': message.chat.id})
  row = c.fetchall()
  print(row)
  print(message)
  if len(row) == 0:
    c.execute('INSERT INTO users VALUES (?, ?)', (message.from_user.id, message.from_user.username))
    conn.commit()
    c.execute('SELECT * FROM users WHERE id=:id', {'id': message.chat.id})
    row = c.fetchall()
    bot.send_message(message.chat.id, 'Ну привет!:)')
  else:
    bot.send_message(message.chat.id, 'Уже виделись же!')
  

@bot.message_handler(commands=['info'])
def sayInfo(message):
  photo = open('./img/cat.jpg', 'rb')
  bot.send_photo(message.chat.id, photo)
  bot.send_message(message.chat.id, message)

@bot.message_handler(func=lambda message: True, content_types=['text'])
def echo_msg(message):
  bot.send_message(message.chat.id, message.text)

if __name__ == '__main__':
  bot.polling(none_stop=True)