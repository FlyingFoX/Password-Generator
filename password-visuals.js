var input_ready = false;
var NEEDED_DICE = 15;
var security_info_visible = false;
document.addEventListener('DOMContentLoaded', function(){
  ui = new UI();
  ui.security_info.onclick = toggleInfo;
  ui.reset.onclick = reset;
  document.querySelectorAll(".dialog").forEach(hide);
  document.querySelectorAll("#security-form input").forEach(function(element){
    element.onchange = adjustSecurity;
  });
  ui.modal_background.onclick = ui.closeModalDialogs;
  document.querySelectorAll(".close").forEach(function(closeButton){
    closeButton.onclick = ui.closeModalDialogs;
  });
  ui.dice_thrown.onchange = setProgress;
  ui.dice_thrown.onkeyup = setProgress;
  reset();
});

function toggleInfo(){
  console.log("toggleInfo: called");
  if ( security_info_visible ) {
    security_info_visible = false;
    hide(ui.usability_security_low);
    hide(ui.usability_security_high);
  } else{
    security_info_visible = true;
    adjustSecurity();
  }
}

function adjustSecurity() {
  var security_input = document.querySelector(":checked[name='security']");
  if (security_input.value === "low" ){
    set_needed_dice(15);
  }else if(security_input.value === "high" ){
    set_needed_dice(25);
  }
  if ( security_info_visible ){
    //something is already shown
    var duration = "slow";
    if ( security_input.value === "low" ) {
      hide(ui.usability_security_high);
      show(ui.usability_security_low);
      highlight(ui.usability_security_low);
    } else if ( security_input.value === "high" ) {
      hide(ui.usability_security_low);
      show(ui.usability_security_high);
      highlight(ui.usability_security_high);
    }
  } else {
    //nothing is already shown, don't change what is shown
  }
}

function highlight(element){
  element.classList.add("highlight");
  // remove the highlighter class again once the animation has finished
  // TODO read the actual animation time here
  setTimeout(function(){
    element.classList.remove("highlight");
  }, 4000);
}

function set_needed_dice(dice){
  NEEDED_DICE = dice;
  ui.dice_needed.value = NEEDED_DICE;
  ui.dice_thrown.setAttribute("maxlength", dice);
}

function reset(){
  ui.dice_thrown.value = "";
  document.querySelector("#newpassword input").value = "";
  ui.removeLCDfinished();
  set_needed_dice(NEEDED_DICE);
  setProgress();
}

function check_password(password){
  if ( input_ready && Math.pow(26, password.length) < Math.pow(7776, Math.floor(NEEDED_DICE/5))  ){
    ui.showTooShortDialog();
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

function show(element){
  element.style.display = "inline-block";
}

function showById(id){
  show(document.getElementById(id));
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
      highlight(document.getElementById("newpassword"));
    }
  }else{
    pw_input.value = "";
  }
}

function validate_dice_thrown(){
  var dice = ui.dice_thrown.value;
  var one_to_six = /^[1-6]*$/;
  var result = one_to_six.test(dice);
  if (!result){
    ui.showWrongTextDialog();
  }
  return result;
}

function setProgress(event){
  var progress = ui.dice_thrown.value.length;
  document.getElementById("thrown").value = progress;
  // don't do any validation when backspace was pressed.
  if ( event != null && event.which === 8){
    ui.removeLCDfinished();
    input_ready = false;
    return;
  }else {
    var valid = validate_dice_thrown();
    if (valid && progress === NEEDED_DICE ){
      ui.setLCDfinished();
      input_ready = true;
      set_password( find_password(ui.dice_thrown.value) );
    }
  }
}

function UI(){
  this.dice_thrown = document.getElementById("dice-thrown");
  this.security_info = document.getElementById("security-info");
  this.reset = document.getElementById("reset");
  this.dice_needed = document.getElementById("needed");
  // the number of thrown dice
  this.thrown_lcd = document.getElementById("thrown");
  this.usability_security_low = document.getElementById("usability-security-low");
  this.usability_security_high = document.getElementById("usability-security-high");
  this.wrong_text = document.getElementById("wrong-text");
  this.modal_background = document.getElementById("modal-background");
  this.modal_dialog_wrong_text = document.getElementById("wrong-text");
  this.modal_dialog_too_short = document.getElementById("too-short");
  var modal_background = this.modal_background;
  var modal_dialog_wrong_text = this.modal_dialog_wrong_text;
  var modal_dialog_too_short = this.modal_dialog_too_short;
  this.closeModalDialogs = function(){
    [
     modal_background,
     modal_dialog_too_short,
     modal_dialog_wrong_text
    ].forEach(element => element.style.display = "none");
  };
  this.showWrongTextDialog = function(){
    modal_background.style.display = "block";
    modal_dialog_wrong_text.style.display = "block";
  };
  this.showTooShortDialog = function(){
    modal_background.style.display = "block";
    modal_dialog_too_short.style.display = "block";
  };
}
UI.prototype.getLCDs = function(){return document.querySelectorAll(".LCD");};
UI.prototype.getNewPasswordInput = function(){return document.querySelector("#newpassword input");};
UI.prototype.setLCDfinished = function(){
  this.getLCDs().forEach(
    function(element){
      element.classList.add("finished");
    });
};
UI.prototype.removeLCDfinished = function(){
  this.getLCDs().forEach(
    function(element){
      element.classList.remove("finished");
    });
};
