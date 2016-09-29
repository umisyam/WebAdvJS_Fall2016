var Xray = require('x-ray');
var x = Xray();

// 1st argument: URL you want to scrape
// 2nd argument: the selector that you want to grab
// 3rd argument: the array containing object of what you want to be passed on
x('http://www.imdb.com/search/title?groups=top_1000&sort=boxoffice_gross_us', '.lister-list', [{
	topMovies: x('.lister-item', [{
		title: '.lister-item-header a',
		link: '.lister-item-header a@href',
		year: '.lister-item-year',
		rank: '.lister-item-index',
		rating: '.ratings-imdb-rating strong',
		thumbnail: '.lister-item-image img@src',
		genre: ['.genre'],
		people: x('.lister-item-content p a', [{
			name: '',
			link: '@href'
		}]),
		// poster: x('.lister-item-header a@href', 'head meta[property="og:image"]@content')
	}])
}])
	.paginate('a.lister-page-next.next-page@href')
	.limit(20)
    .write('results.json');