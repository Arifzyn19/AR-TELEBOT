const config = require("./configs/config");
const { plugins } = require("./utils/plugins");
const util = require("util");

module.exports = handler = (bot) => {
  bot.on("callback_query", async (ctx) => {
    try {
      const callbackData = ctx.callbackData || ctx.update. callback_query.data
      
      for (let name in plugins) {
        let plugin = plugins[name];
        if (typeof plugin.callback === "function") {
          await plugin.callback(ctx, callbackData);
          break; 
        }
      }
    } catch (error) {
      console.error("Error handling callback_query:", error);
    }
  });
  
  bot.on("message", async (ctx) => {
    try {
      const body = ctx.message.text || ctx.message.caption || "";
      const prefix = /^[°•π÷×¶∆£¢€¥®™+✓_|~!?@#%^&.©^]/gi.test(body)
        ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_|~!?@#%^&.©^]/gi)[0]
        : "";
      const cmd = body && body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();
      const isCommand = (prefix && body.startsWith(prefix)) || false;
      const args = body.trim()
        .replace(new RegExp(prefix, "i"), "")
        .replace(cmd, "")
        .split(/ +/)
        .filter((a) => a) || [];
      const text = args.join(" ");
      
      const isOwner = config.options.owner.includes(ctx.message.from.username);
      const isGroup = ctx.message.chat.type.includes("group");
      
      for (let name in plugins) {
        let plugin = plugins[name];

        if (!plugin) continue;
        if (plugin.disabled) continue;

        try {
          if (typeof plugin.all === "function") {
            await plugin.all.call(ctx, { bot });
          }
          
          if (typeof plugin.before === "function") {
            if (await plugin.before.call(ctx, { bot })) continue;
          }

          if (isCommand) {
            const isAccept = Array.isArray(plugin.cmd)
              ? plugin.cmd.includes(cmd)
              : typeof plugin.cmd === "string" && plugin.cmd === cmd;

            if (!isAccept) continue;

            try {
              await plugin.execute(ctx, { bot, args, text });
            } catch (e) {
              console.error(e);
              await ctx.reply(util.format(e));
            } finally {
              if (typeof plugin.after === "function") {
                try {
                  await plugin.after.call(ctx, { bot });
                } catch (e) {
                  console.error(e);
                }
              }
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};