
function widthheight() {
	document.getElementById("widthheight").innerHTML = "W: " + window.innerWidth + " --- H: " + window.innerHeight;
};

window.onresize = widthheight;
window.onload = widthheight;