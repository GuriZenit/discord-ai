const openai = require("../Structures/openai.js");

module.exports = {
  once: false,
  async execute(message) {
    const { client, author } = message;
    const aiName = client.user.username;

    if (!message.mentions.has(client.user.id)) return;
    message.channel.sendTyping();
    openai.body.stop[0] = ` ${author.username}:`;

    const mention = "<@" + client.user.id + ">";
    const userMessage = message.content.replace(mention, "");

    openai.push(`${author.username}: ${userMessage}`);

    const data = await openai.execute();
    const aiMessage = data.choices[0].text;

    if (!aiMessage.startsWith("Error:")) {
      if (!aiMessage.includes(`${aiName}:`)) {
        openai.push(`${aiName}: ${aiMessage}`);
      } else {
        openai.push(aiMessage);
      }
    }
   
    if (!aiMessage.trim().replace(`${aiName}: `, "").length) return;
    
    message.reply(aiMessage.replace(`${aiName}: `, ""));
  },
};
