$(document).ready(function() {
	// things that need to be done when DOM is ready.
	$("#usability-security-high").hide();
	$(":input[name='security']").change(showSecurity);
	$("#debug").resizable();
	$("#debug").draggable();
});

function showSecurity() {
	var duration = 2000;
	if ( $(":checked[name='security']").val() == "low" ) {
		$("#usability-security-low").show();
		$("#usability-security-high").hide();
		$("#usability-security-low").effect("highlight", {}, duration);
	} else if ( $(":checked[name='security']").val() == "high" ) {
		$("#usability-security-low").hide();
		$("#usability-security-high").show();
		$("#usability-security-high").effect("highlight", {}, duration);
	}
}

