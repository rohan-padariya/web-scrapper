const axios = require("axios");
const cheerio = require("cheerio");

const args = require("minimist")(process.argv);

async function main() {
    console.log("INFO :: For exact word match use --exact=true");

    // Checking required options
    if (!(args.hasOwnProperty("url") && args.hasOwnProperty("words"))) {
        return console.error("INFO :: url and words parameters are expected.");
    }

    // Extract inputs
    const URL = args["url"];
    const words = (typeof args['words'] !== 'string') ? [args['words'].toString()] : args["words"].split(",");
    const isExactMatch = args["exact"] === "true" ? true : false;

    // Fetch & Extract details
    try {
        console.log("INFO :: Validating URL and getting data from URL...");
        const response = await axios(URL);

        // Load response
        const $ = cheerio.load(response.data);

        // Remove unnecessary parts
        $("title").empty();
        $("script").empty();
        $("noscript").empty();

        // Extract web text content
        const webContent = $("body *")
            .contents()
            .map(function () {
                return this.type === "text" ? $(this).text() + " " : "";
            })
            .get()
            .join("")
            .toLowerCase();

        // Extract occurrences results
        const results = words.reduce((result, word, index) => {
            const wordToMatch = word.toLowerCase();
            const match = isExactMatch ? `\\b(${wordToMatch})\\b` : wordToMatch;
            const occurrences = webContent.match(new RegExp(match, "gi"));
            result[words[index]] = occurrences ? occurrences.length : 0;
            return result;
        }, {});

        console.log("INFO :: Printing word occurences");
        console.log("INFO :: Exact match Enabled : ", isExactMatch);

        //printing words occurences
        console.log("-------------------------------");
        for (const [key, value] of Object.entries(results)) {
            console.log(`${key} - ${value}`);
        }
        console.log("-------------------------------");
    } catch (error) {
        // Default error handling
        console.log("ERROR :: Someting went wrong :", error.message || error);
    }
}

//start
main();