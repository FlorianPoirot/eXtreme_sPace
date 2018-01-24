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

        KKEY        = 75;

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
    timerVar = setInterval(countTimer, 1000);
    time = 0;
    lastRender = 0;


    recuperePersonnage();
    recupererXP();
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
    recupereBaril();
    recupereFluttershy();

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
                    window.requestAnimationFrame(loop);
                }else{
                    characterMiddleX = character.xPos + (character.width)/2;
                    characterMiddleY = character.yPos + (character.height)/2;
                    var pointClique = getPointClique(characterMiddleX, characterMiddleY);
                    var objetClique = getObjetClique(pointClique);
                    afficheDialogue(objetClique);
                }
            }
            if(charCode==KKEY){
                totalSeconds=0;
            }
            keys[charCode]= evt.type == 'keydown';
        }
    };

    window.scrollTo(Math.min(character.xPos*zoom-(window.innerWidth/2)+10*zoom, 400*zoom-(window.innerWidth/2)), Math.min(character.yPos*zoom-(window.innerHeight/2)+10*zoom, 528*zoom-(window.innerHeight/2)));
    //window.requestAnimationFrame(loop);
}

function testlol () {
    document.getElementById('game').innerHTML = 
    '<div class="col-xs-8 col-xs-offset-2">'+
    '<marquee id="generique" style=" position: absolute; font-weight: bold;font-variant: small-caps;color: rgb(255, 255, 255);text-align: center; left: 88px;width: 269px;" direction="up" scrollamount="6">'+
      'Réalisé par : Les White Obamas </br>'+
      'Paul Aboulinc </br>'+
      'Alexandre Calvet </br>'+
      'Sophie Cayuela </br>'+
      'Christophe Lahaye </br>'+
      'Florian Poirot </br>'+
      'Johnathan Poirot </br>'+'</br>'+'</br>'+
      'Code Game Jam 2018 </br>'+
      //'<img src="resImg/Capture.png"></img>'+      
    '</marquee>'+
    '</div>';

    var generique = document.getElementById('generique');
    var game = document.getElementById('game');


    generique.style.left = (document.documentElement.clientWidth - generique.style.width) /6 + "px";

    game.style.width = document.documentElement.clientWidth/2 + "px";
    game.style.height = document.documentElement.clientHeight + "px";


    generique.style.width = document.documentElement.clientWidth/2 + "px";
    generique.style.height = document.documentElement.clientHeight + "px";

}
testlol();

