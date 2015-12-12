
```

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

```
```
Steamappid g[i].appid    
Gamename g[i].name
Playtime last 2 weeks g[i].playtime_2weeks
Playtime forever g[i].playtime_forever
Img Icon url g[i].img_icon_url
Img logo url g[i].img_logo_url


without sorting
steam/allGames.php

Sort gametime forever
steam/allGames.php?sort=ASC
steam/allGames.php?sort=DESC
```
