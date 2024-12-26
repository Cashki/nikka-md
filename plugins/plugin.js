const { command, getUrl } = require("../lib");
const fs = require("fs");
const path = require("path");
const got = require("got");
const { installPlugin } = require("../lib/database/plugins");

command(
  {
    pattern: "plug ?(.*)",
    fromMe: true,
    desc: "Install External plugins",
    type: "user",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage("*_Plugin URL not provided_*");

    const urls = getUrl(match);
    if (!urls.length)
      return await message.sendMessage("*_No valid URLs found in input_*");

    const pluginsDir = path.resolve(__dirname, "../plugins");

    // Ensure plugins directory exists
    if (!fs.existsSync(pluginsDir)) {
      fs.mkdirSync(pluginsDir, { recursive: true });
    }

    for (let inputUrl of urls) {
      let url;
      try {
        // Parse and adjust the URL
        url = new URL(inputUrl);
        if (url.host === "gist.github.com") {
          url.host = "gist.githubusercontent.com";
          url = url.toString() + "/raw";
        } else {
          url = url.toString();
        }
      } catch (err) {
        return await message.sendMessage(`*_Invalid URL:_* ${inputUrl}`);
      }

      // Fetch plugin content from the URL
      let response;
      try {
        response = await got(url);
        if (response.statusCode !== 200) {
          return await message.sendMessage(
            `*_Failed to fetch plugin. Status Code:_* ${response.statusCode}`
          );
        }
      } catch (err) {
        return await message.sendMessage(
          `*_Error fetching plugin:_* ${err.message}`
        );
      }

      const pluginContent = response.body;

      // Extract plugin name from the pattern or generate a random name
      let pluginName;
      try {
        const patterns = pluginContent
          .match(/(?<=pattern:.*?["'`])(.*?)(?=["'`])/g)
          .map((p) => p.trim());
        pluginName = patterns[0] || `plugin_${Math.random().toString(36).slice(2)}`;
      } catch (err) {
        return await message.sendMessage(
          "*_Error extracting plugin pattern:_*\n" + err.message
        );
      }

      // Save plugin to the plugins directory
      const pluginPath = path.join(pluginsDir, `${pluginName}.js`);
      try {
        fs.writeFileSync(pluginPath, pluginContent);
      } catch (err) {
        return await message.sendMessage(
          `*_Failed to save plugin file:_* ${err.message}`
        );
      }

      // Validate the plugin by requiring it
      try {
        require(pluginPath);
      } catch (err) {
        fs.unlinkSync(pluginPath); // Remove invalid plugin
        return await message.sendMessage(
          "*_Invalid Plugin:_*\n```" + err.message + "```"
        );
      }

      // Save plugin metadata to database
      try {
        await installPlugin(url, pluginName);
      } catch (err) {
        return await message.sendMessage(
          `*_Failed to register plugin in database:_* ${err.message}`
        );
      }

      // Success message
      await message.sendMessage(`*_Plugin installed:_* ${pluginName}`);
    }
  }
);
