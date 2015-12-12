// Author: Theenoro
// Year : ©2015
// -------------------------------------
$(function(){
  $('#profile-recently').html('Loading...');
  $('#profile-main').click(function(){
    $('#profile-recently').show();
    $('#profile-all-games').hide();
	  var profile = $.getJSON( "../../steam/profile.php", function() {
		     console.log( "success" );
	      })
  	profile.complete(function(data) {
  		$('#profile-recently').html('');
  		var dat = $.parseJSON(data.responseText);
  		if(typeof dat.steam !== 'undefined'){
  			alert('Steam API Offline :(');
  		}else{
        //console.log(dat);
  			$('#profile-avatar img').attr("src",(dat.profile.response.players[0].avatarfull));
  			$('#profile-name').html(dat.profile.response.players[0].personaname);
        if(typeof dat.profile.response.players[0].gameextrainfo === 'undefined'){
          $('#profile-status').html(personastateidToText(dat.profile.response.players[0].personastate));
        }else{
          $('#profile-status').html('Currently in '+dat.profile.response.players[0].gameextrainfo);
        }
        $.each(dat.games.response.games,function(key,item){
          $('#profile-recently').append('<div class="game"><div class="game-logo"><img src="http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/'+item.appid+'/'+item.img_logo_url+'.jpg" /></div><div class="game-name">'+item.name+'</div><div class="game-times"><div class="game-last2weeks">'+Math.round((item.playtime_2weeks/60*100))/100+' h </div> / <div class="game-time">'+Math.floor((item.playtime_forever/60*100))/100+' h</div></div></div>');
        });
        //$('#profile-recently').html(dat.games.response.games);
  		}
  	});
  });
  $('#profile-load-allGames').click(function(){
    var playedallTime = 0;
    $('#profile-all-games').show();
    $('#profile-recently').hide();
    $('#profile-all-games').html("");
    var games = $.getJSON( "../../steam/allGames.php?sort=ASC", function() {
  		console.log( "success" );
  	})
  	games.complete(function(data) {
  		console.log( "second complete" );

  		var dat = $.parseJSON(data.responseText);
  		if(typeof dat.steam !== 'undefined'){
  			alert('Steam API Offline :(');
  		}else{
        //console.log(dat);
        $.each(dat,function(key,item){
          if(typeof item.playtime_2weeks === "undefined" ){
            item.playtime_2weeks = 0;
          }
          playedallTime += item.playtime_forever;
          $('#profile-all-games').append('<div class="game"><div class="game-logo"><img src="http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/'+item.appid+'/'+item.img_logo_url+'.jpg" /></div><div class="game-name">'+item.name+'</div><div class="game-times"><div class="game-last2weeks">'+Math.round((item.playtime_2weeks/60*100))/100+' h </div> / <div class="game-time">'+Math.floor((item.playtime_forever/60*100))/100+' h</div></div></div>');
        });
        $('#profile-all-games').prepend('Time in Steamgames : '+Math.round((playedallTime/60*100))/100+' h');
        //$('#profile-recently').html(dat.games.response.games);
  		}
  	});
  });
  function personastateidToText(state){
    var text = "";
    switch(state){
      case 1:
        text = "Online";
        break;
      case 2:
        text = "Busy";
        break;
      case 3:
        text = "Away";
        break;
      case 4:
        text = "Snooze";
        break;
      case 5:
        text = "looking to trade";
        break;
      case 6:
        text = "looking to play";
        break;
      default:
        text = "Offline";
    }
    return text;
  }
  $('#profile-main').click();
});
