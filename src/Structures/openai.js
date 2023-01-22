const fetch = require("node-fetch");

module.exports = {
  cache: [],
  body: {
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
  },
  async execute(client, author) {
    const { openai } = client.config;
    const aiName = client.user.username;
    const userName = author.username;

    const newPrompt = openai.context
      .concat(this.cache)
      .join("\n")
      .replace(/%AI_NAME/g, aiName)
      .replace(/%USER_NAME/g, userName);

    const bodyJson = JSON.stringify(
      Object.assign(this.body, {
        prompt: newPrompt,
        stop: [` ${userName}:`, ` ${aiName}:`],
      })
    );

    const response = await fetch(
      `https://api.openai.com/v1/engines/${openai.model}/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openai.key}`,
        },
        body: bodyJson,
      }
    ).catch(() => {});

    if (!response)
      return {
        choices: [{ text: "Error: No response." }],
      };

    const data = await response.json();

    if (data.usage) {
      const cleanAmount = 4;
      const { total_tokens } = data.usage;

      if (total_tokens >= 1000) {
        this.cache.splice(0, cleanAmount);
      }
    }

    if (data.error)
      return {
        choices: [{ text: "Error: " + data.error.message }],
      };

    return data;
  },
  push(args) {
    this.cache.push(`${args} <|endoftext|>`);
  },
};
