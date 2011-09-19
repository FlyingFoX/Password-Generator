var password_hash = {};
var hash_ready = false;
jQuery.getJSON("diceware_german_hash.json", function(password_data){
	password_hash = password_data;
	hash_ready = true;
	set_password( find_password() );
});

/*
 * returns the new found password unless the hash or the input isn't ready.
 */
function find_password(){
	if ( 	hash_ready && input_ready ){
		var thrown_dice = $("#dice-thrown").val();
		var i;
		var digit_pack = [];
		var password = [];
		for (i = 0; i < thrown_dice.length; i += 5){
			digit_pack.push(thrown_dice.slice(i, i + 5) );
		}
		for (i = 0; i < digit_pack.length; i ++){
			password.push( password_hash[digit_pack[i]] );
		}
		return password.join(" ");
	}else {
		return "";
	}
}