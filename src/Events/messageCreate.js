const openai = require("../Structures/openai.js");
const AI = { name: "Syalis" };

module.exports = {
  once: false,
  async execute(message) {
    const { client, author } = message;

    if (!message.mentions.has(client.user.id)) return;

    openai.body.stop[0] = ` ${author.username}:`;
    message.channel.sendTyping();

    const mention = "<@" + client.user.id + ">";
    const userMessage = message.content.replace(mention, "");

    openai.push(`${author.username}: ${userMessage}`);

    const response = await openai.execute();

    if (!response) return errorDetected("response!");

    const data = await response.json();
    process.data = data;

    if (!data.choices) return errorDetected("choices!");

    const aiMessage = data.choices[0].text;
    console.log(data.choices)

    if (!aiMessage.includes(`${AI.name}:`)) {
      openai.push(`${AI.name}: ${aiMessage}`);
    } else {
      openai.push(aiMessage);
    }
    if (!aiMessage.length) return;

    message.reply(aiMessage.replace(`${AI.name}: `, ""));

    console.log(openai.body.prompt);
    function errorDetected(error) {
      return message.reply("> Theres a error in:" + error);
    }
  },
};
