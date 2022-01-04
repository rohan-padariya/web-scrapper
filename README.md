# Web Scrapper
Script to scrap web page and get word occurrence.


# Setup 
1. Execute **run npm i** in root directory </br>
2. Execute **node index.js --url=_website_url_ --words=_comma_seperated_word_**

# Usage

-Cases are ignored while counting the occurrence</br>
-pass 2 parameters --url and --words (comma seperated) string

-Add **--exact=true** to perform exact word match

-Example 

1. Execute -> <code> **node index.js --url=https://nodejs.dev/ --words=JavaScript,Source,ov** </code>

    Output -> <br />
              JavaScript - 4 <br />
              Source - 3<br />
              ov - 2
              ![image](https://user-images.githubusercontent.com/69476780/148093159-ad7bd567-bf00-44f7-88a4-5ba09a72166c.png)
     


-If you want perform exact word match add **--exact=true**

2. Execute -> <code> **node index.js --url=https://nodejs.dev/ --words=JavaScript,Source,ov --exact=true** </code>

    Output -> <br />
              JavaScript - 4<br />
              Source - 2<br />
              ov - 0
              ![image](https://user-images.githubusercontent.com/69476780/148093236-c951f5fc-57f8-4f40-a2f3-56098a456120.png)





