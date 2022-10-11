module.exports = {
  name: "repeat",
  aliases: ["loop", "rp"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    let mode = null;
    switch (args[0]) {
      case "off":
        mode = 0;
        break;
      case "song":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }
    mode = queue.setRepeatMode(mode);
    mode = mode ? (mode === 2 ? "Repetir cola" : "Repetir canción") : "Off";
    message.channel.send(
      `${client.emotes.repeat} | Seleccionar modo de repetición \`${mode}\``
    );
  },
};
