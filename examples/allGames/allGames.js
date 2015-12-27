/*
Author: Theenoro
Year :  2015
*/
$(function(){
	var allgames = $.getJSON( "../../steam/allGames.php?sort=ASC", function() {
		console.log( "success" );
	})
	allgames.complete(function(data) {
    var g = data.responseJSON;
    $.each(g, function(i, item) {
      console.log(g[i]);
      $('#allGames').append(g[i].name+' '+g[i].playtime_forever+'<br />');
    });
  });
});
