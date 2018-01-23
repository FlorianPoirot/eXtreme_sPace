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
    time = 0;
    lastRender = 0;

    game_container = document.getElementById("game");

    recuperePersonnage();
    recupereObstacles();
    recuperePorteNord();
    recuperePorteSud();
    recupereBibliotheque();
    recuperePC();
    recupereCaissonGauche();
    recupereCaissonDroite();
    recupereGrandBureau();
    recuperePetitBreau();
    recupereLitUn();
    recupereLitDeux();
    recupereConsole();

    jeu_commence = true;

    keys = {};
    document.body.onkeyup =
    document.body.onkeydown = function(evt){
        if(!popupOuverte){
            evt = evt || window.evt;
            var charCode = evt.keyCode || evt.which;
            if (charCode != F12KEY && (charCode<96 || charCode >105) && charCode !=8 && charCode != F5KEY)
                evt.preventDefault();
            if(charCode==SPACEKEY && evt.type == 'keydown'){
                if (dialogBoxShown){
                    deleteDialogue();
                }else{
                    characterMiddleX = character.xPos + (character.width)/2;
                    characterMiddleY = character.yPos + (character.height)/2;
                    var pointClique = getPointClique(characterMiddleX, characterMiddleY);
                    var objetClique = getObjetClique(pointClique);
                    afficheDialogue(objetClique);
                }
            }
            keys[charCode]= evt.type == 'keydown';
        }
    };

    window.scrollTo(Math.min(character.xPos*zoom-(window.innerWidth/2)+10*zoom, 400*zoom-(window.innerWidth/2)), Math.min(character.yPos*zoom-(window.innerHeight/2)+10*zoom, 528*zoom-(window.innerHeight/2)));
    window.requestAnimationFrame(loop);
}

var afficheDialogue = function(objet){
    switch(objet){
        case porteNord:
            dialogBox("C'est la porte Nord, elle mène au cockpit.");
            break;
        case porteSud:
            if(porteSud.verouillee) {
                modalCustom.style.display = "block";
                popupOuverte = true;
                dialogBox("C'est la porte Sud, elle mène aux réacteurs du vaisseau. Il me faut la déverouiller.");
            }else{
                dialogBox("C'est la porte Sud, elle mène aux réacteurs du vaisseau. Elle est déverouillée.");
            }
            break;
        case bibliotheque:
            dialogBox("C'est une bibliothèque, elle contient des livres de programmation.");
            break;
        case pc:
            dialogBox("C'est l'ordinateur central, il permet de piloter le vaisseau.");
            break;
        case caissonGauche:
            dialogBox("Il s'agit d'un caisson de confinement pour voyager en sécurité, mais le temps m'est compté. Je n'ai pas de temps de me reposer.");
            break;
        case caissonDroite:
            dialogBox("Il s'agit d'un caisson de confinement pour voyager en sécurité. Il est fermé,  M.Garcia est sans doute à  l'intérieur.");
            break;
        case grandBureau:
            dialogBox("C'est un grand bureau, M.Palleja s'en sert pour lire son livre favori : \"Coder Proprement\".");
            break;
        case petitBureau:
            dialogBox("C'est un petit bureau, le compte en banque en Suisse de M.Garcia est ecrit sur un des papiers.");
            break;
        case litUn:
            dialogBox("Ce n'est pas le moment de dormir, le vaisseau est endommagé");
            break;
        case litDeux:
            dialogBox("Ce n'est pas le moment de dormir, le vaisseau est endommagé");
            break;
        case console:
            if (!gagne){
                dialogBox("Oui !!! j'ai enfin pu réparer le réacteur, on va pouvoir enfin rentrer chez nous, nous sommes sauvés !!!!");
                gagne = true;
            } else {
                dialogBox("Le réacteur est réparé, nous pouvons rentrer chez nous.");
            }
            break;
    }
}

var getObjetClique = function(point){
    if (pointDans(porteNord, point)){
        return porteNord;
    }else if(pointDans(porteSud, point)){
        return porteSud;
    }else if(pointDans(bibliotheque, point)){
        return bibliotheque;
    }else if(pointDans(pc, point)){
        return pc;
    }else if(pointDans(caissonGauche, point)){
        return caissonGauche;
    }else if(pointDans(caissonDroite, point)){
        return caissonDroite;
    }else if(pointDans(grandBureau, point)){
        return grandBureau;
    }else if(pointDans(petitBureau, point)){
        return petitBureau;
    }else if(pointDans(litUn, point)){
        return litUn;
    }else if(pointDans(litDeux, point)){
        return litDeux;
    }else if(pointDans(console, point)){
        return console;
    }
}

var pointDans = function(entite, point){
    return point.characterMiddleX<entite.xPos+entite.width && point.characterMiddleX>entite.xPos && point.characterMiddleY<entite.yPos+entite.height && point.characterMiddleY>entite.yPos;
}

