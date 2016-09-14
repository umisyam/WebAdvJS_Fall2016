/*------------------------------------------------*/
// 	Handlebars Intro
//	http://handlebarsjs.com/
//	Learn more: http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/
/*------------------------------------------------*/

//	Our Data Object
var data = {
	title: "My First Post",
	description: "Why is this so easy?!"
};


//	in Vanilla JS
// var source = document.getElementById("myfirst-template").innerHTML;
// var template = Handlebars.compile(source);
// var result = template(data);
// document.body.insertAdjacentHTML("beforeend", result);


//	in jQuery
var source = $("#myfirst-template").html();
var template = Handlebars.compile(source);
var result = template(data);
$('body').append(result);