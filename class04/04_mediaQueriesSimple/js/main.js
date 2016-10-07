function widthHeight(){
	document.getElementById("widthheight").innerHTML = ("W: " + window.innerWidth + " --- H: " + window.innerHeight);
};

window.onresize = widthHeight;
window.onload = widthHeight;