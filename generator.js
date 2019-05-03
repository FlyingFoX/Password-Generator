var password_words = {};
var hash_ready = false;
var diceware_hash = "diceware_german_hash.json";
switch ( language ){
	case "de":
		diceware_hash = "diceware_german_hash.json";
		break;
	case "en":
		diceware_hash = "beale.wordlist_english.json";
		break;
}
fetch(diceware_hash)
  .then(response => response.text())
  .then((password_data) => {
    console.log(password_data);
    password_words = JSON.parse(password_data);
    hash_ready = true;
    set_password(find_password());
  });

/*
 * returns the new found password unless the hash or the input isn't ready.
 */
function find_password(){
	if ( 	hash_ready && input_ready ){
		var thrown_dice = document.getElementById("dice-thrown").value;
		var i;
		var digit_pack = [];
		var password = [];
		for (i = 0; i < thrown_dice.length; i += 5){
			digit_pack.push(thrown_dice.slice(i, i + 5) );
		}
		for (i = 0; i < digit_pack.length; i ++){
			password.push( password_words[digit_pack[i]] );
		}
		return password.join(" ");
	}else {
		return "";
	}
}
