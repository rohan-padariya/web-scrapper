const request = require("request");
const cheerio = require("cheerio");

const args = require('minimist')(process.argv)

function main() {

    console.log('INFO :: For exact word match use --exact=true')

    if (!(args.hasOwnProperty('url') && args.hasOwnProperty('words'))) {
        return console.error('INFO :: url and words parameters are expected.')
    } else {
        try {

            let url = args['url'];

            let wordsArr = []
            if (args['words']) {
                if (typeof args['words'] != 'string') {
                    wordsArr = [args['words'].toString()];
                } else {
                    wordsArr = args['words'].split(',')
                }
            }

            let exactMatch = args['exact'] == 'true' ? true : false

            console.log('INFO :: Validating URL and getting data from URL...')

            request(url, function (error, response, html) {
                if (!error && response.statusCode == 200) {

                    console.log('INFO :: Parsing data...')

                    const $ = cheerio.load(html);

                    $('title').empty();
                    $('script').empty();
                    $('noscript').empty();

                    var textData = $('body *').contents().map(function () {
                        return (this.type === 'text') ? $(this).text() + ' ' : '';
                    }).get().join('');

                    textData = textData.toLowerCase()

                    let json = {}

                    wordsArr.forEach((word, index) => {

                        word = word.toLowerCase()
                        let regex = word;
                        if (exactMatch) {
                            regex = '\\b(' + word + ')\\b'
                        }
                        let occurrences = textData.match(new RegExp(regex, "gi"))
                        // console.log(occurrences)
                        json[wordsArr[index]] = occurrences ? occurrences.length : 0

                    })

                    console.log('INFO :: Printing word occurences')
                    console.log('INFO :: Exact match Enabled : ', exactMatch)
                    //printing words occurences
                    console.log('-------------------------------')
                    Object.keys(json).forEach(key => {
                        console.log(key, ' - ', json[key])
                    })
                    console.log('-------------------------------')

                }
                else {
                    console.log('INFO :: Failure (Invalid URL)' + error);
                }
            });
        } catch (error) {
            console.log('INFO :: Someting went wrong :' + error)
        }
    }
}

//driver function
main()

