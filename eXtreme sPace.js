// Débogage
/*
	function positionSouris(evt) {
	   var x = character.xPos;
	   var y = character.yPos;
	   var dada = character.model.clientX;
	   var vava = character.model.clientY;
	   d.innerHTML = 'character :<br>x = ' + x + '<br>y = ' + y +'<br>dada :<br>x = ' + dada + '<br>y = ' + vava;   
	}

	function changePositionDiv(evt) {
		d.style.top = (evt.clientY+10) + 'px';
		d.style.left = (evt.clientX+10) + 'px';
	}

	var b = document.body;
	var d = document.getElementById('divPosition');

	// l'événement 'mousemove' est associé à 2 actions différentes
	b.addevtListener('mousemove',positionSouris);
	b.addevtListener('mousemove',changePositionDiv);

*/
//Variable globales pour ne pas avoir à connaitre les numérosdes touches par coeur.
		LEFTKEY 	= 37;
		RIGHTKEY	= 39;
		UPKEY		= 38;
		DOWNKEY		= 40;

		ZKEY		= 90;
		QKEY		= 81;
		SKEY		= 83;
		DKEY		= 68;

		WKEY		= 87;
		AKEY		= 65;
		SPACEKEY	= 32;

		F5KEY		= 116;
		F12KEY      = 123;
		ECHAPKEY    = 27;
		ENTERKEY	= 13


	    HAUT 		= 0;
	    BAS 		= 1;
	    GAUCHE 		= 2;
	    DROITE 		= 3;
	    HG			= 5;
	    HD			= 9;
	    BG			= 6;
	    BD			= 10;

//Variables servant à relancer la partie.
var charXPosInitial = 0;
var charYPosInitial = 0;

var protege=false;

function loop(timestamp) {
	if (!jeu_commence)
		return false;
	var progress = timestamp - lastRender;

	time+=progress;
	update();
	draw();
	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}

function init(){
	jeu_commence = false;
	time = 0;
    lastRender = 0;

    recuperePersonnage();
    recupereMurs();
	window.requestAnimationFrame(loop);
}

var recuperePersonnage = function(){
	var persoHTML = document.getElementById("personnage");
    character = {
    	speed: 1,
    	xPos: persoHTML.style.left,
    	yPos: persoHTML.style.top,
    	width: persoHTML.style.width,
    	height: persoHTML.style.height,
    	direction: BAS,
    	model: persoHTML
    };
}

var recupereMurs = function(){
	var mursTabHTML = document.getElementsByClassName("wall");
	nbMurs = mursTabHTML.length;
	tabMurs = {};
	for(var i =0; i<nbMurs; i++){
		var mur = recupereMur(mursTab[i]);
		tabMurs[i] = mur;
	}
}

var recupereMur = function(murHTML){
	var mur = {
    	xPos: murHTML.style.left,
    	yPos: murHTML.style.top,
    	width: murHTML.style.width,
    	height: murHTML.style.height,
    	direction: BAS,
    	model: murHTML
    };
    return mur;
}




function affichePersonage(){
	var source = protege?"img/personnage_up_up_protege.svg":"img/personnage_up_up.svg";
	character.model.style.WebkitTransition = "all .1s linear";
	character.model.style.left = (character.xPos+game_container.offsetLeft);
	character.model.style.top = (character.yPos+game_container.offsetTop);
	switch (character.direction){
		case HAUT:
			character.model.style.WebkitTransform = "rotate(0deg) scale(1,1)";
			break;
		case BAS:
			character.model.style.WebkitTransform = "rotate(180deg) scale(-1,1)";
			break;
		case GAUCHE:
			character.model.style.WebkitTransform = " rotate(-90deg) scale(1,1)";
			break;
		case DROITE:
			character.model.style.WebkitTransform = " rotate(90deg) scale(-1,1)";
			break;
		case HG:
			character.model.style.WebkitTransform = "rotate(-45deg) scale(1,1)";
			break;
		case HD:
			character.model.style.WebkitTransform = "rotate(45deg) scale(-1,1)";
			break;
		case BG:
			character.model.style.WebkitTransform = "rotate(-135deg) scale(1,1)";
			break;
		case BD:
			character.model.style.WebkitTransform = "rotate(135deg) scale(-1,1)";
			break;
	}
	character.model.src = source;
	character.model.id = "personnage";
	game_container.appendChild(character.model);
}



