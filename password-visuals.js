var input_ready = false;
var NEEDED_DICE = 15;
var security_info_visible = false;
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector("#security-info").onclick = toggleInfo;
    document.querySelector("#reset").onclick = reset;
    document.querySelectorAll(".dialog").forEach(hide);
});
$(document).ready(function() {
	// things that need to be done when DOM is ready.
	$(":button, .button").button();
	$("#security-form input").change(adjustSecurity);
	$("#dice-thrown").bind("keyup", setProgress);
	$("#dice-thrown").change(setProgress);
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
			$("#usability-security-high").hide();
			$("#usability-security-low").show();
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

function check_password(password){
	if ( input_ready && Math.pow(26, password.length) < Math.pow(7776, Math.floor(NEEDED_DICE/5))  ){
		$("#too-short").dialog({
			position:"center", 
			buttons: { "OK": function() { $(this).dialog("close"); } }
		});
		reset();
		return false;
	}
	return true;
}
function hide(element){
    element.style.display = "none";
}
function set_password(password){
	// only set the password if it is valid and non empty
	if (check_password(password) 
			&& password != "" && password != null ){
		var oldpassword = $("#newpassword input").val();
		$("#newpassword input").val(password);
		// only highlight if the password changed
		if (oldpassword != password ){
			$("#newpassword").show("highlight", {}, 2000);
		}
	}else{
		$("#newpassword input").val("");
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
	$("#thrown").val(progress);
	// don't do any validation when backspace was pressed.
	if ( event != null && event.which == 8){
		$(".LCD").removeClass("finished");
		input_ready = false;
		return;
	}else {
		var valid = validate_dice_thrown();
		if (valid && progress == NEEDED_DICE ){
			$(".LCD").addClass("finished");
			input_ready = true;
			set_password( find_password($("#dice-thrown").val()) );
		}
	}
}
