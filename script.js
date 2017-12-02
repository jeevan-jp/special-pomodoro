$(document).ready(function() {

	var flag1 = 0;		// flag1 becomes 1 when user starts the timer
	var flag2 = 0;		// flag2 becomes 1 when user stops the timer
	var flag3 = 0; 		// flag3 becomes 1 either flag1 or flag2 to changes.

	$('.box').on("click", function() {
		flag3 = 1;
		if(flag1 == 0) {
			if($('#sessionText').html() == '') {
				$('#sessionText').html('Session Running');
			}
			flag1 = 1;
			timer();
		}
		else 
			flag2 = 1;
	})

	$('#plusBreak').on("click", function() {
		var x = $('#break').val();
		if(x <= 59 && flag1 == 0) {
			$('#break').val(parseInt($('#break').val()) + 1);
			//addZero();
		}
		else {
			alert('Please stop the current session to use this functionality.');
		}
	})

	$('#minusBreak').on("click", function() {
		var x = $('#break').val();
		if(x > 0 && flag1 == 0) {
			$('#break').val(parseInt($('#break').val()) - 1);
			//addZero();
		}
		else {
			alert('Please stop the current session to use this functionality.');
		}
	})

	$('#plusSession').on("click", function() {
		var x = $('#session').val();
		if(x <= 59 && flag1 == 0) {
			if(flag3==1) {
				$('#sessionText').html('Session Running');
			}
			$('#session').val(parseInt($('#session').val()) + 1);
			$('#minutes').val(parseInt($('#session').val()));
			$('#seconds').val(0);

			if($('#seconds').val() < 10) {
				$('#seconds').val('0' + $('#seconds').val()[$('#seconds').val().length - 1]);
			}
			//addZero();
		}
		else {
			alert('Please stop the current session to use this functionality.');
		}
	})

	$('#minusSession').on("click", function() {
		var x = $('#session').val()
		if(x > 0 && flag1 == 0) {
			if(flag3==1) {
				$('#sessionText').html('Session Running');
			}
			$('#session').val(parseInt(x) - 1);
			$('#minutes').val(parseInt($('#session').val()));
			$('#seconds').val(0);
			if($('#seconds').val() < 10) {
				$('#seconds').val('0' + $('#seconds').val()[$('#seconds').val().length - 1]);
			}
			//addZero();
		}
		else {
			alert('Please stop the current session to use this functionality.');
		}
	})

	function timer() {
		if(flag2 == 1) {
			flag1 = 0;
			flag2 = 0;
			return;
		}

		addZero();

		var x = $('#seconds').val();
		var y = $('#minutes').val();

		if(x == 0 && y > 0) {
			$('#seconds').val(59);
			$('#minutes').val($('#minutes').val() - 1);
			addZero();
		}
		else if( y>=0 && x>0){
			$('#seconds').val(x - 1);
			addZero();
		}
		else if(x==0 && y==0) {
			$('#sessionText').html('Break Time');
			$('#minutes').val(parseInt($('#break').val()));
			$('#seconds').val(0);
		}
		setTimeout(timer, 1000);
	}

	function addZero() {
		if($('#minutes').val() < 10) {
			$('#minutes').val('0' + $('#minutes').val()[$('#minutes').val().length - 1]);
		}
		if($('#seconds').val() < 10) {
			$('#seconds').val('0' + $('#seconds').val()[$('#seconds').val().length - 1]);
		}
	}
})