var getPointClique = function(characterMiddleX, characterMiddleY){
    var pointClique = {characterMiddleX, characterMiddleY};
    switch (character.direction){
        case HAUT:
            pointClique.characterMiddleY -= tailleCase;
            break;
        case BAS:
            pointClique.characterMiddleY += tailleCase;
            break;
        case GAUCHE:
            pointClique.characterMiddleX -= tailleCase;
            break;
        case DROITE:
            pointClique.characterMiddleX += tailleCase;
            break;
    }
    return pointClique;
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

var recupereConsole = function(){
    var consoleHTML = document.getElementById("console");
    console = {
        speed: 1,
        xPos: parseInt(consoleHTML.style.left.replace("px", "")),
        yPos: parseInt(consoleHTML.style.top.replace("px", "")),
        width: tailleCase,
        height: tailleCase,
        direction: BAS,
        model: consoleHTML
    };
}

var recupereCaissonGauche = function(){
    var caissonGaucheHTML = document.getElementById("caissonGauche");
    caissonGauche = {
        speed: 1,
        xPos: parseInt(caissonGaucheHTML.style.left.replace("px", "")),
        yPos: parseInt(caissonGaucheHTML.style.top.replace("px", "")),
        width: tailleCase,
        height: 2*tailleCase,
        model: caissonGaucheHTML
    };
}

var recupereCaissonDroite = function(){
    var caissonDroiteHTML = document.getElementById("caissonDroite");
    caissonDroite = {
        speed: 1,
        xPos: parseInt(caissonDroiteHTML.style.left.replace("px", "")),
        yPos: parseInt(caissonDroiteHTML.style.top.replace("px", "")),
        width: tailleCase,
        height: 2*tailleCase,
        model: caissonDroiteHTML
    };
}

var recupereLitUn = function(){
    var litUnHTML = document.getElementById("lit1");
    litUn = {
        speed: 1,
        xPos: parseInt(litUnHTML.style.left.replace("px", "")),
        yPos: parseInt(litUnHTML.style.top.replace("px", "")),
        width: 2*tailleCase,
        height: tailleCase,
        model: litUnHTML
    };
}

var recupereLitDeux = function(){
    var litDeuxHTML = document.getElementById("lit2");
    litDeux = {
        speed: 1,
        xPos: parseInt(litDeuxHTML.style.left.replace("px", "")),
        yPos: parseInt(litDeuxHTML.style.top.replace("px", "")),
        width: 2*tailleCase,
        height: tailleCase,
        model: litDeuxHTML
    };
}

var recupereGrandBureau = function(){
    var grandBureauHTML = document.getElementById("grandBureau");
    grandBureau = {
        speed: 1,
        xPos: parseInt(grandBureauHTML.style.left.replace("px", "")),
        yPos: parseInt(grandBureauHTML.style.top.replace("px", "")),
        width: 3*tailleCase,
        height: tailleCase,
        model: grandBureauHTML
    };
}

var recuperePetitBreau = function(){
    var petitBureauHTML = document.getElementById("petitBureau");
    petitBureau = {
        speed: 1,
        xPos: parseInt(petitBureauHTML.style.left.replace("px", "")),
        yPos: parseInt(petitBureauHTML.style.top.replace("px", "")),
        width: tailleCase,
        height: tailleCase,
        model: petitBureauHTML
    };
}

var recuperePC = function(){
    var PCHTML = document.getElementById("PC");
    pc = {
        speed: 1,
        xPos: parseInt(PCHTML.style.left.replace("px", "")),
        yPos: parseInt(PCHTML.style.top.replace("px", "")),
        width: 3*tailleCase,
        height: tailleCase,
        model: PCHTML
    };
}

var recupereBibliotheque = function(){
    var bibliothequeHTML = document.getElementById("bibliotheque");
    bibliotheque = {
        xPos: parseInt(bibliothequeHTML.style.left.replace("px", "")),
        yPos: parseInt(bibliothequeHTML.style.top.replace("px", "")),
        width: 3*tailleCase,
        height: tailleCase,
        model: bibliothequeHTML
    }
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
        width: tailleCase,
        height: tailleCase,
        model: obstacleHTML
    };
    return mur;
}

