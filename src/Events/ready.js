module.exports = {
  once: true,
  execute(client) {
    console.log(`${client.user.tag} online!`);

    const { guild } = client.config;
    const { channels } = client.guilds.cache.get(guild.id);
    const channel = channels.cache.get(guild.channelID);
    client.logsChannel = channel;

    const embed = {
      author: {
        name: client.user.tag,
        icon_url: client.user.avatarURL(),
      },
      description: "I just got online!",
      color: 0xe19cfb,
    };
    
    channel.send({ embeds: [embed] });
  },
};
