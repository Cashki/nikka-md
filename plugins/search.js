command(
    {
        pattern: "ss",
        fromMe: isPrivate,
        desc: "Take a mobile screenshot of a website",
        type: "search",
    },
    async (message, match, client) => {
        if (!match) {
            return await message.reply("Please provide a website URL to screenshot.");
        }

        const url = match.trim();

        try {
            const screenshotUrl = `https://api.giftedtech.my.id/api/tools/ssphone?apikey=king_haki-k7gjd8@gifted_api&url=${encodeURIComponent(url)}`;
            await message.sendFromUrl(screenshotUrl, "> Powered by nikka botz");
        } catch (error) {
            await message.reply("Failed to generate screenshot. Please ensure the URL is correct or try again later.");
            console.error(error);
        }
    }
);