function deplacerLePersonnage(){
	if((keys[LEFTKEY] || keys[AKEY] || keys[QKEY]) && !(keys[RIGHTKEY] || keys[DKEY])){
		if((keys[UPKEY] || keys[ZKEY] || keys[WKEY]) && !(keys[DOWNKEY] || keys[SKEY])){
			character.direction = HG;
		}else if ((keys[DOWNKEY] || keys[SKEY]) && !(keys[UPKEY] || keys[ZKEY] || keys[WKEY])){
			character.direction = BG;
		} else{
			character.direction = GAUCHE;
		}
		if(!toucheUneBriqueDeLaDroite(character))
			deplacerAGauche(character);
	}
	if((keys[RIGHTKEY] || keys[DKEY]) && !(keys[LEFTKEY] || keys[AKEY] || keys[QKEY])){
		if((keys[UPKEY] || keys[ZKEY] || keys[WKEY]) && !(keys[DOWNKEY] || keys[SKEY])){
			character.direction = HD;
		}else if ((keys[DOWNKEY] || keys[SKEY]) && !(keys[UPKEY] || keys[ZKEY] || keys[WKEY])){
			character.direction = BD;
		} else{
			character.direction = DROITE;
		}
		if(!toucheUneBriqueDeLaGauche(character))
			deplacerADroite(character);
	}
	if((keys[UPKEY] || keys[ZKEY] || keys[WKEY]) && !(keys[DOWNKEY] || keys[SKEY])){
		if((keys[LEFTKEY] || keys[AKEY] || keys[QKEY]) && !(keys[RIGHTKEY] || keys[DKEY])){
			character.direction = HG;
		}else if ((keys[RIGHTKEY] || keys[DKEY]) && !(keys[LEFTKEY] || keys[AKEY] || keys[QKEY])){
			character.direction = HD;
		} else{
			character.direction = HAUT;
		}
		if(!toucheUneBriqueDenBas(character))
			deplacerEnHaut(character);
	}
	if((keys[DOWNKEY] || keys[SKEY]) && !(keys[UPKEY] || keys[ZKEY] || keys[WKEY])){
		if((keys[LEFTKEY] || keys[AKEY] || keys[QKEY]) && !(keys[RIGHTKEY] || keys[DKEY])){
			character.direction = BG;
		}else if ((keys[RIGHTKEY] || keys[DKEY]) && !(keys[LEFTKEY] || keys[AKEY] || keys[QKEY])){
			character.direction = BD;
		} else{
			character.direction = BAS;
		}
		if(!toucheUneBriqueDenHaut(character))
			deplacerEnBas(character);
	}
}





var toleranceBrique = 2;

function toucheUneBriqueDeLaGauche(entite){
	var touche=false;
	var i=0;
	while(i<nbMurs && !touche){
		touche = touche || toucheLaBriqueDeLaGauche(tabMurs[i], entite);
		i++;
	}
	return touche;
}

function toucheLaBriqueDeLaGauche(brique, entite){
	if(laDroiteDeLEntiteEstADroiteDeLaGaucheDeLaBrique(brique, entite)){
		if (leBasDeLEntiteEstEnHautDuHautDeLaBrique(brique, entite) || leHautDeLEntiteEstEnBasDuBasDeLaBrique(brique, entite)){
			return false
		}else{
			if(laGaucheDeLEntiteEstADroiteDeLaDroiteDeLaBrique(brique, entite)){
				return false;
			}else{
				return true;
			}
		}
	}else{
		return false;
	}
}

function toucheUneBriqueDenHaut(entite){
	var touche=false;
	var i=0;
	while(i<nbMurs && !touche){
		touche = touche || toucheLaBriqueDenHaut(tabMurs[i], entite);
		i++;
	}
	return touche;
}

function toucheLaBriqueDenHaut(brique, entite){
	if(leHautDeLEntiteEstEnBasDuBasDeLaBrique(brique, entite)){
		if (laDroiteDeLEntiteEstAGaucheDeLaGaucheDeLaBrique(brique, entite) || laGaucheDeLEntiteEstADroiteDeLaDroiteDeLaBrique(brique, entite)){
			return false
		}else{
			if(leHauDeLEntntiteEstPlusBasQueLeBasDeLaBrique(brique, entite)){
				return false;
			}else{
				return true;
			}
		}
	}else{
		return false;
	}
}

