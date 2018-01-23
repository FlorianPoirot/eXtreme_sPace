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
        LEFTKEY     = 37;
        RIGHTKEY    = 39;
        UPKEY       = 38;
        DOWNKEY     = 40;

        ZKEY        = 90;
        QKEY        = 81;
        SKEY        = 83;
        DKEY        = 68;

        WKEY        = 87;
        AKEY        = 65;
        SPACEKEY    = 32;

        F5KEY       = 116;
        F12KEY      = 123;
        ECHAPKEY    = 27;
        ENTERKEY    = 13


        HAUT        = 0;
        BAS         = 1;
        GAUCHE      = 2;
        DROITE      = 3;
        HG          = 5;
        HD          = 9;
        BG          = 6;
        BD          = 10;

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

    game_container = document.getElementById("game");
    recuperePersonnage();
    recupereObstacles();

    jeu_commence = true;

    keys = {};
    document.body.onkeyup = 
    document.body.onkeydown = function(evt){
        evt = evt || window.evt;
        var charCode = evt.keyCode || evt.which;
        if (charCode != F12KEY && (charCode<96 || charCode >105) && charCode !=8 && charCode != F5KEY)
            evt.preventDefault();
        if((charCode==ENTERKEY||charCode==SPACEKEY) && evt.type == 'keydown'){
            if(jeu_commence){
                jeu_commence=false;
            }else{
                jeu_commence=true;
                window.requestAnimationFrame(loop);
            }
        }
        keys[charCode]= evt.type == 'keydown';
    };

    window.requestAnimationFrame(loop);
}

var recuperePersonnage = function(){
    var persoHTML = document.getElementById("personnage");
    character = {
        speed: 1,
        xPos: parseInt(persoHTML.style.left.replace("px", "")),
        yPos: parseInt(persoHTML.style.top.replace("px", "")),
        width: parseInt(persoHTML.style.width.replace("px", "")),
        height: parseInt(persoHTML.style.height.replace("px", "")),
        direction: BAS,
        model: persoHTML
    };
}

var recupereObstacles = function(){
    var obstaclesTabHTML = document.getElementsByClassName("obstacle");
    nbMurs = obstaclesTabHTML.length;
    tabObstacles = {};
    for(var i =0; i<nbMurs; i++){
        var mur = recupereObstacle(obstaclesTabHTML[i]);
        tabObstacles[i] = mur;
    }
}

var recupereObstacle = function(obstacleHTML){
    var mur = {
        xPos: parseInt(obstacleHTML.style.left.replace("px", "")),
        yPos: parseInt(obstacleHTML.style.top.replace("px", "")),
        width: 24,
        height: 24,
        direction: BAS,
        model: obstacleHTML
    };
    return mur;
}



var draw = function (argument) {
    affichePersonage();
}

function affichePersonage(){
    character.model.style.left = (character.xPos+game_container.offsetLeft)+"px";
    character.model.style.top = (character.yPos+game_container.offsetTop)+"px";/*
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
    }*/
    game_container.appendChild(character.model);
    character.model.id = "personnage";
}



var update = function (argument) {
    deplacerLePersonnage();
}

function deplacerLePersonnage(){
    if((keys[LEFTKEY] || keys[AKEY] || keys[QKEY]) && !(keys[RIGHTKEY] || keys[DKEY])){
        /*if((keys[UPKEY] || keys[ZKEY] || keys[WKEY]) && !(keys[DOWNKEY] || keys[SKEY])){
            character.direction = HG;
        }else if ((keys[DOWNKEY] || keys[SKEY]) && !(keys[UPKEY] || keys[ZKEY] || keys[WKEY])){
            character.direction = BG;
        } else{
            character.direction = GAUCHE;
        }*/
        if(!toucheUnObstacleDeLaDroite(character))
            deplacerAGauche(character);
    }
    if((keys[RIGHTKEY] || keys[DKEY]) && !(keys[LEFTKEY] || keys[AKEY] || keys[QKEY])){
        /*if((keys[UPKEY] || keys[ZKEY] || keys[WKEY]) && !(keys[DOWNKEY] || keys[SKEY])){
            character.direction = HD;
        }else if ((keys[DOWNKEY] || keys[SKEY]) && !(keys[UPKEY] || keys[ZKEY] || keys[WKEY])){
            character.direction = BD;
        } else{
            character.direction = DROITE;
        }*/
        if(!toucheUnObstacleDeLaGauche(character))
            deplacerADroite(character);
    }
    if((keys[UPKEY] || keys[ZKEY] || keys[WKEY]) && !(keys[DOWNKEY] || keys[SKEY])){
        /*if((keys[LEFTKEY] || keys[AKEY] || keys[QKEY]) && !(keys[RIGHTKEY] || keys[DKEY])){
            character.direction = HG;
        }else if ((keys[RIGHTKEY] || keys[DKEY]) && !(keys[LEFTKEY] || keys[AKEY] || keys[QKEY])){
            character.direction = HD;
        } else{
            character.direction = HAUT;
        }*/
        if(!toucheUnObstacleDenBas(character))
            deplacerEnHaut(character);
    }
    if((keys[DOWNKEY] || keys[SKEY]) && !(keys[UPKEY] || keys[ZKEY] || keys[WKEY])){
        /*if((keys[LEFTKEY] || keys[AKEY] || keys[QKEY]) && !(keys[RIGHTKEY] || keys[DKEY])){
            character.direction = BG;
        }else if ((keys[RIGHTKEY] || keys[DKEY]) && !(keys[LEFTKEY] || keys[AKEY] || keys[QKEY])){
            character.direction = BD;
        } else{
            character.direction = BAS;
        }*/
        if(!toucheUnObstacleDenHaut(character))
            deplacerEnBas(character);
    }
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
    entite.yPos+=entite.yPos+entite.speed>512?0:entite.speed;
}





