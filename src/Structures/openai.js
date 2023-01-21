const fetch = require("node-fetch");
const config = require("../Configs/config.js");
const { key, model, context } = config.openai;

module.exports = {
  cache: [],
  body: {
    temperature: 0,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
  },
  async execute(message) {
    const { client, author } = message;
    const { cache, body } = this;
    const aiName = client.user.username;
    const userName = author.username;

    const prompt = context
      .concat(cache)
      .join("\n")
      .replaceAll("%AI_NAME", aiName)
      .replaceAll("%USER_NAME", userName);

    const bodyJson = JSON.stringify(
      Object.assign(body, {
        prompt: prompt,
        stop: [` ${userName}:`, ` ${aiName}:`],
      })
    );

    const response = await fetch(
      `https://api.openai.com/v1/engines/${model}/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: bodyJson,
      }
    ).catch(() => {});

    const data = await response.json();

    if (data.error)
      return {
        choices: [{ text: "Error: " + data.error.message }],
      };

    if (data.usage) {
      const cleanAmount = 3;

      if (data.usage.total_tokens >= 1000) {
        this.cache.splice(0, cleanAmount);
      }
    }

    return data;
  },
  push(args) {
    this.cache.push(`${args} <|endoftext|>`);
  },
};
