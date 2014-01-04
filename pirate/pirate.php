<?php
/**
* pirate.php
* just for phun and prophit
* Check for mirrors: http://proxybay.info/
*/

$tinicio = inicio();

include_once "./simplehtmldom/simple_html_dom.php";

DEFINE("NAME","pirate");
DEFINE("URL_PREFIX","http://piratebay.se/search/");
DEFINE("URL_SUFIX","/0/7/0");
DEFINE("USER_AGENT","Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6\r\n");


msg("Welcome to " .NAME. "," . $argv[1]);

getUrl("http://www.el-mundo.es");

if (!$argv[1]) { msg("Pasa un argumento jambo."); exit;}

msg("A ver series: " . $argv[1]);
$series = $argv[1];
$season = (isset($argv[2]) && $argv[2]!="")?$argv[2]:1;
$limit = (isset($argv[3]) && $argv[3]!="")?$argv[3]:10;
$chapter = 1;

$context = stream_context_create();
stream_context_set_params($context, array('user_agent' => USER_AGENT));

for ($i=1;$i<=$limit;$i++) {
	$url = URL_PREFIX.urlencode(sprintf("$series S%2$02dE%3$02d",$series,$season,$i)).URL_SUFIX;
	msg("Getting " . $url);
	//$htmldata = file_get_html($url, 5, $context);
	//$htmldata = str_get_html(getUrl($url));
	msg(getUrl($url));
	/*$tr = $html->find("table#searchResult tr");
	$anchors = $tr[1]->find("a");
	msg("Magnet: " . $anchors[3]->href);*/
	
	//msg($html->plaintext);
/*	$edesc = $html->find('div#description p'); 
		$desc = $edesc[0]->plaintext;
	*/
	//$htmldata->clear();
}

fin($tinicio);

/*
*
*
*/
function getUrl ($url) {
	$curl = curl_init(); 
	
	curl_setopt($curl, CURLOPT_URL, $url);  
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);  

	$str = curl_exec($curl);  
	echo "errors?" . curl_error($curl);  
	print_r(curl_getinfo($curl));  
	echo "\nok: $url: " . $str;  
	curl_close($curl);

	return $str;
}

/*
* inicio
*/
function inicio () {
   $mtime = microtime();
   $mtime = explode(" ",$mtime);
   $mtime = $mtime[1] + $mtime[0];
   return $mtime; 
}

/**
* fin
* para calcular el final del tiempo de ejecución
*/
function fin ($tinicio) {
   $mtime = microtime();
   $mtime = explode(" ",$mtime);
   $mtime = $mtime[1] + $mtime[0];
   $endtime = $mtime;
   $totaltime = ($endtime - $tinicio);
   msg('Ejecutado en '.$totaltime.' segundos'); 
}


/**
* log
* saca mensaje por pantalla
*/
function msg($msg) {
	echo NAME ,' [',date("c"),']> ' , $msg ,"\n";
}
?>
