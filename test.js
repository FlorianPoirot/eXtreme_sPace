

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


function countTimer() { 
  //avancement du timer 
  document.getElementById("pourcentageVie").style.width = (totalSeconds*100)/totalSecondsInit+"%";
  if (totalSeconds > 0) { 
  --totalSeconds; 
  var hour = Math.floor(totalSeconds /3600); 
  var minute = Math.floor((totalSeconds - hour*3600)/60); 
  var seconds = totalSeconds - (hour*3600 + minute*60); 
  var echoHour = hour; var echoMinute = minute; var echoSeconds = seconds; 
  if (hour<10) {echoHour = "0"+hour}  
  if (minute<10) {echoMinute = "0"+minute} 
  if (seconds<10) {echoSeconds = "0"+seconds} 
    /*var timer = document.getElementById("timer"); 
    //timer.style.border = "solid 2px"; 
    timer.style.zIndex=999;
    timer.style.fontSize = "20px"; 
    timer.style.left = "0px";
    timer.style.top = "0px";
    timer.style.font = "bold 20px arial,serif"; 
    timer.innerHTML = echoHour + ":" + echoMinute + ":" + echoSeconds; */
  } else { 
    clearInterval(timerVar); 
    var game = document.getElementById("game"); 
    var player = document.querySelector('#audioPlayer'); 
    player.play(); 
 
    game.innerHTML = "<div style=\"position:absolute;margin-left: 20px;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+ 
    "<div style=\"position:absolute;margin-left: 60px;margin-top:40;\"><img  src=\"resImg/boom2.gif\" alt=\"boom\"></div>"+ 
    "<div style=\"position:absolute;margin-left: 60px;margin-top:130;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+ 
    "<div style=\"position:absolute;margin-left: 130px;margin-top:130;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+ 
    "<div style=\"position:absolute;margin-left: 180px;margin-top:130;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+ 
    "<div style=\"position:absolute;margin-left: 300px;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>" 
  } 
} 
var totalSeconds = 2;//initalisation et début du timer 
var totalSecondsInit = 2;//initalisation et début du timer 
var timerVar = setInterval(countTimer, 1000); 

