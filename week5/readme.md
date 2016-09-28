## Lesson 5: Server-Side 1

This week we will start developing JavaScript for the server-side. We will set up a simple server using NodeJS, create an API, and make it interact with the client requests. We will also see some other useful features in NodeJS, like scraping websites and saving files. See class slide for more.

### Working Session: NodeJS

* NodeJS + HTTP Server
	* Simple Hello World
	* Basic Routing
* NodeJS + [Express](http://expressjs.com/) API
	* [Node Package Manager](https://www.npmjs.com/) (npm)
	* Initializing package ```$ npm init```
	* Installing packages ```$ npm install express body-parser --save```
		* gitgnore the modules
		* reinstall using ```$ npm install```
	* [HTTP methods: GET vs POST](http://www.w3schools.com/tags/ref_httpmethods.asp)
	* Router
	* API
* NodeJS + Express Server Basic Setup
	* Static files
	* body-parser module
	* JQuery post
* Scraping the web with NodeJS + X-Ray
	
### Extra

* [.gitignore templates](https://github.com/github/gitignore)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [http://nodeschool.io/](http://nodeschool.io/)
* [http://node.cool](https://node.cool)
* [The Art of Node](https://github.com/maxogden/art-of-node/#the-art-of-node)
* Scraping with [request](https://www.npmjs.com/package/request) and [cheerio](https://www.npmjs.com/package/cheerio)
* [A good tutorial on scraping the web with Node.js](https://scotch.io/tutorials/scraping-the-web-with-node-js)
* [Downloading music from Spotify](https://github.com/TooTallNate/node-spotify-web)


---

### Homework Week 5

You have 2 options:

* Make a web app that demonstrate client-server request using Express GET/POST that serves static public HTML interface. **Bonus**: instead of taking the data from an Object var, read an external file using Node File System module  --- require('fs').
* Scrape something on the web, output should be in .json file format.