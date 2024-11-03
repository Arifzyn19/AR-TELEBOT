const { plugins } = require("../utils/plugins");

module.exports = {
  cmd: ["menu", "help"],
  name: "menu",
  category: "main",
  async execute(client, { bot }) {
    try {
      let menuText = `✨ *MENU PERINTAH* ✨\n\nHai, berikut menu yang tersedia:\n\n`;

      const inlineKeyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🏠 Menu Utama", callback_data: "main_menu" },
              { text: "ℹ️ Bantuan", callback_data: "help" }
            ],
            [
              { text: "❓ Tentang Bot", callback_data: "about_bot" }
            ]
          ]
        }
      };

      await client.sendMessage(menuText, inlineKeyboard);
    } catch (error) {
      console.error("Error sending menu message:", error);
    }
  },

  async callback(ctx, data) {
    const responses = {
      main_menu: "Ini adalah Menu Utama.",
      help: "Ini adalah Bantuan.",
      about_bot: "Tentang Bot: Bot ini dibuat untuk membantu."
    };

    try {
      const text = responses[data] || "Perintah tidak diketahui.";
      
      await ctx.editMessageText(text, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🏠 Menu Utama", callback_data: "main_menu" },
              { text: "ℹ️ Bantuan", callback_data: "help" }
            ],
            [
              { text: "❓ Tentang Bot", callback_data: "about_bot" }
            ]
          ]
        }
      });
    } catch (error) {
      console.error("Error handling callback:", error);
    }
  }
};