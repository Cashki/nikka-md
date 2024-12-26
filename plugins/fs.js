const { command, isPrivate } = require("../lib");
const fs = require("fs");
const path = require("path");

command(
  {
    pattern: "getfile",
    fromMe: isPrivate,
    desc: "Fetches any file from the bot's directories.",
    type: "file",
  },
  async (message, match) => {
    try {
      // Check if the user provided a file path
      if (!match) {
        return await message.reply(
          "Please provide the file path, e.g., `.getfile ./plugins/example.js`."
        );
      }

      // Resolve the file path
      const filePath = path.resolve(match);

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return await message.reply("*File not found. Please check the file path.*");
      }

      // Ensure the path is within the bot's directory for security
      const botDirectory = path.resolve("./");
      if (!filePath.startsWith(botDirectory)) {
        return await message.reply(
          "*Access denied. You can only access files within the bot's directory.*"
        );
      }

      // Send the file
      await message.client.sendMessage(
        message.jid,
        {
          document: { url: filePath },
          fileName: path.basename(filePath),
          mimetype: "text/plain",
        },
        { quoted: message }
      );
    } catch (error) {
      console.error("Error fetching file:", error);
      await message.reply(`*Failed to retrieve the file. Error: ${error.message}*`);
    }
  }
);


command(
  {
    pattern: "listfiles",
    fromMe: isPrivate,
    desc: "Lists files in a specified directory.",
    type: "file",
  },
  async (message, match) => {
    try {
      // If no directory is specified, default to the root directory
      const targetDir = path.resolve(match || "./");

      // Ensure the directory is within the bot's root directory for security
      const botDirectory = path.resolve("./");
      if (!targetDir.startsWith(botDirectory)) {
        return await message.reply(
          "*Access denied. You can only list files within the bot's directory.*"
        );
      }

      // Check if the directory exists
      if (!fs.existsSync(targetDir)) {
        return await message.reply("*Directory not found. Please check the path.*");
      }

      // Read the directory and filter files only
      const files = fs
        .readdirSync(targetDir)
        .filter((file) => fs.statSync(path.join(targetDir, file)).isFile());

      // If no files found, reply accordingly
      if (files.length === 0) {
        return await message.reply(`*No files found in directory: ${targetDir}*`);
      }

      // Send the list of files
      const fileList = files.map((file) => `- ${file}`).join("\n");
      await message.reply(`*Files in directory: ${targetDir}*\n\n${fileList}`);
    } catch (error) {
      console.error("Error listing files:", error);
      await message.reply(`*Failed to list files. Error: ${error.message}*`);
    }
  }
);
