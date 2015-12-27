<?php
	// Author: Theenoro
	// Year :  2015
	// -------------------------------------

	require("config.php");
	require("steamapi_status.php");

	$apikey = api_key;  // api key            from config file
	$steamid = steamid; // your steam id
	$cache_file = cache_profile;  // cache file
	header('Content-Type: application/json');

	$file = "";

	if (file_exists($cache_file) && (filemtime($cache_file) > (time() - 60 * cache_profile_time ))) {
   		$file = file_get_contents($cache_file);
   		if($file === '{"steam":"offline"}' || $file === '{"profile":null,"games":null}'){
	   		unlink($cache_file);
	   	}
	} else {
		if(getStatus("api.steampowered.com", 80) === "online"){
			$response = @file_get_contents('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' . $apikey . '&steamids=' . $steamid);
			$response2 = @file_get_contents('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' . $apikey . '&steamid='. $steamid.'&format=json&count=3');

			$json = json_decode($response, true);
			$json2 = json_decode($response2, true);
			$file = '{"profile":'.json_encode($json).',"games":'.json_encode($json2).'}';
			file_put_contents($cache_file, $file, LOCK_EX);
		}else{
			$file = file_get_contents($cache_file);
		}
   	if($file === '{"steam":"offline"}' || $file === '{"profile":null,"games":null}'){
   		unlink($cache_file);
   	}
	}
	echo $file;
?>
