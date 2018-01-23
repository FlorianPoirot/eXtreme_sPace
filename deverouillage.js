//
// function popUp (x,y) {
// 	var div = document.createElement('div');
// 	div.style.zIndex=999;
// 	div.style.position="absolute";
// 	div.style.top = x+"px";
// 	div.style.left = y+"px";
// 	div.style.color = "RED";
// 	div.style.fontWeight = "bold";
// 	div.innerHTML = '<p>test</p>';
// 	document.getElementById('game').appendChild(div);
// }
//
//
// function dialogBox (y) {
// 	var div = document.createElement('div');
// 	div.style.zIndex=999;
// 	div.style.position="absolute";
// 	div.style.bottom = "20px";
// 	div.style.left = y+"px";
// 	div.style.color = "RED";
// 	div.style.fontWeight = "bold";
// 	div.innerHTML = '<p>test</p>';
// 	document.getElementById('game').appendChild(div);
// }
//
// $( document ).ready(function() {
// 	$("#truc").on('click',function(e){
// 		var leThis = $(this);
// 		var leCode = $("#code").val();
// 		console.log('bonjour');
// 		console.log(leCode);
// 		if (leCode != null && leCode != '') {
// 			console.log('non null');
// 		}else {
// 			console.log('nul');
// 		}
// 		$.ajax({
// 			url : './cctatt/cctatt_ajax.php',
// 			type : 'GET',
// 			data : 'cct='+cct,
// 			datatype:'html',
// 			success: function(code_html,statut){
// 				$('#bloc_cct_att').html(code_html);
// 			}
// 	 	});
// 	});
// });

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