var recuperePorteNord = function(){
    var porteNordHTML = document.getElementById("porteNord");
    porteNord = {
        xPos: parseInt(porteNordHTML.style.left.replace("px", "")),
        yPos: parseInt(porteNordHTML.style.top.replace("px", "")),
        width: tailleCase,
        height: tailleCase,
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
        width: tailleCase,
        height: tailleCase,
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
    if(character.direction == BAS){
      if(keys[DOWNKEY] || keys[SKEY]) {
        if ( character.model.getAttribute("src") != "resImg/persoAvantMarche.gif") {
          character.model.src = "resImg/persoAvantMarche.gif";
        }
      } else {
        character.model.src = "./resImg/persoAvant.png";
      }
    }else if(character.direction == HAUT){
      if(keys[UPKEY] || keys[ZKEY] || keys[WKEY]) {
        if ( character.model.getAttribute("src") != "resImg/persoArriereMarche.gif") {
          character.model.src = "resImg/persoArriereMarche.gif";
        }
      } else {
        character.model.src = "./resImg/persoArriere.png";
      }
    }else if(character.direction == GAUCHE){
      if(keys[LEFTKEY] || keys[QKEY] || keys[AKEY]) {
        if ( character.model.getAttribute("src") != "resImg/persoGaucheMarche.gif") {
          character.model.src = "resImg/persoGaucheMarche.gif";
        }
      } else {
        character.model.src = "./resImg/persoGauche.png";
      }
    }else if(character.direction == DROITE){
      if(keys[RIGHTKEY] || keys[DKEY]) {
        if ( character.model.getAttribute("src") != "resImg/persoDroiteMarche.gif") {
            character.model.src = "resImg/persoDroiteMarche.gif";
        }
      } else {
        character.model.src = "./resImg/persoDroite.png";
      }
    }
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

function dialogBox (message) {
    if (typeof message !== 'object') {
        messageGlobal = message;
    }
    deleteDialogue();
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
    dialogBoxShown = true;
    jeu_commence = false;
}


function deleteDialogue () {
    var element = document.getElementById("dialogBox");
    if (element!=null) {
        element.outerHTML = "";
        delete element;
    }
    dialogBoxShown = false;
    jeu_commence = true;
    window.requestAnimationFrame(loop);
}

function countTimer() {
    //avancement du timer
    document.getElementById("pourcentageVie").style.width = (totalSeconds*100)/totalSecondsInit+"%";
    if (!gagne){
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
            jeu_commence = false;
        }
    } else {
        totalSeconds = totalSecondsInit;
    }
}

/*function popUp (x,y) {
    popupOuverte = true;
    var div = document.createElement('div');
    div.style.zIndex=999;
    div.style.position="absolute";
    div.style.top = x+"px";
    div.style.left = y+"px";
    div.style.fontWeight = "bold";
    div.innerHTML ='<div class="row col-sm-8 col-sm-offset-2 popup-brutforce" id="gamePopUp">'+
                        '<div class="form-group">'+
                            '<label for="exampleInputEmail1">Code à remplir : </label>'+
                            '<p> Pour déverouiller cette porte, vous devez décoder ce mot de passe (en force brute) : <span style="color:red">\'c4b0318bd5d514c92276e5cb55ce15359ce66579\' codé en sha1. </span> </p>'+
                            '<p style="color:red;"><b>Le nom de la fonction devra impérativement s\'appeler : deverouillage() </b></p>'+
                        '</div>'+
                        '<div class="form-group">'+
                          '<textarea name="code" rows="8" id="code"></textarea>'+
                        '</div>'+
                        '<button id="truc" class="btn btn-default pull-right">Envoyé</button>'+
                    '</div>';
    document.body.appendChild(div);
}*/

function resizeBody () {
    document.body.style.width = document.documentElement.clientWidth;
    document.body.style.height = document.documentElement.clientHeight;
    console.log("test"+document.documentElement.clientWidth);
}

$( document ).ready(function() {
  $('#truc').click(function(ev) {
    var leThis = $(this);
    var leCode = $('#code').val();
        $.ajax({
            url : 'deverouillage.php',
            type : 'POST',
            data : 'code='+ leCode,
            dataType : 'json',
            success : function(json) {
                if(porteSud.verouillee){
                    if(json.resultat){
                        porteSud.verouillee=false;
                        dialogBox("SUPER !! J'ai déverouillé la porte !!!");
                        popupOuverte = false;
                        modalCustom.style.display = "none";
                    }else{
                        dialogBox("MINCE ! J'ai fait une erreur dans mon code !");
                        popupOuverte = false;
                        modalCustom.style.display = "none";
                    }
                }
                //console.log("bonjour");
                // if (
                //  (leThis.attr('data-action') == "publie" && json.publie)
                //  || (leThis.attr('data-action') == "valide" && json.valide)
                // ) {
                //  leThis.attr('class', 'btn btn-success'); //change la classe en danger
                //  leThis.text('Oui').text(); //change la valeur du bouton
                // } else if (
                //  (leThis.attr('data-action') == "publie" && ! json.publie)
                //  || (leThis.attr('data-action') == "valide" && ! json.valide)
                // ) {
                //  leThis.attr('class', 'btn btn-danger'); //change la classe en danger
                //  leThis.text('Non').text();
                // }
            },
            error : function(statut) {
                // leThis.attr('class', 'btn btn-danger'); //change la classe en danger
                // leThis.text('Error').text();
            }
        });
    });
});

var gagne = false;

var charXPosInitial = 0;
var charYPosInitial = 0;

var protege=false;
var dialogBoxShown = false;

var tailleCase = 24;

zoom = 6;
var messageGlobal;
document.onload = init();
var totalSeconds = 180;//initalisation du timer de début
var totalSecondsInit = 180;//initalisation et début du timer
var timerVar = setInterval(countTimer, 1000);

var popupOuverte = false;


game_container.style.zoom=zoom;

/*
function deverouillage(){
    return "ACDC";
}
*/
