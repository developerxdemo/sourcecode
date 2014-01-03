/**
* inheritance sample
* @author Pello Xabier Altadill Izura
* @greetz 2 u
*/

var util = require('util');

function Character (newName,race) {
	// Properties ///////////////
	this.name = newName;
	this.race = race;
	this.weapon = null;
	this.dateOfBirth = new Date();
	
	// Methods ////////////////
	/**
	* greet, says something -what-
	*/
	this.greet = function (what) {
		return this.name + "> " + what;
	}

	/**
	* toString, returns all properties
	*/
	this.toString = function () {
		return 'Name: ' + this.name + ' ' +
		       'Race: ' + race + ' ' +
		       'Date of birth: ' + this.dateOfBirth;
	}
}

// Another way to define a class is the literal version:
// But beware, we will have just one instance
/**
* Weapon class
*/
var Weapon = {
	name : 'Anduril',
	type : 'Sword',
	powers : [4,3,1],  // Attack, defense, magic 
	attack: function () {
			return this.powers[0] * Math.random();
		},
	defend: function () {
			return this.powers[1] * Math.random();
		},
	toString: function () {
			return 'Name: ' + this.name + ' ' +
			       'Type: ' + this.type + ' ' +
			       'Powers: ' + this.powers;
		}
}

myCharacter = new Character('Legolas','Elf');

otherCharacter = new Character('Aragorn','Dunedain');
otherCharacter.weapon = Weapon;


console.log(myCharacter.toString());
console.log(otherCharacter.toString());
console.log(otherCharacter.weapon.toString());
console.log(otherCharacter.name + ' attacks:' + otherCharacter.weapon.attack());


/**
* Mage class
* We must set school
*/
function Mage (school) { 
	Mage.super_.call(this);
	this.school = school;
	this.mana = 100;
	this.spells = ['freeze','fireball','infinitecoffee'];
	this.castSpell = function (spellName) {
				var power = Math.random();
				this.mana -= power;
				return 'Cast ' + spellName + ' spell: ' + power;
			};
}

// In Javascript we can add properties and method to classes on the fly.
// We add a new property and method to Character class
Character.prototype.kissPower = 666;
Character.prototype.kiss = function () {
	return this.name + ' kisses you with ' + this.kissPower;
}

console.log(myCharacter.kiss());

// With util we can add inheritance support
util.inherits(Mage, Character);

mage = new Mage('Necromancy');
console.log(mage.castSpell(mage.spells[0]));


mage.name = 'Gandalf';
mage.kissPower = -4;

console.log(mage.toString());
console.log(mage.kiss());
