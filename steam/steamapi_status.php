<?php
  function getStatus($ip,$port){
    $socket = fsockopen($ip, $port, $errorNo, $errorStr, 5);
    if(!$socket){
      return "offline";
    }else{
      return "online";
    }
  }
