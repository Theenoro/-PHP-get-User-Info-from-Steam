/*
Author: Theenoro
Year :  2015 
*/
$(function(){
	var profile = $.getJSON( "steam/profile.php", function() {
		console.log( "success" );
	})
	profile.complete(function(data) {
		console.log( "second complete" );

		var dat = $.parseJSON(data.responseText); 
		if(typeof dat.steam !== 'undefined'){
			alert('Steam API Offline :(');
		}else{
			$('#avatar img').attr("src",(dat.profile.response.players[0].avatarfull));
			$('#player_name').html(dat.profile.response.players[0].personaname);
		}
	});
});