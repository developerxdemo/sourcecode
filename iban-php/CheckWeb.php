<?php

include_once 'Iban.php';
include_once 'simple_html_dom.php';

//$example='2103 0166 32 1234567890';
//$expected_iban = 'ES5021030166321234567890';

$example='2100 0813 61 0123456789';
$expected_iban = 'ES79 2100 0813 6101 2345 6789';
 
echo Iban::generate($example,'ES') . ' == ';
echo $expected_iban;

if (Iban::validate('ES5021030166321234567890')) {
	echo 'valid IBAN';
	} else {
	echo 'invalid IBAN';
}

$filename = 'example.txt';
$gestor = fopen($filename, "r");

while (!feof($gestor)) {
   $buffer = fgets($gestor, 4096);
   $line = split(',',$buffer);
   $cc = $line[5];
   $iban = $line[6];
   echo $cc." - ".$iban." - ".strlen($iban)."\n";
   $ibanweb = generateIban($cc);
   if ($iban != $ibanweb) {
 	  echo "ERROR \t".generateIban($cc) ."\n";
	} else {
	  echo "OK\n";
	}
 }


// generate iban
 //echo generateIban('21030166321234567890');


 function generateIban ($cc) {
	$url = 'http://www.maestre-ediban.com/english-maestre-ediban/iban-calculation.php';
	$banco = substr($cc,0,4);
	$oficina = substr($cc,4,4);
	$dc = substr($cc,8,2);
	$cuenta = substr($cc,10,10);
	$fields_string = '';

	$fields = array(
						'banco' => urlencode($banco),
						'oficina' => urlencode($oficina),
						'dc' => urlencode($dc),
						'cuenta' => urlencode($cuenta)
				);

//url-ify the data for the POST
	foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
	
	rtrim($fields_string, '&');

	//open connection
	$ch = curl_init();

	//set the url, number of POST vars, POST data
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch,CURLOPT_POST, count($fields));
	curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

	//execute post
	$result = curl_exec($ch);

	//echo $banco ." ".$oficina." ".$dc." ".$cuenta."\n";

	$html = str_get_html($result);
	$input_field =  $html->find("input[name=resultEL]"); 

	return $input_field[0]->value;

 }
