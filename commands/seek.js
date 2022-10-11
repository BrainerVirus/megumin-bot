module.exports = {
  name: "seek",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    if (!args[0]) {
      return message.channel.send(
        `${client.emotes.error} | Baka! Debes especificar el tiempo en segundos a avanzar...`
      );
    }
    const time = Number(args[0]);
    if (isNaN(time))
      return message.channel.send(
        `${client.emotes.error} | Baka! Debes especificar un número...`
      );
    queue.seek(time);
    message.channel.send(`Hehehe, he avanzado ${time}!`);
  },
};
