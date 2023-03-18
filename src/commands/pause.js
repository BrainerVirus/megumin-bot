module.exports = {
  name: "pause",
  aliases: ["pse", "hold"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    if (queue.paused) {
      queue.resume();
      return message.channel.send(
        "Hehehe, ya volví a reproducir la canción...)"
      );
    }
    queue.pause();
    message.channel.send("Hehehe, ya pausé la canción...");
  },
};
