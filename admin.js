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
				console.log(json);
			},
			error : function(statut) {
			}
		});
	});
});
