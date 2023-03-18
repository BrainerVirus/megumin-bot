module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    const song = queue.songs[0];
    message.channel.send(
      `${client.emotes.play} | Estoy reproduciendo **\`${song.name}\`**, por ${song.user}`
    );
  },
};
