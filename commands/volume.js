module.exports = {
  name: "volume",
  aliases: ["v", "set", "set-volume"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    const volume = parseInt(args[0]);
    if (isNaN(volume))
      return message.channel.send(
        `${client.emotes.error} | Baka! Por favor, introduce un numero valido...`
      );
    queue.setVolume(volume);
    message.channel.send(
      `${client.emotes.success} | Hehehe el volumen a cambiado a \`${volume}\``
    );
  },
};