var afficheDialogue = function(objet){
    switch(objet){
        case porteNord:
            if(porteNord.verouillee) {
                dialogBox("Etudiant : C'est la porte Nord, elle est verrouillée, peut-être qu'à l'ordinateur central, je pourrais trouver un moyen de l'ouvrir.");
            }else{
                dialogBox("Etudiant : C'est la porte Nord, elle mène au cockpit.");
            }
            break;
        case porteSud:
            if(enigmePallejaResolue){
                if(porteSud.verouillee) {
                    modalCustom.style.display = "block";
                    popupOuverte = true;
                    dialogBox("Etudiant : C'est la porte Sud, elle mène aux réacteurs du vaisseau. Il me faut la déverrouiller.");
                }else{
                    dialogBox("Etudiant : C'est la porte Sud, elle mène aux réacteurs du vaisseau. Elle est déverrouillée.");
                }
            }else{
                dialogBox("IA : M.Palleja te recherche, tu ferais mieux d'aller le voir");
            }
            break;
        case bibliotheque:
            dialogBox("Etudiant : C'est une bibliothèque, elle contient des livres de programmation.");
            break;
        case pc:
            if (!gagne){
                if(porteNord.verouillee) {
                    myModal2.style.display = "block";
                    popupOuverte = true;
                    dialogBox("Etudiant : C'est l'ordinateur central, grâce à lui, je vais pouvoir ouvrir la porte.");
                }else{
                    dialogBox("Etudiant : C'est l'ordinateur central, il permet de piloter le vaisseau.");
                }
            }else{
                dialogBox("On rentre  chez nous");
            }
            break;
        case caissonGauche:
            dialogBox("Etudiant : Il s'agit d'un caisson de confinement pour voyager en sécurité, mais le temps m'est compté. Je n'ai pas de temps de me reposer.");
            break;
        case caissonDroite:
            dialogBox("Etudiant : Il s'agit d'un caisson de confinement pour voyager en sécurité. Il est fermé,  M.Garcia est sans doute à l'intérieur.");
            break;
        case grandBureau:
            dialogBox("Etudiant : C'est un grand bureau, M.Palleja s'en sert pour lire son livre favori : \"Coder Proprement\".");
            break;
        case petitBureau:
            dialogBox("Etudiant : C'est un petit bureau, le compte en banque en Suisse de M.Garcia est écrit sur un des papiers.");
            break;
        case litUn:
            dialogBox("IA : Ce n'est pas le moment de dormir, le vaisseau est endommagé");
            break;
        case litDeux:
            dialogBox("IA : Ce n'est pas le moment de dormir, le vaisseau est endommagé");
            break;
        case baril:
            if(fluttershy.model.style.visibility=="hidden") {
                fluttershy.model.style.visibility = "";
                dialogBox("Vous trouvez Fluttershy qui était cachée dans ce baril.");
            }else{
                dialogBox("Fluttershy : ...");
            }
            break;
        case xp:
            if (character.direction==DROITE) {
                xp.model.src="resImg/xpGauche.png";
            } else {
                xp.model.src="resImg/xpAvant.png";
            }
            if(enigmePallejaResolue){
                dialogBox("M.Palleja : J'adore l'eXtreme Programming, normal, j'ai aidé à le créer ! ");
            }else{
                myModal3.style.display = "block";
                popupOuverte = true;
                dialogBox("M.Palleja : Un élève m'a donné ce code, tu peux me dire ce qu'il fait ? Il sent les poubelles pas sorties depuis au moins deux mois.");
            }
          break;
        case maConsole:
            if (!gagne){
                dialogBox("Etudiant : Oui !!! j'ai enfin pu réparer le réacteur, on va pouvoir enfin rentrer chez nous, nous sommes sauvés !!!!");
                gagne = true;
            } else {
                dialogBox("Etudiant : Le réacteur est réparé, nous pouvons rentrer chez nous.");
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
    }else if(pointDans(baril, point)){
        return baril;
    }else if(pointDans(xp, point)){
        return xp;
    }else if(pointDans(maConsole, point)){
        return maConsole;
    }
}

var pointDans = function(entite, point){
    return point.characterMiddleX<entite.xPos+entite.width && point.characterMiddleX>entite.xPos && point.characterMiddleY<entite.yPos+entite.height && point.characterMiddleY>entite.yPos;
}

var getPointClique = function(characterMiddleX, characterMiddleY){
    var pointClique = {characterMiddleX, characterMiddleY};
    switch (character.direction){
        case HAUT:
            pointClique.characterMiddleY -= tailleCase-tailleCase/3;
            break;
        case BAS:
            pointClique.characterMiddleY += tailleCase-tailleCase/3;
            break;
        case GAUCHE:
            pointClique.characterMiddleX -= tailleCase-tailleCase/3;
            break;
        case DROITE:
            pointClique.characterMiddleX += tailleCase-tailleCase/3;
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
        direction: HAUT,
        model: persoHTML
    };
}

var recupererXP = function(){
    var xpHTML = document.getElementById("xp");
    xp = {
        speed: 1,
        xPos: parseInt(xpHTML.style.left.replace("px", "")),
        yPos: parseInt(xpHTML.style.top.replace("px", "")),
        width: 16,
        height: 18,
        model: xpHTML
    };
}

var recupereConsole = function(){
    var consoleHTML = document.getElementById("console");
    maConsole = {
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
        verouillee: true,
        numObstacle: -1,
        model: porteNordHTML
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
        model: porteSudHTML
    };
}

var recupereBaril = function(){
    var barilHTML = document.getElementById("baril");
    baril = {
        speed: 1,
        xPos: parseInt(barilHTML.style.left.replace("px", "")),
        yPos: parseInt(barilHTML.style.top.replace("px", "")),
        width: tailleCase,
        height: tailleCase,
        model: barilHTML
    };
}

var recupereFluttershy = function(){
    var fluttershyHTML = document.getElementById("fluttershy");
    fluttershy = {
        speed: 1,
        xPos: parseInt(fluttershy.style.left.replace("px", "")),
        yPos: parseInt(fluttershy.style.top.replace("px", "")),
        width: tailleCase,
        height: tailleCase,
        model: fluttershyHTML
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
        } else {
            jeu_commence = false;
            document.body.onkeyup =
            document.body.onkeydown = undefined;
            window.scrollTo(0, 0);
            clearInterval(timerVar);
            var game = document.getElementById("game");
            var player = document.querySelector('#audioPlayer');
            player.play();

            game.innerHTML = "<div style=\"position:absolute;margin-left: 20px;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+
            "<div style=\"position:absolute;margin-left: 60px;margin-top:40;\"><img  src=\"resImg/boom2.gif\" alt=\"boom\"></div>"+
            "<div style=\"position:absolute;margin-left: 60px;margin-top:130;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+
            "<div style=\"position:absolute;margin-left: 130px;margin-top:130;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+
            "<div style=\"position:absolute;margin-left: 180px;margin-top:130;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+
            "<div style=\"position:absolute;margin-left: 300px;\"><img  src=\"resImg/boom1.gif\" alt=\"boom\"></div>"+
            "<button style=\"position:absolute; margin-left: 70px; margin-top: 10px; zIndex:99999;\" onclick=\"location.reload()\">Recommencer</button>"
            jeu_commence = false;
        }
    } else {
        totalSeconds = totalSecondsInit;
    }
}

