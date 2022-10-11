const express = require("express");
require("dotenv").config();
const { DisTube } = require("distube");
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
  ],
});
const fs = require("fs");
const config = require("./config.json");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

client.config = require("./config.json");
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;

fs.readdir("./commands/", (err, files) => {
  if (err)
    return console.log("Kono Baka! el comando ingresado no es válido...");
  const jsFiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0)
    return console.log("Kono Baka! el comando ingresado no es válido...");
  jsFiles.forEach((file) => {
    const cmd = require(`./commands/${file}`);
    console.log(`Loaded ${file}`);
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases)
      cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag} listo para reproducir música!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  const prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(
      `${client.emotes.error} | Bakayaro! Debes estar en un canal de voz para usar este comando...`
    );
  }
  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.error(e);
    message.channel.send(
      `${client.emotes.error} | Explosion! ha ocurrido un error...: \`${e}\``
    );
  }
});
const { EmbedBuilder } = require("discord.js");
const status = (queue) =>
  `Volumen: \`${queue.volume}%\` | Filtro: \`${
    queue.filters.names.join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "Todo"
        : "Esta canción"
      : "Off"
  }\` | Auto Reproducir: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
  .on("playSong", (queue, song) => {
    // console.log("this is data in song: ", song);
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0x0099ff)
          .setURL(song.url)
          .setAuthor({
            name: `${config.emoji.play}Reproducendo - \`${song.name}\``,
            iconURL: song.thumbnail,
            url: song.url,
          })
          .setThumbnail(song.Thumbnail)
          .addFields(
            { name: "Pedida por: ", value: song.user.username, inline: true },
            {
              name: "Duración: ",
              value: song.formattedDuration,
              inline: true,
            }
          )
          .setImage(song.thumbnail)
          .setTimestamp()
          .setFooter({
            text: `URL: ${song.url}`,
          })
          .setFooter({
            text: `Fuente: ${song.source}`,
          }),
      ],
    });
  })
  .on("addSong", (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | Agregada ${song.name} - \`${song.formattedDuration}\` a cola por ${song.user}`
    )
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | Playlist \`${playlist.name}\` agregada (${
        playlist.songs.length
      }  a cola\n${status(queue)}`
    )
  )
  .on("error", (channel, e) => {
    if (channel)
      channel.send(
        `${client.emotes.error} | Explosion!!! algo ha salido mal...${e
          .toString()
          .slice(0, 1974)}`
      );
    else console.error(e);
  })
  .on("empty", (channel) =>
    channel.send("El canal de voz está vacío, sayonara...")
  )
  .on("searchNoResult", (message, query) =>
    message.channel.send(
      `${client.emotes.error} | Ups no he encontrado la canción... \`${query}\`!`
    )
  )
  .on("finish", (queue) => queue.textChannel.send("GG!"));

client.login(process.env.TOKEN);

// server settings
const app = express();

app.get("/", (req, res) => {
  console.log(Date.now() + " Ping Received");
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
