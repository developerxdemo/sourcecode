/**
* example of module but instead of exporting de gijon functions one by one
* we create a class and we just export this with all its properties and methods.
* @author Pello Xabier Altadill Izura
* To use this from another module:
*  var dummy = require('./lib/dummyclass');
*  myDummy = new dummy.dummyclass(true);
*  console.log(myDummy.toString());
*/

exports.dummyclass = function (a2) {
		// this reference comes in handy in cases like this*
	var self = this;
	
	this.attrib1 = 'Sense of life';
	this.attrib2 = a2;
	this.attrib3 = 42;

	// Init function
	this.init = function (a1, a2, a3) {
		this.attrib1 = a1;
		this.attrib2 = a2;
		this.attrib3 = 3;
	};

	// toString to see attrib values
	this.toString = function () {
		return this.attrib1+","+this.attrib2+","+this.attrib3;
	};
};