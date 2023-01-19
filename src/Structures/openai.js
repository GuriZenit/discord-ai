const fetch = require("node-fetch");
const config = require("../Configs/config.js");
const { key, model } = config.openai;
const AI_NAME = "Syalis";
const url = `https://api.openai.com/v1/engines/${model}/completions`;

module.exports = {
  cache: [
    `I am an AI assist called ${AI_NAME}, that will help users!`,
    "The name of the users is on the start of each message",
    "USER_NAME: Hello I'm a user!",
    `${AI_NAME}: Nice to meet you USER_NAME!`,
  ],
  body: {
    prompt: "",
    temperature: 0.9,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" USER_NAME:", ` ${AI_NAME}:`],
  },
  async execute() {
    this.body.prompt = this.cache.join("\n");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(this.body),
    }).catch(() => {});

    return response;
  },
  push(args) {
    this.cache.push(`${args} <|endoftext|>`);
  },
};
