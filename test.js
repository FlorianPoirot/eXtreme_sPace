
/*
function popUp (x,y) {
	var div = document.createElement('div');
	div.style.zIndex=999;
	div.style.position="absolute";
	div.style.top = x+"px";
	div.style.left = y+"px";
	div.style.fontWeight = "bold";
	div.innerHTML ='<div class="row col-sm-8 col-sm-offset-2 popup-brutforce id="gamePopUp">'+
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
				console.log(json);
				//console.log("bonjour");
				// if (
				// 	(leThis.attr('data-action') == "publie" && json.publie)
				// 	|| (leThis.attr('data-action') == "valide" && json.valide)
				// ) {
				// 	leThis.attr('class', 'btn btn-success'); //change la classe en danger
				// 	leThis.text('Oui').text(); //change la valeur du bouton
				// } else if (
				// 	(leThis.attr('data-action') == "publie" && ! json.publie)
				// 	|| (leThis.attr('data-action') == "valide" && ! json.valide)
				// ) {
				// 	leThis.attr('class', 'btn btn-danger'); //change la classe en danger
				// 	leThis.text('Non').text();
				// }
			},
			error : function(statut) {
				// leThis.attr('class', 'btn btn-danger'); //change la classe en danger
				// leThis.text('Error').text();
			}
		});
	});
});

function resizeBody () {
	document.body.style.width = document.documentElement.clientWidth;
	document.body.style.height = document.documentElement.clientHeight;
	console.log("test"+document.documentElement.clientWidth);
}

resizeBody();
popUp(document.documentElement.clientHeight/4,document.documentElement.clientWidth/4);

