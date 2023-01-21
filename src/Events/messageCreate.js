const openai = require("../Structures/openai.js");

module.exports = {
  once: false,
  async execute(message) {
    const { client, author } = message;
    const aiName = client.user.username;
    const mention = "<@" + client.user.id + ">";
    const userMessage = message.content.replace(mention, "");

    if (!message.mentions.has(client.user.id)) return;

    message.channel.sendTyping();

    openai.push(`${author.username}: ${userMessage}`);

    const data = await openai.execute(message);
    const aiMessage = data.choices[0].text;

    if (!aiMessage.startsWith("Error:")) {
      if (!aiMessage.includes(`${aiName}:`)) {
        openai.push(`${aiName}: ${aiMessage}`);
      } else {
        openai.push(aiMessage);
      }
    }

    const removedName = aiMessage.replace(`${aiName}: `, "");
    const isEmpty = !removedName.trim().length;

    if (isEmpty) return;

    message.reply(removedName);
  },
};
