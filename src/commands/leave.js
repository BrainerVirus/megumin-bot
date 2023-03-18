module.exports = {
  name: "leave",
  aliases: ["lve"],
  run: async (client, message) => {
    client.distube.voices.leave(message);
  },
};
