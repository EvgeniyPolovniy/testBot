import config
import telebot

bot = telebot.TeleBot(config.token)

@bot.message_handler(commands=['hi'])
def echo_msg(message):
    bot.send_message(message.chat.id, 'Ну привет!:)')

@bot.message_handler(commands=['info'])
def echo_msg(message):
    photo = open('./img/cat.jpg', 'rb')
    bot.send_photo(message.chat.id, photo)
    bot.send_message(message.chat.id, message)

@bot.message_handler(func=lambda message: True, content_types=['text'])
def echo_msg(message):
    bot.send_message(message.chat.id, message.text)


if __name__ == '__main__':
    bot.polling(none_stop=True)