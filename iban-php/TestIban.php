<?php

include_once 'Iban.php';

//$example='2103 0166 32 1234567890';
//$expected_iban = 'ES5021030166321234567890';

$example='2100 0813 61 0123456789';
$expected_iban = 'ES79 2100 0813 6101 2345 6789';
 

echo Iban::generate($example,'ES') . ' == ';
echo $expected_iban."\n";

if (Iban::validate('ES5021030166321234567890')) {
	echo 'valid IBAN';
	} else {
	echo 'invalid IBAN';
}
/*
$filename = 'example.txt';
$gestor = fopen($filename, "r");

while (!feof($gestor)) {
   $buffer = fgets($gestor, 4096);
   $line = split(',',$buffer);
   $cc = $line[5];
   $iban = $line[6];
   echo $cc." - ".$iban." - ".strlen($iban)."\n";
 }
*/
