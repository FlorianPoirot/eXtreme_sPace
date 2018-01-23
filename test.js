

function popUp (x,y) {
	var div = document.createElement('div');
	div.style.zIndex=999;
	div.style.position="absolute";
	div.style.top = x+"px";
	div.style.left = y+"px";
	div.style.color = "RED";
	div.style.fontWeight = "bold";
	div.innerHTML = '<p>test</p>';
	document.getElementById('game').appendChild(div);
}

function deleteDialogue () {
	var element = document.getElementById("dialogBox");
	if (element!=null) {
		element.outerHTML = "";
		delete element;
	}
}

function dialogBox (message) {
	console.log(message);
	if (typeof message !== 'object') {
		messageGlobal = message;
	}
	deleteDialogue();

	var div = document.createElement('p');
	div.setAttribute("id", "dialogBox");
	div.style.zIndex=999;
	div.style.position="absolute";
	div.style.width = document.documentElement.clientWidth/2+"px";
	div.style.top = (document.documentElement.clientHeight-15)+"px";
	div.style.left = document.documentElement.clientWidth/4+"px";
	div.style.fontSize = "3px";
	div.style.border = "double 1px";
	div.style.backgroundColor = "white";
	div.innerHTML = messageGlobal;
	document.getElementById('game').appendChild(div);
}
dialogBox("palleja : JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP !");
var messageGlobal;
window.onresize = dialogBox;