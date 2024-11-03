const { Telegraf } = require('telegraf');
const config = require('./configs/config');
const {
  plugins,
  loadPluginFiles,
  pluginFolder,
  pluginFilter,
} = require('./utils/plugins');
const logger = require("./utils/logger");

const bot = new Telegraf(config.options.token);

const start = async () => {
loadPluginFiles(pluginFolder, pluginFilter, {
    logger: logger,
    recursiveRead: true,
  })
    .then((a) => logger.info('Plugins Loader Success!', a))
    .catch(console.error);
    
bot.start((ctx) => ctx.reply('Selamat datang di bot! Ketik /menu untuk melihat opsi.'));

await require("./handler.js")(bot)

bot.launch()
    .then(() => console.log('Bot started'))
    .catch(err => console.error('Error starting bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
start()