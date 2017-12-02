$(document).ready(function() {
	$('#plusSession').on("click", function() {
		$('#session').val(parseInt($('#session').val()) + 1);
	})

	$('#minusSession').on("click", function() {
		var x = $('#session').val()
		if(x > 0) {
			$('#session').val(parseInt(x) - 1);
		}
	})

	$('#plusBreak').on("click", function() {
		$('#break').val(parseInt($('#break').val()) + 1);
	})

	$('#minusBreak').on("click", function() {
		var x = $('#break').val();
		if(x>0) {
			$('#break').val(x - 1);
		}
	})
})