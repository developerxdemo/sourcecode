/**
* coloredlog
*/
var color = require('colors');

var name = '';       // Name to add
var prefix = false;  // Whether to add [INFO],[WARN],[ERROR]
var showDate = false;

/**
* we init colors to set a kind of 'theme'.
*
*/
color.setTheme({
		 msg_color: 'green',
		 warning_color: 'yellow',
		 error_color: 'red',
		 request_color: 'blue'
});

exports.setOpt = function (optName, optPrefix,optShowDate ) {
	name = optName;
	prefix = optPrefix;
	date = optShowDate;
};

exports.setColors = function (infoColor, warningColor, errorColor, requestColor) {
	// We check params... and assign defaults if no value was given
	infoColor = (infoColor!='')?infoColor:'green';
	warningColor = (warningColor!='')?warningColor:'yellow';
	errorColor = (errorColor!='')?errorColor:'red';
	requestColor = (requestColor!='')?requestColor:'blue';
	
	color.setTheme({
		 msg_color: infoColor,
		 warning_color: warningColor,
		 error_color: errorColor,
		 request_color: requestColor
	});
};

/**
* log without colors
*/
exports.log= function (msg) {
	finalPrefix = genPrefix('');
	console.log(finalPrefix+msg);
};

/**
* normal log, green color
*/
exports.loginfo = function (msg) {
	finalPrefix = genPrefix('INFO');
	console.log((finalPrefix+msg).msg_color);	
};

/**
* warning log
*/
exports.logwarn = function (msg) {
	finalPrefix = genPrefix('WARN');
	console.log((finalPrefix+msg).warning_color);
};

/**
* error log
*/
exports.logerr = function (msg) {
	finalPrefix = genPrefix('ERROR');
	console.log((finalPrefix+msg).error_color);
};

/**
* conditional prefix generation, If any name is given and if type
* prefix is required. Double ternary!!! - aj! mis hogos!!-
*/
function genPrefix (type) {
		return (name!='')?name+' '+((prefix)?'['+type+']':'')+'> ':'';
}
