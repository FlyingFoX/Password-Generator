var password_hash = {};
$(document).ready( function(){
	password_hash = jQuery.getJSON("/flyingfox/password-finder/diceware_german_hash.json", function(password_data){
			var list = '<ul>';
			$.each(password_data, function(key, value) {
				list += '<li>' + key + ' => ' + value + '</li>';
			});
		list += '</ul>';
		password_hash = password_data;
	});
});

/*
 * assume thrown_dice is a string and only consists of digits 1-6
 * and the length is dividable by 5
 */
function find_password(thrown_dice){
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
}