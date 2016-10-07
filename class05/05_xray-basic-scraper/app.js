var Xray = require('x-ray');
var x = Xray();

// 1st argument: URL you want to scrape
// 2nd argument: the selector that you want to grab
// x('http://google.com', 'title')
//     .write('results.json');

// 3rd argument: the array containing object of what you want to be passed on
x('http://google.com', 'a',
	[{
		a: '',
		// means, just grab attribute href from the 'a' selector
		href: '@href',
	}]
)
    .write('results.json');
