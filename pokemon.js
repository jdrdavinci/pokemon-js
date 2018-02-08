(function() {

	const energyType =	{
		GRASS: "grass",
		FIRE: "fire",
		WATER: "water",
		LIGHTNING: "lightning",
		PSYCHIC: "psychic",
		FIGHTING: "fighting",
		METAL: "metal",
		DARKNESS: "darkness",
		FAIRY: "fairy",
		DRAGON: "dragon",
		COLORLESS: "colorless"
	};

	const pokemon =	{
		PICKACHU: "Pickachu",
		CHARMELEON: "Charmeleon",
		CHARIZARD: "Charizard"
	};

	class Attack {
		constructor (name, damage) {
			this.name = name;
			this.damage = damage;
		}
	}

	class Weakness {
		constructor (energyType, multiplier) {
			this.energyType = energyType;
			this.multiplier = multiplier;
		}
	}

	class Resistance {
		constructor (energyType, value) {
			this.energyType = energyType;
			this.value = value;
		}
	}

	class Pokemon { 
		constructor(name, energyType, hitpoints, stage, evolvesFrom, attacks, weakness, resistance) {
		    this.name = name;  
		    this.energyType = energyType;
		    this.hitpoints = hitpoints;
		    this.health = hitpoints;
		    this.evolvesFrom = evolvesFrom;
		    this.stage = stage;
		    this.attacks = attacks;
		    this.weakness = weakness;
		    this.resistance = resistance;
		}
	    
	    doAttack(attack, target) {
	    	if (attack instanceof Attack && target instanceof Pokemon) {
	    		console.log(this.name + " attacks " + target.name + " with " + attack.name + " (" + attack.damage + ")");

	    		var damage = attack.damage;

	    		// calculate weakness modifier
	    		if ((typeof target.weakness !== "undefined") && (target.weakness !== null)) {
	    			if (this.energyType == target.weakness.energyType) {
	    				damage = (damage*target.weakness.multiplier);
	    				console.log("damage after weakness: " + damage);
	    			}
	    		}
	    		// calculate resistance modifier
	    		if ((typeof target.resistance !== "undefined") && (target.resistance !== null)) {
	    			if (this.energyType == target.resistance.energyType) {
	    				damage = (damage-target.resistance.value);
	    				console.log("damage after resistance: " + damage);
	    			}
	    		}	    		
	    		// adjust current hitpoints
	    		target.takeDamage(damage);
	    	} else {
	    		console.log("invalid attack");
	    	}
	    }

	    takeDamage(damage) {
	    	console.log("start health: " + this.health);
    		this.health = this.health-damage;
    		if (this.health < 0) {
    			this.health = 0;
    		}
    		console.log("end health: " + this.health);
	    }
	}

	class Pikachu extends Pokemon {
		constructor(name) {
			const attacks = [
				new Attack("Electric Ring", 50),
				new Attack("Pika Punch", 20)
			];
			const weakness = new Weakness(energyType.FIRE, "1.5");
			const resistance = new Resistance(energyType.FIGHTING, "20");

			super(name, energyType.LIGHTNING, 60, 1, null, attacks, weakness, resistance);
		}
	}

	class Charmeleon extends Pokemon {
		constructor(name) {
			const attacks = [
				new Attack("Head Butt", 10),
				new Attack("Flare", 30)
			];
			const weakness = new Weakness(energyType.WATER, "2");
			const resistance = new Resistance(energyType.FIRE, "20");

			super(name, energyType.FIRE, 60, 1, null, attacks, weakness, resistance);
		}
	}

	class Charizard extends Pokemon {
		constructor(name) {
			const attacks = [
				new Attack("Fire Blast", 50)
			];
			const weakness = new Weakness(energyType.WATER, "1.5");
			const resistance = new Resistance(energyType.FIRE, "100");

			super(name, energyType.FIRE, 60, 1, null, attacks, weakness, resistance);
		}
	}


	let mijnPickachu = new Pikachu("mijnPickachu");
	console.dir(mijnPickachu);

	let mijnCharmeleon = new Charmeleon("mijnCharmeleon");
	console.dir(mijnCharmeleon);

	let mijnCharizard = new Charizard("mijnCharizard");
	console.dir(mijnCharizard);


	mijnCharmeleon.doAttack(mijnCharmeleon.attacks[0], mijnPickachu);

})();