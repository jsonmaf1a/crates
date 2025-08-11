import { Bot } from "grammy";

const TOKEN = Bun.env.BOT_TOKEN;

const bot = new Bot(TOKEN);

bot.on("message:text", (ctx) =>
    ctx.reply(`Echo: ${ctx.message.text}`),
);

bot.start();
