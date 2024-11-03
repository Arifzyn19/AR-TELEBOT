module.exports = {
  cmd: ["ping"],
  name: "ping",
  category: "main",
  description: "Balas dengan pong",
  async execute(client, { bot }) {
    try {
      await client.reply("Pong!!");
    } catch (error) {
      console.error("Error sending pong message:", error);
    }
  },
};
