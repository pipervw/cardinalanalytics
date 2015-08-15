// A script to automate the use of templates common to multiple web pages.
// Used as a function into which the content specific to a page is passed
// as a variable, as well as the corresponding data and ID of te HTML
// element that will hold the content. Additionally compiles and renders
// HTML for the navbar, header, sidebar, call to action, and footer.
// Also contains common data, such as the links.

populatePage = function(pageTemplate, pageData, divId) {

	// Create handlebars template
	var templates = {};
	templates.pageTemplate = Handlebars.compile(pageTemplate);
	templates.navbar = Handlebars.compile(Templates.navbar);
	templates.header = Handlebars.compile(Templates.header);
	templates.sidebar = Handlebars.compile(Templates.sidebar);
	templates.callToAction = Handlebars.compile(Templates.callToAction);
	templates.footer = Handlebars.compile(Templates.footer);

	// links common to the entire site
	var links = {};
	links.home = { name: "Home", link: "http://www.stanfordsportsanalytics.com" };
	links.twitter = { name: "Twitter", link: "http://www.twitter.com/stanfordsac" };
	links.facebook = { name: "Facebook", link: "http://www.facebook.com/stanfordsportsanalytics" };
	links.blog = { name: "Blog", link: "http://www.stanfordsportsanalytics.wordpress.com" };

	// buttons, split into buttons that belong on the banner and the rest
	var buttons = {};
	buttons.navbar = [
		{text: links.home.name, link: links.home.link},
		{text: "About Us", link: links.home.link + "/about"},
		{text: "Profiles", link: links.home.link + "/profiles"},
		{text: links.blog.name, link: links.blog.link, target: "new"}
	];
	buttons.mailList = {text: "Join our mailing list!", link: "//mailman.stanford.edu/mailman/listinfo/sportsanalytics", color: "light", target: "new"};

	// move all of the sources of data into a single object for a standardized Handlebars call
	var data = {};
	data.links = links;
	data.buttons = buttons;
	data.year = new Date().getFullYear();
	data.pageData = pageData

	console.log(data.pageData.header);

	// function to render a Handlebars template with data, and place the result into the element with id divId
	populateElement = function(divId, template, data) {
		var $element = $(divId);
		if ($element.length) {
			$element.html(template(data));
		}
	}

	// populates each of the common elements and the element specified in the function call
	populateElement("#navbar", templates.navbar, data);
	populateElement("#header", templates.header, data);
	populateElement("#sidebar", templates.sidebar, data);
	populateElement("#call-to-action", templates.callToAction, data);
	populateElement("#footer", templates.footer, data);
	populateElement(divId, templates.pageTemplate, data);
};
