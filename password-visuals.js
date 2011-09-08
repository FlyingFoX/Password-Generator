$(document).ready(function() {
	// things that need to be done when DOM is ready.
	$("#debug").resizable();
	$("#debug").draggable();
	$(":button").button();
	$("#menu").menu();
	$("#progress").progressbar({value: 0});
	setProgress();
	$("#dice-thrown").keyup(setProgress);
	$(".debug-progress").click(function(){
		$("#debug").append("<br>myval = " + this.value);
		$("#progress").progressbar("value", parseInt(this.value) );
	});
});

function setProgress(){
	var progress = $("#dice-thrown").val().length;
	var EASY = 3.0;
	var HARD = 5.0;
	var NEEDED_DICE = 5.0 * EASY;
	var completion = progress / NEEDED_DICE * 100.0;
	$("#thrown").val(progress);
	$("#needed").val(NEEDED_DICE);
	if ( progress == NEEDED_DICE ){
		$(".LCD").addClass(".finished");
	}else {
		$(".LCD").removeClass(".finished");
	}
	/*$("#debug").append("<br>setprogress called completion = " + completion);*/
	$("#progress").progressbar("value", completion );
}