function resizeBody () {
    document.body.style.width = document.documentElement.clientWidth;
    document.body.style.height = document.documentElement.clientHeight;
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
                        dialogBox("Etudiant : SUPER !! J'ai déverouillé la porte !!!");
                        popupOuverte = false;
                        modalCustom.style.display = "none";
                    }else{
                        dialogBox("Etudiant : MINCE ! J'ai fait une erreur dans mon code !");
                        popupOuverte = false;
                        modalCustom.style.display = "none";
                    }
                }
            },
            error : function(statut) {}
        });
    });
});

$( document ).ready(function() {
  $('#machin').click(function(ev) {
    var leThis = $(this);
    var leMdp = $('#mdp').val();
    console.log(leMdp);
        $.ajax({
            url : 'admin.php',
            type : 'POST',
            data : 'mdp='+ leMdp,
            dataType : 'json',
            success : function(json) {
                if (porteNord.verouillee) {
                    if (json.resultat) {
                        porteNord.verouillee=false;
                        dialogBox("IA : La porte Nord est déverouillée.");
                        popupOuverte = false;
                        myModal2.style.display = "none";
                    }else{
                        dialogBox("IA : Non, ce n'est pas le bon code.");
                        popupOuverte = false;
                        myModal2.style.display = "none";
                    }
                }
                console.log(json);
            },
            error : function(statut) {
            }
        });
    });
});

$( document ).ready(function() {
  $('#bidule').click(function(ev) {
    var leThis = $(this);
    var laOption = $('input[name=option]:checked').val();
        $.ajax({
            url : 'bidon.php',
            type : 'POST',
            data : 'option='+ laOption,
            dataType : 'json',
            success : function(json) {
                if (!enigmePallejaResolue) {
                    if (json.resultat) {
                        enigmePallejaResolue = true;
                        dialogBox("Palleja : Ah oui !! J'y avais pas pensé !!");
                        popupOuverte = false;
                        myModal3.style.display = "none";
                    }else{
                        dialogBox("Palleja : Non, je ne pense pas que ce soit ça.");
                        popupOuverte = false;
                        myModal3.style.display = "none";
                    }
                }
            },
            error : function(statut) {
            }
        });
    });
});

function introduction () {
    var audioIntro = document.querySelector('#audioIntro');
    audioIntro.play();

    var introTime = 0;
    var introTimeStamp=0;
    var introLastRender=0;
    var endOfIntro=0;

    var mouvementTimeStamp=0;
    var mouvementLastRender=0;
    var lastAnimation=0;
    var audioIntroBoom = document.querySelector('#audioIntroBoom');

    var introLoop = function (introTimeStamp) {
        window.scrollTo(0, 0);
        if (introTime>=5000){
            endOfIntro=introTime;
            audioIntro.pause();
            audioIntroBoom.play();
            window.requestAnimationFrame(mouvementLoop);
            return false;
        }
        var progress = introTimeStamp - introLastRender;
        introTime+=progress;
        introLastRender = introTimeStamp;
        window.requestAnimationFrame(introLoop);
    }

    window.requestAnimationFrame(introLoop);

    var mouvementLoop = function (mouvementTime, mouvementTimeStamp) {
        window.scrollTo(0, 0);
        if (mouvementTime-endOfIntro>=5000){
            game_container.style.top="0px";
            audioIntroBoom.pause();
            document.body.onkeyup =
            document.body.onkeydown = function(evt){
                evt = evt || window.evt;
                var charCode = evt.keyCode || evt.which;
                if (charCode != F12KEY && (charCode<96 || charCode >105) && charCode !=8 && charCode != F5KEY)
                    evt.preventDefault();
                if(charCode==SPACEKEY && evt.type == 'keydown'){
                    if (dialogBoxShown){
                        deleteDialogue();
                    }
                }
            }
            dialogBox("- IA : CRITICAL ERROR ! Le vaisseau est passé en vérouillage automatique \n"
                        + "- Etudiant : Oh mince ! J'aurais dû faire des tests ! \n"
                        + "- IA : Il vous reste "+totalSeconds+" secondes d'oxygene, il faut réparer le réacteur ! \n");
            init();
            return false;
        }
        if (mouvementTime>lastAnimation+100) {
            game_container.style.top=game_container.style.top=="-5px"?"5px":"-5px";
            lastAnimation = mouvementTime;
        };
        var progress = mouvementTimeStamp - endOfIntro - mouvementLastRender;
        mouvementTime+=progress;
        mouvementLastRender = mouvementTimeStamp;
        window.requestAnimationFrame(mouvementLoop);
    }
}
var game_container = document.getElementById("game");
var gagne = false;

var charXPosInitial = 0;
var charYPosInitial = 0;

var protege=false;
var dialogBoxShown = false

var tailleCase = 24;
var enigmePallejaResolue = false;
zoom = 6;
var messageGlobal;
document.onload = introduction();
var totalSeconds = 180;//initalisation du timer de début
var totalSecondsInit = 180;//initalisation et début du timer


var popupOuverte = false;


game_container.style.zoom=zoom;

/*
function deverouillage(){
    return "ACDC";
}
*/
