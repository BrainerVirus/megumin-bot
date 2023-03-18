const { Constants } = require("discord.js");

module.exports = {
  name: "join",
  aliases: ["jn"],
  run: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel;
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0]);
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(
          `${client.emotes.error} | ${args[0]} Bakayaro! No es un canal de voz váldo...`
        );
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `${client.emotes.error} | Kono baka! Debes estar en un canal de voz para usar este comando...`
      );
    }
    client.distube.voices.join(voiceChannel);
  },
};
