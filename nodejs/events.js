/**
* events.js
* Playing with events and eventEmitter in nodejs.
* @author Pello Xabier Altadill
* @greetz for u
*/

events = require('events');
// We'll use this to create our own events
var em = new events.EventEmitter();

// We need this to get stdin
process.stdin.resume();

console.log("write something to create events ");

// EVENT: thebeast, emitted when user writes 666
em.on('thebeast',function () {
					console.log("EVENT: thebeast> The number of the beast appeared.");
				});

// EVENT: datareaded, emitted when user writes on console
// First we define function Another way to define an event:
var myeventfunction = function (param) {
						console.log("EVENT: datareaded> something readed on console: ");
						console.log(param+"");
					};
// ... and now we set the function to the event
em.on('datareaded', myeventfunction);

// EVENT: thebeast, emitted when user writes 666
em.on('nulldata',function () {
					console.log("EVENT: nulldata> nothing was entered.");
				});

/**
* on data event
* fired when data is entered in stdin
* We'll fire events depending on input data
*/
process.stdin.on('data', function (readedData) {
	// We can emit events with parameters
	em.emit('datareaded', readedData);

	readedData = fulltrim(readedData+"");
	process.stdout.write('You wrote: ' + readedData + "\n");

	// In case we found a 666 we 'emit' an event
	if (readedData == 666) {
		em.emit('thebeast');
	}

	// In case of empty string
	if (readedData == '') {
		em.emit('nulldata');
	}
});


// We can add event support with inheritance
// so we can do inside the class: this.emit()
// util.inherits(myobject, EventEmitter);
// myoject.prototype.newfunction = function () { this.emit() };


/**
* Fulltrim oneliner, thnx stackoverflow
* needed to remove trailing newline char,
* whitespaces and such...
*/
function fulltrim (wordToTrim){return wordToTrim.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};