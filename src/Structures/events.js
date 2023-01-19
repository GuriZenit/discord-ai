const { readdirSync } = require("node:fs");

module.exports = {
  async execute(client) {
    const PATH = process.cwd() + "/src/Events";
    const files = readdirSync(PATH);

    for (let file of files) {
      const event = require(`${PATH}/${file}`);
      const eventName = file.split(".")[0];

      if (event.once) {
        await client.once(eventName, (...args) => {
          event.execute(...args);
        });
      } else {
        await client.on(eventName, (...args) => {
          event.execute(...args);
        });
      }
    }
  },
};
