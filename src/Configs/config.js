require("dotenv").config();

module.exports = {
  bot: {
    token: process.env.TOKEN,
  },
  openai: {
    key: process.env.OPENAI_API_KEY,
    model: "text-davinci-003",
  },
};
