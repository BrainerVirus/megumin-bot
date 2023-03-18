module.exports = {
  name: "skipto",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    if (!args[0]) {
      return message.channel.send(
        `${client.emotes.error} | Baka! Debes especificar el tiempo en segundos para retroceder...`
      );
    }
    const num = Number(args[0]);
    if (isNaN(num))
      return message.channel.send(
        `${client.emotes.error} | kono Baka! Debes especificar un número...`
      );
    await client.distube.jump(message, num).then((song) => {
      message.channel.send({ content: `Skipped to: ${song.name}` });
    });
  },
};
