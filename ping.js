'use strict';

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong!');
  }
  else if (message.content === 'i love you') {
      // send "i love you too" to the same channel
      message.channel.send('i love you too');
  }
  else if (message.content === "Hello"){
    message.reply('Hello' + client.user)
  }
});

client.on('message', (receivedMessage) => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) {
      return
  }

  receivedMessage.channel.send("Message received: " + receivedMessage.content)
})
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NzIyNzE2OTc2MTg2OTE2ODg2.XunIog.2UaM3AXquqZPVRksz3nBgIwAxlo');