var toleranceObstacle = 0;

function toucheUnObstacleDeLaGauche(entite){
    var touche=false;
    var i=0;
    while(i<nbMurs && !touche){
        touche = touche || toucheLObstacleDeLaGauche(tabObstacles[i], entite);
        i++;
    }
    return touche;
}

function toucheLObstacleDeLaGauche(brique, entite){
    if(laDroiteDeLEntiteEstADroiteDeLaGaucheDeLObstacle(brique, entite)){
        if (leBasDeLEntiteEstEnHautDuHautDeLObstacle(brique, entite) || leHautDeLEntiteEstEnBasDuBasDeLObstacle(brique, entite)){
            return false
        }else{
            if(laGaucheDeLEntiteEstADroiteDeLaDroiteDeLObstacle(brique, entite)){
                return false;
            }else{
                return true;
            }
        }
    }else{
        return false;
    }
}

function toucheUnObstacleDenHaut(entite){
    var touche=false;
    var i=0;
    while(i<nbMurs && !touche){
        touche = touche || toucheLObstacleDenHaut(tabObstacles[i], entite);
        i++;
    }
    return touche;
}

function toucheLObstacleDenHaut(brique, entite){
    if(leBasDeLEntiteEstPlusBasQueLeHautDeLObstacle(brique, entite)){
        if (laDroiteDeLEntiteEstAGaucheDeLaGaucheDeLObstacle(brique, entite) || laGaucheDeLEntiteEstADroiteDeLaDroiteDeLObstacle(brique, entite)){
            return false
        }else{
            if(leHautDeLEntiteEstEnBasDuBasDeLObstacle(brique, entite)){
                return false;
            }else{
                return true;
            }
        }
    }else{
        return false;
    }
}

function toucheUnObstacleDenBas(entite){
    var touche=false;
    var i=0;
    while(i<nbMurs && !touche){
        touche = touche || toucheLObstacleDenBas(tabObstacles[i], entite);
        i++;
    }
    return touche;
}

function toucheLObstacleDenBas(brique, entite){
    if(LeHautDeLEntiteEstEnHautDuBasDeLObstacle(brique, entite)){
        if (laDroiteDeLEntiteEstAGaucheDeLaGaucheDeLObstacle(brique, entite) || laGaucheDeLEntiteEstADroiteDeLaDroiteDeLObstacle(brique, entite)){
            return false
        }else{
            if(leBasDeLEntiteEstEnHautDuHautDeLObstacle(brique, entite)){
                return false;
            }else{
                return true;
            }
        }
    }else{
        return false;
    }
}

function toucheUnObstacleDeLaDroite(entite){
    var touche=false;
    var i=0;
    while(i<nbMurs && !touche){
        touche = touche || toucheLObstacleDeLaDroite(tabObstacles[i], entite);
        i++;
    }
    return touche;
}

function toucheLObstacleDeLaDroite(brique, entite){
    if(laGaucheDeLEntiteEstAGaucheDeLaDroiteDeLObstacle(brique, entite)){
        if (leBasDeLEntiteEstEnHautDuHautDeLObstacle(brique, entite) || leHautDeLEntiteEstEnBasDuBasDeLObstacle(brique, entite)){
            return false
        }else{
            if(laDroiteDeLEntiteEstAGaucheDeLaGaucheDeLObstacle(brique, entite)){
                return false;
            }else{
                return true;
            }
        }
    }else{
        return false;
    }
}

var leHautDeLEntiteEstEnBasDuBasDeLObstacle = function(brique, entite){
    return entite.yPos>=brique.yPos+brique.height-toleranceObstacle;
}

var LeHautDeLEntiteEstEnHautDuBasDeLObstacle = function(brique, entite){
    return entite.yPos-entite.speed<brique.yPos+brique.height-toleranceObstacle;
}

var leBasDeLEntiteEstEnHautDuHautDeLObstacle = function(brique, entite){
    return entite.yPos+entite.height<=brique.yPos+toleranceObstacle;
}

var leBasDeLEntiteEstPlusBasQueLeHautDeLObstacle = function (brique, entite){
    return entite.yPos+entite.height+entite.speed>brique.yPos+toleranceObstacle;
}

var laGaucheDeLEntiteEstADroiteDeLaDroiteDeLObstacle = function(brique, entite){
    return entite.xPos>=brique.xPos+brique.width-toleranceObstacle;
}

var laGaucheDeLEntiteEstAGaucheDeLaDroiteDeLObstacle = function(brique, entite){
    return entite.xPos-entite.speed<brique.xPos+brique.width-toleranceObstacle;
}

var laDroiteDeLEntiteEstAGaucheDeLaGaucheDeLObstacle = function(brique, entite){
    return entite.xPos+entite.width<=brique.xPos+toleranceObstacle;
}

var laDroiteDeLEntiteEstADroiteDeLaGaucheDeLObstacle = function(brique, entite){
    return entite.xPos+entite.width+entite.speed>brique.xPos+toleranceObstacle;
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

document.onload = init();

zoom = 6;
game_container.style.zoom=zoom;