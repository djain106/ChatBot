'use strict';

const Discord = require('discord.js');
const MarkovChain = require('markovchain').MarkovChain;
require('dotenv').config();
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const token = process.env.CLIENT_TOKEN;
const prefix = '!';
const queue = new Map();
var connection;

client.once('ready', () => {
    console.log('Started Bot.');
    // console.log('Logged in as ${client.user.tag}')
})

client.login(token);

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const serverQueue = queue.get(message.guild.id);
    console.log(serverQueue);
    var content = message.content;
    if (content == '!aay') {
        message.react('🇦')
            .then(() => message.react('🇦'))
            .then(() => message.react('🇾'))
            .catch(() => console.error('Emoji failed to react.'));

    } else if (content == '!join') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send("User not in voice channel.");
        }
        try {
            var connect = await voiceChannel.join()
                .then(connection => {
                    connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));
                });

        } catch (err) {
            console.log(err);
        }
    } else if (content == '!leave') {}
});



const quotes = new MarkovChain({
    files: `./data.txt`
});

for (let i = 0; i < 5; i++) {
    quotes
        .start('The')
        .end(12)
        .process((err, string) => console.log(string));
}