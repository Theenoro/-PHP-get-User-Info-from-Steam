<?php
	// Author: Theenoro
	// Year : ©2015
	// -------------------------------------

	require("config.php");
	$ga = json_decode(file_get_contents('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='.api_key.'&steamid='.steamid.'&format=json&include_appinfo=1'),true)['response']['games'];

	if(isset($_GET['sort'])){
		$temp = "";
	  $nc = false;
	  $z = 0;
		if($_GET['sort']==='ASC'){
			while($nc === false || $z < count($ga)){
			  $nc = true;
			  $b = false;
			  for($c = 0;$c<count($ga)-$z;$c++){
			    if(!isset($ga[$c+1])){
			      $b=true;
			    }
			    if($b===false && $ga[$c]['playtime_forever']<=$ga[$c+1]['playtime_forever']){
			      $temp = $ga[$c];
			      $ga[$c] = $ga[$c+1];
			      $ga[$c+1] = $temp;
			      $nc=false;
			    }
			  }
			  $z++;
			}
		}else{
			while($nc === false || $z < count($ga)){
			  $nc = true;
			  $b = false;
			  for($c = 0;$c<count($ga)-$z;$c++){
			    if(!isset($ga[$c+1])){
			      $b=true;
			    }
			    if($b===false && $ga[$c]['playtime_forever']>=$ga[$c+1]['playtime_forever']){
			      $temp = $ga[$c];
			      $ga[$c] = $ga[$c+1];
			      $ga[$c+1] = $temp;
			      $nc=false;
			    }
			  }
			  $z++;
			}
		}
	}

	header('Content-Type: application/json');
	echo json_encode($ga);
