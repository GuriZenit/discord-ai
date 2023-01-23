# discord-ai
A discord bot using ChatGPT 3 API!

## Usage

You only need two things, both discord-bot and openai-api's tokens,
you can see a example of the `.env` file here:

```
TOKEN=discord-bot-token-here
OPENAI_API_KEY=openai-api-key-here
```

You can get the Bot's token on Discord Developer Portal, and the  openai's
token on their website, make a account [here](https://beta.openai.com/signup).

## Observations

### Token's limit

The AI remembers the previous messages, thus being able to continue in
the same topic, but due to the limitations of the API, it is necessary
to clean the old messages, this happens when it reaches a certain number
of tokens, [seee more](https://beta.openai.com/docs). You can determine
the amount of messages that will be cleaned, just edit that constant in
`src/Structures/openai.js`:

```javascript
const cleanAmount = 4;
const { total_tokens } = data.usage;

if (total_tokens >= 1000) {
  this.cache.splice(0, cleanAmount);
}
```

You will get an error message if you reach the token's limit,
so I recommend leaving it at least `3`, default is `4`.

### Default message context

There is a context message in `src/Configs/config.js` that is the
first thing the IA receives, based on what, it defines how it will
react in the next messages, I don't recommend changing it, but I
think you know what you're doing!

### Username knowledge 

Yes the AI knows your username, and everyone who talks to it,
this is possible because of [context](#Default-message-context), look at
this example of how the IA reads the messages!

```
username: Good Evening!
iarname: Good Evening username how I can help you?
```
This sends the discord username on the start of each message.
The AI also adds its name to messages, which made me have to
remove it before sending to discord (It also add in case AI doesn't).

# Licence
[MIT](#LICENCE)