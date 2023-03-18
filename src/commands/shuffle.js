module.exports = {
  name: "shuffle",
  aliases: ["sfle"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    queue.shuffle();
    message.channel.send("hehehe, he mezclado la cola...");
  },
};
