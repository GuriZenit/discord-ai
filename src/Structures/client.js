const { Client, GatewayIntentBits } = require("discord.js");
const events = require("./events.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

module.exports = {
  async start(config) {
    client.config = config;

    await events.execute(client);
    await client.login(config.bot.token);
    return client;
  },
};
