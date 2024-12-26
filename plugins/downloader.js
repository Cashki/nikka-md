const { command, isPrivate, getJson } = require("../lib/");

const apiKey = "nikka"; // API key for the search
const searchApi = "https://nikka-api.us.kg/search/yts?q="; // Search API URL
const downloadApi = "https://api.siputzx.my.id/api/d/ytmp3?url=https://youtube.com/watch?v="; // Download API URL
const imageUrl = "https://files.catbox.moe/flinnf.jpg"; // Developer image
const thumbnailUrl = "https://files.catbox.moe/cuu1aa.jpg"; // Thumbnail image

// Search command to find songs based on the user's query
command(
  {
    pattern: "song ?(.*)",
    fromMe: false,
    desc: "Search for songs using a keyword and download the first result",
    type: "downloader",
  },
  async (message, match) => {
    try {
      const query = match.trim();
      if (!query) return message.reply("Please provide a search query.\nExample: `.search Shape of You`");

      const apiUrl = `${searchApi}${encodeURIComponent(query)}&apiKey=${apiKey}`;
      const response = await getJson(apiUrl);

      const results = response?.data || [];
      if (results.length === 0) {
        return message.reply("No results found for your query.");
      }

      // Automatically get the first result's videoId
      const firstResult = results[0];
      const videoId = firstResult.videoId;

      // Send the search result with the image and thumbnail
      let responseMessage = `*Search Results for "${query}":*\n\n`;
      responseMessage += `1. *${firstResult.title}*\n   - Duration: ${firstResult.duration.timestamp}\n   - Views: ${firstResult.views.toLocaleString()} views\n   - By: ${firstResult.author.name}\n\n`;
      responseMessage += "Downloading the first result...";

      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: responseMessage,
        contextInfo: {
          externalAdReply: {
            title: `Search Result: ${firstResult.title}`,
            body: "First Result",
            sourceUrl: "https://haki.us.kg", // Link to your website
            mediaUrl: "https://haki.us.kg", // Additional URL
            mediaType: 4,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: thumbnailUrl,
          },
        },
      });

      // Fetch the download URL for the first result
      const downloadUrl = `${downloadApi}${videoId}`;
      const downloadResponse = await getJson(downloadUrl);

      // Check if the download response is valid
      if (downloadResponse.status) {
        const audioUrl = downloadResponse.data.dl;
        const audioTitle = downloadResponse.data.title;

        // Send the audio file to the user
        await message.client.sendMessage(message.jid, {
          audio: { url: audioUrl },
          caption: `*${audioTitle}*`,
          mimetype: "audio/mpeg",
        });
      } else {
        return message.reply("Error downloading the song. Please try again.");
      }
    } catch (error) {
      console.error(error);
      return message.reply("An error occurred while searching or downloading. Please try again.");
    }
  }
);





