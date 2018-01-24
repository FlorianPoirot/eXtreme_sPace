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
				console.log(json);
			},
			error : function(statut) {
			}
		});
	});
});
