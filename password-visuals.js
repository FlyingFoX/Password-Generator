var input_ready = false;
var NEEDED_DICE = 15;
var security_info_visible = false;
document.addEventListener('DOMContentLoaded', function(){
  document.querySelector("#security-info").onclick = toggleInfo;
  document.querySelector("#reset").onclick = reset;
  document.querySelectorAll(".dialog").forEach(hide);
  document.querySelectorAll("#security-form input").forEach(function(element){
    element.onchange = adjustSecurity;
  });
  var dice_thrown = document.getElementById("dice-thrown");
  dice_thrown.onchange = setProgress;
  dice_thrown.onkeyup = setProgress;
  reset();
});

function toggleInfo(){
  console.log("toggleInfo: called");
  if ( security_info_visible ) {
    security_info_visible = false;
    hideById("usability-security-low");
    hideById("usability-security-high");
  } else{
    security_info_visible = true;
    adjustSecurity();
  }
}

function adjustSecurity() {
  var security_input = document.querySelector(":checked[name='security']");
  if (security_input.value == "low" ){
    set_needed_dice(15);
  }else if(security_input.value == "high" ){
    set_needed_dice(25);
  }
  if ( security_info_visible ){
    //something is already shown
    var duration = "slow";
    if ( security_input.value == "low" ) {
      hideById("usability-security-high");
      showById("usability-security-low");
      $("#usability-security-low").effect("highlight", {}, duration);
    } else if ( security_input.value == "high" ) {
      hideById("usability-security-low");
      showById("usability-security-high");
      $("#usability-security-high").effect("highlight", {}, duration);
    }
  } else {
    //nothing is already shown, don't change what is shown
  }
}

function set_needed_dice(dice){
  NEEDED_DICE = dice;
  document.getElementById("needed").value = NEEDED_DICE;
  $("#dice-thrown").attr("maxlength", dice);
}

function reset(){
  document.getElementById("dice-thrown").value = "";
  document.getElementById("newpassword input").value = "";
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

function hideById(id){
  hide(document.getElementById(id));
}

function showById(id){
  document.getElementById(id).style.display = "inline-block";
}

function set_password(password){
  var pw_input = document.querySelector("#newpassword input");
  // only set the password if it is valid and non empty
  if (check_password(password)
      && password != "" && password != null ){
    var oldpassword = pw_input.value;
    pw_input.value = password;
    // only highlight if the password changed
    if (oldpassword != password ){
      $("#newpassword").show("highlight", {}, 2000);
    }
  }else{
    pw_input.value = "";
  }
}

function validate_dice_thrown(){
  var dice = document.getElementById("dice-thrown").value;
  var one_to_six = /^[1-6]*$/;
  var result = one_to_six.test(dice);
  if (!result){
    $("#wrong-text").dialog();
  }
  return result;
}

function setProgress(event){
  var dice_thrown = document.getElementById("dice-thrown");
  var progress = dice_thrown.value.length;
  document.getElementById("thrown").value = progress;
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
      set_password( find_password(dice_thrown.value) );
    }
  }
}
