

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
	console.log(document.documentElement.clientWidth);
	var div = document.createElement('p');
	div.setAttribute("id", "dialogBox");
	div.style.zIndex=999;
	div.style.position="fixed";
	div.setAttribute("class", "col-sm-8 col-sm-offset-2");
	//div.style.width = document.documentElement.clientWidth/2+"px";
	//div.style.top = (document.documentElement.clientHeight)+"px";
	//div.style.left = document.documentElement.clientWidth/4+"px";
	div.style.height = "15%";
	div.style.wordWrap = "break-word";
	div.style.bottom = "-10px";
	div.style.left = "0px";
	div.style.fontSize = "3px";
	div.style.border = "double 1px";
	div.style.backgroundColor = "white";
	div.innerHTML = messageGlobal;
	document.getElementById('game').appendChild(div);
}
dialogBox("palleja : JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP ! JADORE XP !");
var messageGlobal;
window.onresize = dialogBox;