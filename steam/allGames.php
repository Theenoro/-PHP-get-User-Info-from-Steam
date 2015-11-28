<?php
	// Author: Theenoro
	// Year : ©2015 
	// -------------------------------------

	require("config.php");
	header('Content-Type: application/json');
	echo file_get_contents('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='.api_key.'&steamid='.steamid.'&format=json&include_appinfo=1');
