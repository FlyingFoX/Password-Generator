var input_ready = false;
$(document).ready(function() {
	// things that need to be done when DOM is ready.
	$("#debug").resizable();
	$("#debug").draggable();
	$(":button").button();
	$("#menu").menu();
	$("#progress").progressbar({
			value: 0,
			complete: progressFinished
	});
	//setProgress(); //should not be neccessary.
	$("#dice-thrown").bind("keyup", setProgress);
	$(".debug-progress").click(function(){
		$("#debug").append("<br>myval = " + this.value);
		$("#progress").progressbar("value", parseInt(this.value) );
	});
	reset();
});

function reset(){
	$("#dice-thrown").val("");
	$("#newpassword input").val("");
	setProgress();
}

function progressFinished(){
	if (validate_dice_thrown()){
		$(".LCD").addClass("finished");
		input_ready = true;
		set_password( find_password($("#dice-thrown").val()) );
	}
}

function set_password(password){
	$("#newpassword input").val(password);
	//only highlight if the password has been set
	if ( password != "" && password != null){
		$("#newpassword").show("highlight", {}, 2000);
	}
}

function validate_dice_thrown(){
	var dice = $("#dice-thrown").val();
	var one_to_six = /^[1-6]*$/;
	var result = one_to_six.test(dice);
	if (!result){
		$("#wrong-text").dialog();
	}
	return result;
}

function setProgress(event){
	var progress = $("#dice-thrown").val().length;
	var EASY = 3.0;
	var HARD = 5.0;
	var NEEDED_DICE = 5.0 * EASY;
	var completion = progress / NEEDED_DICE * 100.0;
	$("#thrown").val(progress);
	$("#needed").val(NEEDED_DICE);
	// don't do any validation when backspace was pressed.
	if ( event != null && event.which == 8){
		return;
	}else {
		validate_dice_thrown();
	}
	if ( progress != NEEDED_DICE ){
		$(".LCD").removeClass("finished");
	}
	/*$("#debug").append("<br>setprogress called completion = " + completion);*/
	$("#progress").progressbar("value", completion );
}
