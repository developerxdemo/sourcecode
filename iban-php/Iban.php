<?php
/**
* Iban
* Simple utility class to generate and validate IBAN account numbers
* Based on http://www.lawebdelprogramador.com/foros/Visual_Basic/1409866-Calculo_IBAN.html
* @author Pello Xabier Altadill Izura
* @version    $Id:$
* @link       http://www.pello.info
* @since      Available since 2014-01-17
* @greetz	Iban (Zabalza)
*  ... and you too
*/

class Iban {
   
   private static $LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static $COUNTRIES = array("DE","EN","IT","NO","FR","PL","RO","SR","BG","SL","NL","RU","HU","LT","TR","CA","SV","ZH","EL","ES","SQ","PT","CS","FI","SK","DA","HR","LV","ET","JA","KA","MN");

   
   /**
   * Given a 20 digit account number, 
   * generates and returns IBAN account
   * needs refactoring
   */
	public static function generate ($accountNumber, $countryCode, $ibanPrefix=false,$spaces=true) {
		
		$longAccount = "";
		$remainder = 0;
		$prefix = ($ibanPrefix)?'IBAN':'';

		// Remove space chars, if any
		$accountNumber = self::clear($accountNumber);

		if (self::invalidCountryCode($countryCode)) {
			return 'Invalid country code: ' . $countryCode;
		}		
		
		if (self::invalidAccountNumber($accountNumber)) {
			return 'Invalid account Number: ' . $accountNumber;
		}
		

		$longAccount =  self::rearrangeAccount($accountNumber,$countryCode);

		$remainder = self::calculateRemainder($longAccount);

		if ($spaces) {
	   	return self::addSpaces($prefix . $countryCode . sprintf('%02d',(98-$remainder)) . $accountNumber);
	   } else {
	   	return $prefix . $countryCode . sprintf('%02d',(98-$remainder)) . $accountNumber;
	   }
	}
	
	/**
	* validates an IBAN account
	*
	*/
	public static function validate ($ibanAccount) {
		$longAccount = '';
		
		$longAccount = self::clearIban($ibanAccount);

		$longAccount = self::rearrangeIban($longAccount);
		                        
		$longAccount =	substr($longAccount,2,strlen($longAccount) -2) . substr($longAccount,0, 2) ;
		
     
     	return (self::calculateRemainder($longAccount) == 1);
	}
	
	
	/**
	* checks for invalid countryCode in format or existence
	*/
	private function invalidCountryCode ($countryCode) {

		if (!preg_match('/^[A-Z]{2}$/i', $countryCode)) {
			return true;
		}

		// Maybe it could be faster a regex like DE|EN|IT|.. ?
		if (!in_array($countryCode,self::$COUNTRIES)) {
			return true;
		}
	
		return false;
	}

	/**
	* rearrangeAccount
	*/
	private function rearrangeAccount ($accountNumber,$countryCode) {
					return $accountNumber . 
								self::letterPosition(substr($countryCode,0, 1)) . 
                          			 self::letterPosition(substr($countryCode,1, 1)). "00";
	}

	/**
	* rearrangeIban
	*/
	private function rearrangeIban ($ibanAccount) {
					return 	substr($ibanAccount,2,strlen($ibanAccount) -2) .
		                         self::letterPosition(substr($ibanAccount,0, 1)) .
		                         	self::letterPosition(substr($ibanAccount,1, 1));
	}
	
	/**
	* workaround to perform mod operation with a big number.
	* It must return two digits!!
	*/
	private function calculateRemainder($longNumber) {
		$division = 0;
		$remainder = 0;
		
     for ($i=0;$i<strlen($longNumber);$i++) {
		$division = $remainder . substr($longNumber, $i, 1);
      $remainder = $division % 97;
     }
     
     return $remainder;
	}
		
	/**
	* checks for invalid accountNumber in format and validation
	*/
	private function invalidAccountNumber () {
		return false;
	}
	
	/**
	* adds a space characters to format IBAN account
	*/
	private function addSpaces ($ibanAccount) {
		$result = '';
		for ($i=0;$i<strlen($ibanAccount);$i++) {
			if ($i != 0 && $i % 4 == 0) {
				$result .= ' ';
			}
			$result .= substr($ibanAccount,$i,1);
		}
		
		return $result;
	}

	/**
	* Gives letter position and adds 10
	*/
	private function letterPosition($letter) {

		return strval(strpos(self::$LETTERS, $letter,0) + 10);
	}


	/**
	* Clears everything but numeric characters,
	*/
	private function clear($accountNumber) {
		return (preg_replace("/[^0-9]/","",$accountNumber));
	}
	
	/**
	* Clears IBAN and space characters
	*/
	private function clearIban($accountNumber) {
		
		$accountNumber = preg_replace("/IBAN/i", "", $accountNumber);
		$accountNumber = preg_replace("/\s+/", "", $accountNumber);
		$accountNumber = preg_replace("/\-/", "", $accountNumber);
		
		return $accountNumber;
	}
	
}