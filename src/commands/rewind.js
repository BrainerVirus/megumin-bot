module.exports = {
  name: "rewind",
  aliases: ["rnd"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    if (!args[0]) {
      return message.channel.send(
        `${client.emotes.error} | Baka! Debes especificar el tiempo a retroceder...`
      );
    }
    const time = Number(args[0]);
    if (isNaN(time))
      return message.channel.send(
        `${client.emotes.error} | Baka! Debes especificar un número...`
      );
    queue.seek(queue.currentTime - time);
    message.channel.send(`Hehehe, retrocedí la canción ${time}!`);
  },
};
