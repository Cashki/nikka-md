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
