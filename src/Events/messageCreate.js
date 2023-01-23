const openai = require("../Structures/openai.js");

module.exports = {
  once: false,
  async execute(message) {
    const { client, author } = message;
    const aiName = client.user.username;
    const mention = "<@" + client.user.id + ">";
    const userMessage = message.content.replace(mention, "");

    if (!message.mentions.has(client.user.id)) return;
    if (userMessage.includes(".cleanMessages")) {
      openai.cache = [];
    }

    message.channel.sendTyping();

    openai.push(`${author.username}: ${userMessage}`);

    const data = await openai.execute(client, author);
    let aiMessage = data.choices[0].text;

    const isError = aiMessage.startsWith("Error:");
    const isNamed = aiMessage.includes(`${aiName}:`);

    if (!isError) {
      if (!isNamed) {
        openai.push(`${aiName}: ${aiMessage}`);
      } else {
        openai.push(aiMessage);
      }
    }

    aiMessage = aiMessage.replace(`${aiName}: `, "");

    const isEmpty = !aiMessage.trim().length;
    const isMaxLength = aiMessage.length > 2000;

    if (isEmpty) {
      return message.reply("Error: My reply was empty!");
    }

    if (isMaxLength) {
      return message.reply("Error: Message exceeded 2000 length!");
    }

    message.reply(aiMessage);
  },
};
