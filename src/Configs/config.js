require("dotenv").config();

module.exports = {
  bot: {
    token: process.env.TOKEN,
  },
  openai: {
    key: process.env.OPENAI_API_KEY,
    model: "text-davinci-003",
    context: [
      `I am an AI assist called %AI_NAME, that will help users!`,
      "Programing codes will be sent ike this:  ```language_name\ncode here\n```",
      "language_name should be in lowercase!",
      "I am on a discord chat, so I can use all the discord chat features!",
      "The name of the users is on the start of each message",
      "%USER_NAME: Hello I'm a user!",
      `%AI_NAME: Nice to meet you %USER_NAME!\n`,
    ],
  },
};
