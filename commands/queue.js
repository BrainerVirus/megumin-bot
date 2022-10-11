module.exports = {
  name: "queue",
  aliases: ["q"],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Baka! No hay nada reproduciendose ahora mismo...`
      );
    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "Repoduciendose:" : `${i}.`} ${song.name} - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");
    message.channel.send(`${client.emotes.queue} | **En cola**\n${q}`);
  },
};
