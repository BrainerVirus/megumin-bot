module.exports = {
  name: "resume",
  aliases: ["resume", "unpause"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    if (queue.paused) {
      queue.resume();
      message.channel.send("Hehehe, ya volví a reproducir la canción...");
    } else {
      message.channel.send("Explosion! la canción no ha sido pausada...");
    }
  },
};
