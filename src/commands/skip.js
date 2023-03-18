module.exports = {
  name: "skip",
  aliases: ["skp"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    try {
      const song = await queue.skip();
      message.channel.send(
        `${client.emotes.success} | Saltada! ahora reproduciendo:\n${song.name}`
      );
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`);
    }
  },
};
