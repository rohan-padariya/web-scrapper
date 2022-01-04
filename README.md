# web-scrapper
Script to scrap web page and get word occurrence

-Cases are ignored while counting the occurrence
-pass 2 parameters --url and --words (comma seperated) string

-Add **--exact=true** to perform exact word match

-Example 

1. Execute -> **node index.js --url=https://nodejs.dev/ --words=JavaScript,Source,ov**

    Output -> 
              JavaScript - 4 <br />
              Source - 3<br />
              ov - 2


If you want perform exact word match add --exact=true

2. Execute -> **node index.js --url=https://nodejs.dev/ --words=JavaScript,Source,ov --exact=true** 

    Output -> 
              JavaScript - 4<br />
              Source - 2<br />
              ov - 0



