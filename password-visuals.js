var input_ready = false;
var NEEDED_DICE = 15;
var security_info_visible = false;
$(document).ready(function() {
	// things that need to be done when DOM is ready.
	$(":button, .button").button();
	$(".dialog").hide();
	$("#security-info").click(toggleInfo);
	$("#security-form input").change(adjustSecurity);
	$("#progress").progressbar({
			value: 0,
			complete: progressFinished
	});
	$("#dice-thrown").bind("keyup", setProgress);
	$("#dice-thrown").change(setProgress);
	$("#reset").click(reset);
	reset();
});
function toggleInfo(){
	console.log("toggleInfo: called");
	if ( security_info_visible ) {
		console.log("toogleInfo: something is shown, so hide everything.");
		security_info_visible = false;
		$("#usability-security-low").hide();
		$("#usability-security-high").hide();
	} else{
		console.log("toggleInfo: nothing shown, now show something.");
		security_info_visible = true;
		adjustSecurity();
	}
}

function adjustSecurity() {
	if ($(":checked[name='security']").val() == "low" ){
		set_needed_dice(15);
	}else if( $(":checked[name='security']").val() == "high" ){
		set_needed_dice(25);
	}
	if ( security_info_visible ){
		//something is already shown
		var duration = "slow";
		if ( $(":checked[name='security']").val() == "low" ) {
			$("#usability-security-low").show();
			$("#usability-security-high").hide();
			$("#usability-security-low").effect("highlight", {}, duration);
		} else if ( $(":checked[name='security']").val() == "high" ) {
			$("#usability-security-low").hide();
			$("#usability-security-high").show();
			$("#usability-security-high").effect("highlight", {}, duration);
		}
	} else {
		//nothing is already shown, don't change what is shown
	}
}

function set_needed_dice(dice){
	NEEDED_DICE = dice;
	$("#needed").val(NEEDED_DICE);
	$("#dice-thrown").attr("maxlength", dice);
}
function reset(){
	$("#dice-thrown").val("");
	$("#newpassword input").val("");
	$(".LCD").removeClass("finished");
	set_needed_dice(NEEDED_DICE);
	setProgress();
}

function progressFinished(){
	if (validate_dice_thrown()){
		$(".LCD").addClass("finished");
		input_ready = true;
		set_password( find_password($("#dice-thrown").val()) );
	}
}

function check_password(password){
	if ( input_ready && Math.pow(26, password.length) < Math.pow(7776, Math.floor(NEEDED_DICE/5))  ){
		$("#too-short").dialog({
			position:"center", 
			buttons: { "Ok": function() { $(this).dialog("close"); } }
		});
		reset();
		return false;
	}
	return true;
}

function set_password(password){
	if (check_password(password) ){
		$("#newpassword input").val(password);
		//only highlight if the password has been set
		if ( password != "" && password != null){
			$("#newpassword").show("highlight", {}, 2000);
		}
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
	var completion = progress / NEEDED_DICE * 100.0;
	$("#thrown").val(progress);
	if ( progress != NEEDED_DICE ){
		$(".LCD").removeClass("finished");
	}
	$("#progress").progressbar("value", completion );
	// don't do any validation when backspace was pressed.
	if ( event != null && event.which == 8){
		$(".LCD").removeClass("finished");
		
		input_ready = false;
		return;
	}else {
		validate_dice_thrown();
	}
}
