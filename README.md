# discord-ai
A discord bot using ChatGPT API!

## Usage

You will need only two things, the discord-bot and openai-api's tokens
you can see a example of the `.env` file here:

```
TOKEN=discord-bot-token-here
OPENAI_API_KEY=openai-api-key-here
```

## Observations

### Token's limit

I did it in a way that the AI remembers the previous messages,
thus being able to continue in the same subject, but due to the
limitations of the API, it is necessary to clean the old messages,
this happens when it reaches a certain number of tokens,
[seee more](https://beta.openai.com/docs). You can determine the amount of messages that will be
cleaned, just edit that constant:

```javascript
const cleanAmount = 4;
const { total_tokens } = data.usage;

if (total_tokens >= 1000) {
  this.cache.splice(0, cleanAmount);
}
    
```

You will get an error message if you reach the token's limit,
so we recommend leaving it at least `3`, default is `4`.

### Default message context

On `src/Configs/config.js` there is the context message that is the
first thing the bot receives, based on what it defines how it will
react in the next messages, it is basically a teaching, I don't
recommend changing it, but I think you know what you're doing!

### Username knowledge 

Yes the AI knows your username, and everyone who talks to it,
this is possible precisely because of [context](#Default message context), look at this
example of how the IA reads the messages!

```
username: Good Evening!
iarname: Good Evening username how I can help you?
```

The AI adds its name to messages, which made me have to remove
it before sending to discord (I also add in case AI doesn't).

# Licence
[MIT]()