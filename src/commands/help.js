const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "cmd", "command"],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Waga na wa Megumin! \n y estos son mis comandos...")
          .setDescription(
            client.commands.map((cmd) => `\`${cmd.name}\``).join(", ")
          )
          .setColor(0x0099ff),
      ],
    });
  },
};
