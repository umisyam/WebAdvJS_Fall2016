## Lesson 3: Single-Page Application (SPA)

In this lesson we will build a Single-Page Application, using a template engine.


### Intro to MVC

As our application grows in complexity, appending elements with JQuery turns out laborious and not effficient. This might be ok if you're working by yourself! But... The biggest problem with this structure is that the structure and the logics are all embedded into one file. Say you're developing JS for a team, where another person is doing CSS. By simply looking into the html, your colleague has no way of telling what the page is doing. Also, he/she can't assign classes to anything without opening your file and skimming through the code just to find the html part.
Separating the logics from the rendered result is one of the principles of the architectural pattern Model-View-Controller (MVC). 


For now we'll use template engines. Not the same as MVC, but they'll help us get used to its logics.

* [Template-Engine Chooser](http://garann.github.io/template-chooser/)
* [Mustache](https://mustache.github.io/), [Handlebars](http://handlebarsjs.com/), [Underscore](http://underscorejs.org/#template)
* Templates work based on a process called [Data Binding](https://en.wikipedia.org/wiki/Data_binding). 


### Topic

* Understanding Templating Engine
	* Handlebars intro
	* Binding data to the DOM
* Single-Page Application
	0. Separating logics from content
	1. Creating the Controller: render different pages based on its content
	2. Creating the View: html structure
	3. hashchange
	4. Implementing filter checkboxes
	

### Recommended Readings and Sources

* [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
* [Single-Page Application](https://en.wikipedia.org/wiki/Single-page_application)
* [Data Binding](https://en.wikipedia.org/wiki/Data_binding)
* [The Past, Present, and Future of Local Storage for Web Applications](http://diveintohtml5.info/storage.html)

---

### Homework Week 3

* Make sure you understand the whole exercise by re-reading the commented JS file on **02c_SPA_handlebars_finished/assets/js/script.js**. 

* Then, try **adding a new filter based on the Thesis-Studio I Professors**. So other than Thesis-Category, user can now filter them based on the studio classes that they're in. For example, they should be able to view who else in John Sharp's class that's doing a thesis with 'Playful Experiences' category.

Bonus: add another filter for the Thesis-Studio II Professors. This should be as easy as copy pasting and then modifying the first one! Good luck.
