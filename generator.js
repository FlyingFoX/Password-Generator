$(document).ready( function(){
	var password_hash= jQuery.getJSON("/flyingfox/password-finder/diceware_german_hash.json", function(passwords_list){
		var list = '<ul>';
		$.each(passwords_list, function(key, value) {
			list += '<li>' + key + ' => ' + value + '</li>';
		});
		list += '</ul>';
		//$('#passwords-data').append(list);
		$("#debug").append("Password part 12345: " + passwords_list['12345'] + "<br>");
	});
});
