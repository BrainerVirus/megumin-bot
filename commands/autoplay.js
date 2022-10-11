module.exports = {
  name: "autoplay",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    const autoplay = queue.toggleAutoplay();
    message.channel.send(
      `${client.emotes.success} | Auto reproducción: \`${
        autoplay ? "On" : "Off"
      }\``
    );
  },
};
