$(document).ready(function() {
	
		var audioTick = new Audio('https://raw.githubusercontent.com/jeevan-jp/special-pomodoro/master/audio/Tick-DeepFrozenApps-397275646.mp3');
		var timeOut = new Audio('https://raw.githubusercontent.com/jeevan-jp/special-pomodoro/master/audio/Air%20Horn-SoundBible.com-964603082.mp3');
		var songs = ['https://docs.google.com/uc?export=download&id=1eNWNtDIeCHnst8nIu0ZX8Vn0uio0o1KY', 'https://docs.google.com/uc?export=download&id=1kK3qdSDM5LqMOvZphgVASRd03EIXcGc-', 'https://docs.google.com/uc?export=download&id=1FeW32jQLzVbGnj1yfsSLyxQ7kfKZR4UJ', 'https://docs.google.com/uc?export=download&id=1aa-nrfKra2kx15dBNavH4AuVSIsyEKxD'];
		//var shape1 = new Audio('https://docs.google.com/uc?export=download&id=1eNWNtDIeCHnst8nIu0ZX8Vn0uio0o1KY', 'https://docs.google.com/uc?export=download&id=1kK3qdSDM5LqMOvZphgVASRd03EIXcGc-', 'https://docs.google.com/uc?export=download&id=1FeW32jQLzVbGnj1yfsSLyxQ7kfKZR4UJ', 'https://docs.google.com/uc?export=download&id=1aa-nrfKra2kx15dBNavH4AuVSIsyEKxD');
		var flag1 = 0;		// flag1 will be 1 when user starts the timer.
		var flag2 = 0;		// flag2 will be 1 when user stops the timer.
		var flag3 = 0; 		// flag3 will be 1 either flag1 or flag2 to changes.
		var flag4 = 0; 		// flag4 will be 1 if break time starts.
	
		startDictation();
	
	
		$('.box').on("click", function() {
			flag3 = 1;
			if(flag1 == 0) {
				if($('#sessionText').html() == '' || $('#sessionText').html('Session Paused')) {
					$('#sessionText').html('Session Running');
				}
				flag1 = 1;
				timer();
			}
			else {
				$('#sessionText').html('Session Paused');
				flag2 = 1;
			}
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
				timeOut.play();
				if(flag4 == 0) {			//Break time ends, and session time will start again.
					flag4 = 1;
					$('#sessionText').html('Break Time');
					$('#minutes').val(parseInt($('#break').val()));
					$('#seconds').val(0);
				}
				else if(flag4 == 1) {		//Session time ends, and break will start.
					flag4 = 0;
					$('#sessionText').html('Session running');
					$('#minutes').val(parseInt($('#session').val()));
					$('#seconds').val(0);
				}
			}
			audioTick.play();
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
	
		function startDictation() {
	
			window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			  var recognition = new SpeechRecognition();
			
			  recognition.interimResults = true;
			  
			  recognition.onend = function(e) {
				  startDictation();
			  }
	
			  recognition.addEventListener('result', e => {
				  //console.log(e.results);
				  const transcript = Array.from(e.results)
					  .map(result => result[0])
					  .map(result => result.transcript)
					  .join('').toString();
					  var lowercase = transcript.toLowerCase();
					
				  console.log(lowercase);
				  if(lowercase === "ok google" || lowercase === "noise" || lowercase === "make some noise") {
					timeOut.play();
				  }
	
				  if((lowercase === "start" || lowercase === "star" || lowercase === "at") && flag1 == 0) {
					$('.box').click();
					flag1 = 1;
				  }
	
				  if((lowercase === "stop"|| lowercase === "top" || lowercase === "up" || lowercase === "pause") && flag2 == 0) {
					$('#sessionText').html('Session Paused');
					$('.box').click();
					flag2 = 1;
				  }
	
				  if(lowercase === "refresh" || lowercase === "fresh") {
					  location.reload();
				  }
	
				  if(lowercase === "close") {
					  window.location = "https://google.com/";
				  }
	
				  if(lowercase === "play") {
					  var a = songs[Math.floor(Math.random()*songs.length)];
					  console.log(a);
					  var song = new Audio(a);
					  song.play();
				  }
			  });
	
			recognition.start();
		}
	})