function toucheUneBriqueDenBas(entite){
	var touche=false;
	var i=0;
	while(i<nbMurs && !touche){
		touche = touche || toucheLaBriqueDenBas(tabMurs[i], entite);
		i++;
	}
	return touche;
}

function toucheLaBriqueDenBas(brique, entite){
	if(LeHautDeLEntiteEstEnHautDuBasDeLaBrique(brique, entite)){
		if (laDroiteDeLEntiteEstAGaucheDeLaGaucheDeLaBrique(brique, entite) || laGaucheDeLEntiteEstADroiteDeLaDroiteDeLaBrique(brique, entite)){
			return false
		}else{
			if(leBasDeLEntiteEstEnHautDuHautDeLaBrique(brique, entite)){
				return false;
			}else{
				return true;
			}
		}
	}else{
		return false;
	}
}

function toucheUneBriqueDeLaDroite(entite){
	var touche=false;
	var i=0;
	while(i<nbMurs && !touche){
		touche = touche || toucheLaBriqueDeLaDroite(tabMurs[i], entite);
		i++;
	}
	return touche;
}

function toucheLaBriqueDeLaDroite(brique, entite){
	if(laGaucheDeLEntiteEstAGaucheDeLaDroiteDeLaBrique(brique, entite)){
		if (leBasDeLEntiteEstEnHautDuHautDeLaBrique(brique, entite) || leHautDeLEntiteEstEnBasDuBasDeLaBrique(brique, entite)){
			return false
		}else{
			if(laDroiteDeLEntiteEstAGaucheDeLaGaucheDeLaBrique(brique, entite)){
				return false;
			}else{
				return true;
			}
		}
	}else{
		return false;
	}
}

var leHautDeLEntiteEstEnBasDuBasDeLaBrique = function(brique, entite){
	return entite.yPos>=brique.yPos+brique.height-toleranceBrique;
}

var LeHautDeLEntiteEstEnHautDuBasDeLaBrique = function(brique, entite){
	return entite.yPos-entite.speed<brique.yPos+brique.height-toleranceBrique;
}

var leBasDeLEntiteEstEnHautDuHautDeLaBrique = function(brique, entite){
	return entite.yPos+entite.height<=brique.yPos+toleranceBrique;
}

var leBasDeLEntiteEstPlusBasQueLeHautDeLaBrique = function (brique, entite){
	return entite.yPos+entite.height+entite.speed>brique.yPos+toleranceBrique;
}

var laGaucheDeLEntiteEstADroiteDeLaDroiteDeLaBrique = function(brique, entite){
	return entite.xPos>=brique.xPos+brique.width-toleranceBrique;
}

var laGaucheDeLEntiteEstAGaucheDeLaDroiteDeLaBrique = function(brique, entite){
	return entite.xPos-entite.speed<brique.xPos+brique.width-toleranceBrique;
}

var laDroiteDeLEntiteEstAGaucheDeLaGaucheDeLaBrique = function(brique, entite){
	return entite.xPos+entite.width<=brique.xPos+toleranceBrique;
}

var laDroiteDeLEntiteEstADroiteDeLaGaucheDeLaBrique = function(brique, entite){
	return entite.xPos+entite.width+entite.speed>brique.xPos+toleranceBrique;
}






function deplacerAGauche(entite){
	entite.xPos-=entite.xPos-entite.speed<0?0:entite.speed;
}

function deplacerADroite(entite){
	entite.xPos+=entite.xPos+entite.speed>380?0:entite.speed;
}

function deplacerEnHaut(entite){
	entite.yPos-=entite.yPos-entite.speed<0?0:entite.speed;
}

function deplacerEnBas(entite){
	entite.yPos+=entite.yPos+entite.speed>380?0:entite.speed;
}


function collision(entite1, entite2, tolerance){
	if (entite1.xPos+entite1.width-tolerance<entite2.xPos)
		return false;
	if (entite1.xPos>entite2.xPos+entite2.width-tolerance)
		return false;
	if (entite1.yPos+entite1.height-tolerance<entite2.yPos)
		return false;
	if (entite1.yPos>entite2.yPos+entite2.height-tolerance)
		return false;
	return true;
}

game_container.style.zoom=zoom;


document.onload = init();