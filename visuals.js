$(document).ready(function() {
	// things that need to be done when DOM is ready.
	$("#usability-security-high").hide();
	$(":input[name='security']").change(showSecurity);
	$("#debug").resizable();
	$("#debug").draggable();
	$(":button").button();
	$("#menu").menu();
});

function showSecurity() {
	var duration = 2000;
	if ( $(":checked[name='security']").val() == "low" ) {
		$("#security-form").attr(action, "/flyingfox/password-finder/passwort-einfach.html");
		$("#usability-security-low").show();
		$("#usability-security-high").hide();
		$("#usability-security-low").effect("highlight", {}, duration);
	} else if ( $(":checked[name='security']").val() == "high" ) {
		$("#security-form").attr(action, "/flyingfox/password-finder/passwort-sicher.html");
		$("#usability-security-low").hide();
		$("#usability-security-high").show();
		$("#usability-security-high").effect("highlight", {}, duration);
	}
}

