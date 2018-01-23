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
    recuperePorteNord();
    recuperePorteSud();

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
    nbObstacles = obstaclesTabHTML.length;
    tabObstacles = {};
    for(var i =0; i<nbObstacles; i++){
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

var recuperePorteNord = function(){
    var porteNordHTML = document.getElementById("porteNord");
    porteNord = {
        xPos: parseInt(porteNordHTML.style.left.replace("px", "")),
        yPos: parseInt(porteNordHTML.style.top.replace("px", "")),
        width: 24,
        height: 24,
        verouillee: false,
        numObstacle: -1,
        model: porteNord
    };
}

var recuperePorteSud = function(){
    var porteSudHTML = document.getElementById("porteSud");
    porteSud = {
        speed: 1,
        xPos: parseInt(porteSudHTML.style.left.replace("px", "")),
        yPos: parseInt(porteSudHTML.style.top.replace("px", "")),
        width: 24,
        height: 24,
        verouillee: true,
        numObstacle: -1,
        model: porteSud
    };
}



var draw = function (argument) {
    affichePersonage();
    window.scrollTo(Math.min(character.xPos*zoom-(window.innerWidth/2)+10*zoom, 400*zoom-(window.innerWidth/2)), Math.min(character.yPos*zoom-(window.innerHeight/2)+10*zoom, 528*zoom-(window.innerHeight/2)));
}

function affichePersonage(){
    character.model.style.left = (character.xPos+game_container.offsetLeft)+"px";
    character.model.style.top = (character.yPos+game_container.offsetTop)+"px";
    game_container.appendChild(character.model);
    character.model.id = "personnage";
}



var update = function (argument) {
    updatePortes();
    deplacerLePersonnage();
    detectePorte();
}

var updatePortes = function (){
    updatePorteNord();
    updatePorteSud();
}

var updatePorteNord = function (){
    if(porteNord.verouillee){
        if (tabObstacles[porteNord.numObstacle] == undefined) {
            porteNord.model.className = "obstacle";
            porteNord.numObstacle = nbObstacles;
            tabObstacles[nbObstacles] = porteNord;
            nbObstacles ++;
        }
    }else{
        porteNord.model.className = "";
        if(tabObstacles[porteNord.numObstacle] != undefined){
            delete tabObstacles[porteNord.numObstacle];
            if(porteSud.numObstacle>porteNord.numObstacle && porteNord.numObstacle!=-1){
                porteSud.numObstacle = porteNord.numObstacle;
                tabObstacles[porteSud.numObstacle] = porteSud;
            }
            nbObstacles -=1;
            porteNord.numObstacle=-1;
        }
    }
}

var updatePorteSud = function (){
    if(porteSud.verouillee){
        if (tabObstacles[porteSud.numObstacle] == undefined) {
            porteSud.model.className = "obstacle";
            porteSud.numObstacle = nbObstacles;
            tabObstacles[nbObstacles] = porteSud;
            nbObstacles ++;
        }
    }else{
        porteSud.model.className = "";
        if(tabObstacles[porteSud.numObstacle] != undefined){
            delete tabObstacles[porteSud.numObstacle];
            if(porteNord.numObstacle>porteSud.numObstacle && porteSud.numObstacle!=-1){
                porteNord.numObstacle = porteSud.numObstacle;
                tabObstacles[porteNord.numObstacle] = porteNord;
            }
            nbObstacles -=1;
            porteSud.numObstacle=-1;
        }
    }
}

function deplacerLePersonnage(){
    if((keys[LEFTKEY] || keys[AKEY] || keys[QKEY]) && !(keys[RIGHTKEY] || keys[DKEY])){
        character.direction = GAUCHE;
        if(!toucheUnObstacleDeLaDroite(character))
            deplacerAGauche(character);
    }
    if((keys[RIGHTKEY] || keys[DKEY]) && !(keys[LEFTKEY] || keys[AKEY] || keys[QKEY])){
        character.direction = DROITE;
        if(!toucheUnObstacleDeLaGauche(character))
            deplacerADroite(character);
    }
    if((keys[UPKEY] || keys[ZKEY] || keys[WKEY]) && !(keys[DOWNKEY] || keys[SKEY])){
        character.direction = HAUT;
        if(!toucheUnObstacleDenBas(character))
            deplacerEnHaut(character);
    }
    if((keys[DOWNKEY] || keys[SKEY]) && !(keys[UPKEY] || keys[ZKEY] || keys[WKEY])){
        character.direction = BAS;
        if(!toucheUnObstacleDenHaut(character))
            deplacerEnBas(character);
    }
}

var tolerancePorte = 2;
var detectePorte = function(){
    if(collision(character, porteNord, tolerancePorte)){
        if (!porteNord.verouillee)
            porteNord.model.src = "./resImg/porte_ouverte.gif";
    }else{
        porteNord.model.src = "./resImg/porte.png";
    }
    if(collision(character, porteSud, tolerancePorte)){
        if (!porteSud.verouillee)
            porteSud.model.src = "./resImg/porte_ouverte.gif";
    }else{
        porteSud.model.src = "./resImg/porte.png";
    }
}





var toleranceObstacle = 0;

function toucheUnObstacleDeLaGauche(entite){
    var touche=false;
    var i=0;
    while(i<nbObstacles && !touche){
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
    while(i<nbObstacles && !touche){
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
    while(i<nbObstacles && !touche){
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
    while(i<nbObstacles && !touche){
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
    entite.yPos+=entite.yPos+entite.speed>512?0:entite.speed;
}


function collision(entite1, entite2, tolerance){
    if (laDroiteDeLEntiteUneEstAGaucheDeLaGaucheDeLEntite2(entite1, entite2, tolerance))
        return false;
    if (laGaucheDeLEntiteUneEstADroiteDeLaDroiteDeLEntite2(entite1, entite2, tolerance))
        return false;
    if (leBasDeLEntiteUneEstEnHautDuHautDeLEntite2(entite1, entite2, tolerance))
        return false;
    if (leHautDeLEntiteUneEstEnBasDuBasDeLEntite2(entite1, entite2, tolerance))
        return false;
    return true;
}

var laDroiteDeLEntiteUneEstAGaucheDeLaGaucheDeLEntite2 = function(entite1, entite2, tolerance){
    return  entite1.xPos+entite1.width<entite2.xPos+tolerance;
}

var laGaucheDeLEntiteUneEstADroiteDeLaDroiteDeLEntite2 = function(entite1, entite2, tolerance){
    return entite1.xPos>entite2.xPos+entite2.width-tolerance;
}

var leHautDeLEntiteUneEstEnBasDuBasDeLEntite2 = function(entite1, entite2, tolerance){
    return entite1.yPos>entite2.yPos+entite2.height-tolerance;
}

var leBasDeLEntiteUneEstEnHautDuHautDeLEntite2 = function(entite1, entite2, tolerance){
    return entite1.yPos+entite1.height<entite2.yPos+tolerance;
}

document.onload = init();

zoom = 6;
game_container.style.zoom=zoom;