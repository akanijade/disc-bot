'use strict';
//Driver Program - run this one
//module2.js
/**
var colors = require('colors');

function module2() {
  console.log('module2 started doing its job!'.blue);

  setTimeout(function () {

    setInterval(function () {
      console.log(('module2 timer:' + new Date().getTime()).blue);
    }, 2000);

  }, 1000);
}

module.exports = module2;



 * A bot that welcomes new guild members when they join
 */

// Import the discord.js module
const Discord = require('discord.js');
const auth = require('./auth.json');
// Create an instance of a Discord client
const client = new Discord.Client();
const PREFIX = '<';
var servers = {};
const ytdl = require("ytdl-core");
//var guild = client.guilds.cache.get('691900717241335828')

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});


// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  //const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  const channel = guild.channels.cache.find(channel => channel.name === 'welcome-messages');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});


// Create an event listener for messages
client.on("message", (message) => {
  //let args = message.content.substring(1).split(" ");


  // If the message is "ping"
    if (message.content.toLowerCase() === '<ping') {
      // Send "pong" to the same channel
      message.channel.send('pong!');
    }
    else if (message.content.toLowerCase() === '<i love you') {
        // send "i love you too" to the same channel
        message.channel.send("I love you too sweetheart ❤️");
    }
    else if (message.content.toLowerCase() === '<hello'){
        message.channel.send('Hello <@' + message.author.id + '>');
    }
    else if (message.content.toLowerCase() === '<fuck you'){
      message.channel.send('Hello <@' + message.author.id + '>' + ', why are you so mean?');
  }
    /*
    else if (message.content === '!pic') {
      // Create the attachment using MessageAttachment
      const attachment = new MessageAttachment('https://google');
      // Send the attachment in the message channel
      message.channel.send(attachment);
    }*/
});


client.on("message", async message => {
 // const prefix ="!";
  /**if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
   
    args = args.slice(1);**/
    if (message.content.toLowerCase() === '<help')
      {
           let embed = new Discord.MessageEmbed()
                .setTitle('Lala Bot Help Command')
                .addField('☑️ try to say <ping, <help,  <hello, <i love you, <fuck you', true)
                .addField('🎵to play song, type <play [link], to skip = <skip, <stop, <resume, <pause', true)
                .setColor(0xF1C40F)
                .setFooter('Still work in progress...')
                message.channel.send(embed);
      }
    //}
});

client.on('message', message => 
{
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) 
  {
    case 'play':
      /***
      message.member.voice.channel.join().then(connection => {
        const stream = ytdl('link', { filter: 'audioonly' });
        const dispatcher = connection.play(stream);
        
        dispatcher.on('finish', () => voiceChannel.leave());
      })
      */
      function play(connection, message)
      {
        var server = servers[message.guild.id];

        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

        server.queue.shift();

        server.dispatcher.on("finish", function()
        {
          if(server.queue[0])
          {
            play(connection, message);
          }else 
          {
            connection.leave()
            //connection.disconnect();
          }
        })
      };
      
        if(!args[1]){
          message.channel.send("you need to provide a link!");
          return;
        }
        if(!message.member.voice.channel){
          message.channel.send("You must be in a channel to play the bot!");
          return;
        }
        if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        }

        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection,message){
          play(connection, message);
        }) 
        

    break;

    case 'skip':
      var server = servers[message.guild.id];
        if(server.dispatcher) {
          server.dispatcher.destroy(); } //server.dispatcher.end
        message.channel.send("skipping song");
    break;

    case 'stop':
        var server = servers[message.guild.id];
        if(message.guild.voice.connection){
          for(var i = server.queue.length - 1; i >= 0; i--){
            server.queue.splice(i,1);
          }

          server.dispatcher.destroy(); //server.dispatcher.end
          message.channel.send("Ending the queue, leaving the voice channel");
          console.log('stopped the queue');
        

        if(message.guild.connection) message.member.voice.connection.disconnect();
        //if(message.guild.connection) message.setVoiceConnection(null);
        }
    break;

    case 'pause':
      var server = servers[message.guild.id];
      if(server.dispatcher) {
        server.dispatcher.pause(); }
      message.channel.send("Pausing the song!")
    break;

  case 'resume':
      var server = servers[message.guild.id];
      if(server.dispatcher) {
        server.dispatcher.resume(); }
      message.channel.send("Resuming the song!")
      break;
  }
});

/*
client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }
    
    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
        // Send acknowledgement message
        receivedMessage.channel.send("Message received from " +
            receivedMessage.author.toString() + ": " + receivedMessage.content)
    }
})

client.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = client.channels.get(guild.systemChannelID || channelID);
    channel.send('Thanks for inviting me into this server!');
});
*/
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login("NzIyNzE2OTc2MTg2OTE2ODg2.XunJWA.AT23PZSl3533xOeghAFudSfmQaY");