$(document).ready(function() {

	$('#sessionText').html('Session Running');

	timer();

	$('#plusBreak').on("click", function() {
		$('#sessionText').html('Break Time');
		var x = $('#break').val();
		if(x < 59) {
			$('#break').val(parseInt($('#break').val()) + 1);
			$('#minutes').val(parseInt($('#break').val()));
			$('#seconds').val(0);
			//addZero();
		}
	})

	$('#minusBreak').on("click", function() {
		$('#sessionText').html('Break Time');
		var x = $('#break').val();
		if(x > 0) {
			$('#break').val(x - 1);
			$('#minutes').val(parseInt($('#break').val()));
			$('#seconds').val(0);
			//addZero();
		}
	})

	$('#plusSession').on("click", function() {
		var x = $('#session').val();
		if(x < 59) {
			$('#session').val(parseInt($('#session').val()) + 1);
			$('#minutes').val(parseInt($('#session').val()));
			$('#seconds').val(0);
			//addZero();
		}
	})

	$('#minusSession').on("click", function() {
		var x = $('#session').val()
		if(x > 0) {
			$('#session').val(parseInt(x) - 1);
			$('#minutes').val(parseInt($('#session').val()));
			$('#seconds').val(0);
			//addZero();
		}
	})

	function timer() {

		addZero();

		var x = $('#seconds').val();

		if(x == 0) {
			$('#seconds').val(59);
			$('#minutes').val($('#minutes').val() - 1);
			addZero();
		}
		else{
			$('#seconds').val(x - 1);
		}
		setTimeout(timer, 1000);
	}

	function addZero() {
		if($('#minutes').val() < 10) {
			$('#minutes').val('0' + $('#minutes').val()[$('#minutes').val().length - 1]);
		}
		else if($('#seconds').val() < 10) {
			$('#seconds').html('0' + $('#seconds').val());
		}
	}
})