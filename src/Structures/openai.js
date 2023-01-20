const fetch = require("node-fetch");
const config = require("../Configs/config.js");
const { key, model } = config.openai;
const AI_NAME = "Syalis";
const url = `https://api.openai.com/v1/engines/${model}/completions`;

module.exports = {
  context: [
    `I am an AI assist called ${AI_NAME}, that will help users!`,
    "Programing codes will be sent ike this:  ```language_name\ncode here\n```",
    "language_name should be in lowercase!",
    "Your messages Must be 2000 or fewer in char length. never pass that!",
    "The name of the users is on the start of each message",
    "USER_NAME: Hello I'm a user!",
    `${AI_NAME}: Nice to meet you USER_NAME!\n`,
  ],
  cache: [],
  body: {
    prompt: "",
    temperature: 0,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" USER_NAME:", ` ${AI_NAME}:`],
  },
  async execute() {
    const { context, cache } = this;
    this.body.prompt = context.join("\n") + cache.join("\n");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(this.body),
    }).catch(() => {});

    const data = await response.json();

    if (data.error)
      return {
        choices: [{ text: "Error: " + data.error.message }],
      };

    if (data.usage) {
      if (data.usage.total_tokens >= 1000) {
        for (let i = 0; i < 3; i++) this.cache.shift();
      }
    }

    return data;
  },
  push(args) {
    this.cache.push(`${args} <|endoftext|>`);
  },
};
