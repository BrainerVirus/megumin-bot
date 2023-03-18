module.exports = {
  name: "previous",
  aliases: ["pus"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    const song = queue.previous();
    message.channel.send(
      `${client.emotes.success} | Hehehe ahora estoy reproduciendo:\n${song.name}`
    );
  },
};
