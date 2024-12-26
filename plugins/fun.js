const { rmSync } = require("fs");
const { command, isPrivate, getJson, getBuffer } = require("../lib");


command(
    {
        pattern: "joke",
        desc: "jokes",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/jokes?apikey=gifted`);

            const res = response.result;
            const text = `
${res.setup}....

${res.punchline}
           
            `
            await message.reply(text);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);

command(
    {
        pattern: "advice",
        desc: "Advice",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/advice?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);

command(
    {
        pattern: "flirt",
        desc: "flirt",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/flirt?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);

command(
    {
        pattern: "quote",
        desc: "qu",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/quotes?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);
command(
    {
        pattern: "truth",
        desc: "truth",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/truth?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);

command(
    {
        pattern: "roseday",
        desc: "roseday",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/roseday?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);

command(
    {
        pattern: "goodnight",
        desc: "goodnight",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/goodnight?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);

command(
    {
        pattern: "motivate",
        desc: "fun",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/motivation?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);

command(
    {
        pattern: "thanks",
        desc: "fun",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/thankyou?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);


command(
    {
        pattern: "thanks",
        desc: "fun",
        type: "fun",
        fromMe: isPrivate,
    },
    async (message) => {

        try {
            // Fetch data from the Simsimi API
            const response = await getJson(`https://api.giftedtech.my.id/api/fun/thankyou?apikey=gifted`);

            const res = response.result;

            await message.reply(res);
        } catch (error) {
            // Catch any errors from the API request or the code
            console.error("Error fetching data from Simsimi API:", error);
            await message.reply("An error occurred while processing your request. Please try again later.");
        }
    }
);
