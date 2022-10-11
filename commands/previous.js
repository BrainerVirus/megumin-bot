module.exports = {
  name: "previous",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    const song = queue.previous();
    message.channel.send(
      `${client.emotes.success} | Now playing:\n${song.name}`
    );
  },
};