command(
    {
        pattern: "apk",
        desc: "Downloads APKs",
        fromMe: isPrivate,
        type: "downloader",
    },
    async (message, match) => {
      const query = match.trim();
        if (!query) {
            return await message.sendMessage("Please provide the app name to search.");
        }

        try {
            // Fetch APK details from the API
            const res = await getJson(
                `https://api.nexoracle.com/downloader/apk?apikey=free_key@maher_apis&q=${encodeURIComponent(query)}`
            );

            // Debugging API response
            console.log("API Response:", res);

            // Validate response
            if (!res || !res.result) {
                return await message.sendMessage(
                    "Could not find the APK details. Please check the app name and try again."
                );
            }

            const { name, lastup, size, dllink, icon } = res.result || {};

            // Check mandatory fields
            if (!dllink || !name || !size) {
                return await message.sendMessage(
                    "The APK details for the provided app are unavailable. Please try another app."
                );
            }

            const lastUpdate = lastup || "Not available";
            const apkIcon = icon || "https://files.catbox.moe/cuu1aa.jpg"; // Default icon

            // Prepare the response text
            const text = `
*📥 APK Downloader*

*Name:* ${name}
*Last Updated:* ${lastUpdate}
*Size:* ${size}

_Downloading the file. This may take some time._
            `;

            // Send the message with APK details
            await message.client.sendMessage(message.jid, {
                image: { url: apkIcon },
                caption: text.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: "APK Download Service",
                        body: "Powered by Nikka-MD",
                        sourceUrl: "https://haki.us.kg", // Change this to your site
                        mediaUrl: "https://haki.us.kg",  // Change this to your site
                        mediaType: 4,
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                        thumbnail: { url: apkIcon }, // Thumbnail for externalAdReply
                    },
                },
            });

            // Send the APK file
            await message.client.sendMessage(
                message.jid,
                {
                    document: { url: dllink },
                    fileName: `${name}.apk`,
                    mimetype: "application/vnd.android.package-archive",
                },
                { quoted: message }
            );
        } catch (error) {
            console.error("Error fetching APK:", error);

            // Send user-friendly error message
            await message.sendMessage(
                "An error occurred while fetching the APK. Please try again later or contact support."
            );
        }
    }
);
command(
    {
        pattern: "play",
        desc: "Downloading media",
        type: "downloader",
        fromMe: isPrivate,
    },
    async (message, match) => {
      const query = match.trim();
        try {
            if (!query) {
                return await message.reply("Provide a media query.");
            }

            const response = await getJson(`https://api.giftedtech.my.id/api/search/yts?apikey=king_haki-k7gjd8@gifted_api&query=${query}`);
            
            // Check if results exist
            if (!response || !response.results || response.results.length === 0) {
                return await message.reply("No media found for the given query.");
            }

            const res = response.results[0];
            
            const responsedl = await getJson(`https://api.giftedtech.my.id/api/download/ytmp3?apikey=king_haki-k7gjd8@gifted_api&url=${res.url}`);

            // Check if download URL exists
            if (!responsedl || !responsedl.result) {
                return await message.reply("Failed to retrieve download URL.");
            }

            const resdl = responsedl.result; // Corrected this line

            const text = `
Nikka MD Media Downloader

*Name*: ${res.title}
*Description*: ${res.description}
*URL*: ${res.url}
            `;

            // Send the image with the text as a caption
            await message.client.sendMessage(message.jid, {
                image: { url: res.image }, // Image URL from API response
                caption: text, // Text as caption
            });
            
            // Send the audio with the caption
            await message.client.sendMessage(message.jid, {
                audio: { url: `${resdl.download_url}` }, // Directly using resdl
                caption: `*${res.title}*`,
                mimetype: "audio/mpeg",
            });
        } catch (error) {
            console.error(error);
            await message.reply("if your seeing this error, jusr redo the command it will work");
        }
    }
);
command(
    {
        pattern: "vid",
        desc: "Downloading media",
        type: "downloader",
        fromMe: isPrivate,
    },
    async (message, match) => {
      const query = match.trim();
        try {
            if (!query) {
                return await message.reply("Provide a media query.");
            }

            const response = await getJson(`https://api.giftedtech.my.id/api/search/yts?apikey=king_haki-k7gjd8@gifted_api&query=${query}`);
            
            // Check if results exist
            if (!response || !response.results || response.results.length === 0) {
                return await message.reply("No media found for the given query.");
            }

            const res = response.results[0];
            
            const responsedl = await getJson(`https://api.giftedtech.my.id/api/download/ytmp4?apikey=king_haki-k7gjd8@gifted_api&url=${res.url}`);

            // Check if download URL exists
            if (!responsedl || !responsedl.result) {
                return await message.reply("Failed to retrieve download URL.");
            }

            const resdl = responsedl.result; // Corrected this line

            const text = `
Nikka MD Media Downloader

*Name*: ${res.title}
*Description*: ${res.description}
*URL*: ${res.url}
            `;

            // Send the image with the text as a caption
            await message.client.sendMessage(message.jid, {
                image: { url: res.image }, // Image URL from API response
                caption: text, // Text as caption
            });
            
            // Send the audio with the caption
            await message.client.sendMessage(message.jid, {
                video: { url: `${resdl.download_url}` }, // Directly using resdl
                caption: `*${res.title}*`,
                mimetype: "video/mp4",
            });
        } catch (error) {
            console.error(error);
            asait
            await message.reply(error);
        }
    }
);
/*const { command } = require("../lib");
const axios = require("axios"); */

command(
  {
    pattern: "fb",
    fromMe: true,
    desc: "Download Facebook reels",
    type: "downloader",
  },
  async (message, match) => {
    try {
      let url = match;
      if (!url && message.reply_message) {
        url = message.reply_message.text.match(/https?:\/\/[^\s]+/g)?.[0];
      }

      if (!url) {
        return await message.reply("Please provide a valid Facebook reel URL.");
      }

      const apiUrl = `https://api.nexoracle.com/downloader/facebook?apikey=free_key@maher_apis&url=${url}`;
      const response = await axios.get(apiUrl);

      if (!response.data || !response.data.result || !response.data.result.HD) {
        return await message.reply("Failed to fetch the video. Please check the URL or try again.");
      }

      const videoUrl = response.data.result.HD;

      await message.sendFromUrl(videoUrl, {
        mimetype: "video/mp4",
        caption: "Here's your Facebook reel!",
      });
    } catch (error) {
      console.error("Error in fbdown command:", error.message);
      await message.reply("An error occurred while downloading the Facebook reel.");
    }
  }
);
command(
    {
        pattern: "tiktok",
        desc: "TikTok video downloader",
        type: "downloader",
        fromMe: isPrivate,
    },
    async (message, match) => {
      
        if (!match) {
            return await message.sendMessage("Please provide a TikTok URL.");
        }

        // Improved TikTok URL validation
        const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com\/|vm\.tiktok\.com\/).+/;
        if (!tiktokRegex.test(match.trim())) {
            return await message.sendMessage("Invalid TikTok URL provided.");
        }

       // await message.react("⏳️");

        try {
            // Fetch video data from API
            const apiUrl = `https://nikka-api.us.kg/dl/tiktok?apiKey=nikka&url=${encodeURIComponent(match.trim())}`;
            const response = await getJson(apiUrl);

            // Check for a successful response
            if (!response || !response.data) {
                throw new Error("Failed to fetch video data.");
            }

            const videoUrl = response.data;

            // Send video to the user
            await message.client.sendMessage(message.jid, {
                video: { url: videoUrl },
                caption: "> Powered by Nikka Botz",
                mimetype: "video/mp4",
            });

           // await message.react("✅️");
        } catch (error) {
            // Handle errors gracefully
            await message.sendMessage(`Failed to download video. Error: ${error.message}`);
            await message.react("❌️");
        }
    }
);
