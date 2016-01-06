/* 
** Penstill
**
** Web-based text processor capturing webcam stills and 
** other author characteristics
*/

$(document).ready( function() {

	/*
	** Define webcam settings.
	*/
	Webcam.set({
        width: 320,
        height: 240,
        dest_width: 320,
        dest_height: 240,
        image_format: 'png',
        png_quality: 100,
    });

	/*
	** Binds the user's webcam live stream to the 
	** (invisible) #camera container.
	*/
	Webcam.attach("#camera");

	/*
	** Hide webcam's live stream to avoid 
	** distraction.
	*/
	$("#camera").hide();

	/* 
	** Takes a snapshot from the user's webcam and
	** adds it to the #previous-image container.
	*/
	function takeSnapshot() {
            Webcam.snap( function(data_uri) {
                $("#previous-image").html('<img src="' + data_uri + '"/>');
            } );
        }

	/*
	** Takes a snapshot when the current sentence
	** is submitted.
	*/
	$("#current-sentence-submit").submit( function(e) {
		e.preventDefault(); // don't actually submit form data and thus prevent reloading the page
		takeSnapshot();
		$("#previous-sentence").text($("#current-sentence").val())
		$("#current-sentence").val('')
		$("#current-sentence").focus();
	});

	/*
	** Bind <ENTER> kepup event in current
	** sentence container to submit function
	*/
	$('textarea').keyup(function(e) {
		if(e.keyCode == 13) {
			$("#current-sentence-submit").trigger("submit");
		}
	});

	/*
	** Set focus to textbox after page load
	*/
	$("#current-sentence").focus();

});
