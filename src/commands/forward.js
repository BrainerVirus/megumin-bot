module.exports = {
  name: "forward",
  aliases: ["frd"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    if (!args[0]) {
      return message.channel.send(
        `${client.emotes.error} | Bakayaro! Debes ingresar un tiempo en segundos para continuar...`
      );
    }
    const time = Number(args[0]);
    if (isNaN(time))
      return message.channel.send(
        `${client.emotes.error} | Kono Baka! el número ingresado no es válido...`
      );
    queue.seek(queue.currentTime + time);
    message.channel.send(`Forwarded the song for ${time}!`);
  },
};
