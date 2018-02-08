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

	function Attack(
			name,
			damage,
			energyCost) {
		this.name = name;
		this.damage = damage;
		this.energyCost = energyCost;
	}

	function AttackCost(
			energyType,
			cost) {
		this.energyType = energyType;
		this.cost = cost;
	}

	function Weakness(
			energyType,
			multiplier) {
		this.energyType = energyType;
		this.multiplier = multiplier;
	}

	function Resistance(
			energyType,
			value) {
		this.energyType = energyType;
		this.value = value;
	}

	function Pokemon(
			name, 
			energyType, 
			hitpoints,
			health,
			evolvesFrom,
			stage,
			attacks,
			weakness,
			resistance) {
	    this.name = name;  
	    this.energyType = energyType;
	    this.hitpoints = hitpoints;
	    this.health = hitpoints;
	    this.evolvesFrom = evolvesFrom;
	    this.stage = stage;
	    this.attacks = attacks;
	    this.weakness = weakness;
	    this.resistance = resistance;
	    this.doAttack = function(attack, target) {
	    	if (attack instanceof Attack && target instanceof Pokemon) {
	    		var damage = attack.damage;

	    		// calculate weakness modifier
	    		if ((typeof target.weakness !== "undefined") && (target.weakness !== null)) {
	    			if (this.energyType == target.weakness.energyType) {
	    				damage = (damage*target.weakness.multiplier);
	    			}
	    		}
	    		// calculate resistance modifier
	    		if ((typeof target.resistance !== "undefined") && (target.resistance !== null)) {
	    			if (this.energyType == target.resistance.energyType) {
	    				damage = (damage-target.resistance.value);
	    			}
	    		}	    		
	    		// adjust current hitpoints
	    		this.health = this.health-damage;
	    		if (this.health < 0) {
	    			this.health = 0;
	    		}
	    	}
	    };
	}

	function Pikachu(name) {
		Pokemon.call(this, name);
		this.energyType = energyType.LIGHTNING;
		this.hitpoints = 60;
		this.stage = 1;
		this.attacks = [
			new Attack("Electric Ring", 50, [
					new AttackCost(energyType.LIGHTNING, 1),
					new AttackCost(energyType.COLORLESS, 2)
				]
			),
			new Attack("Pika Punch", 20, [
					new AttackCost(energyType.COLORLESS, 2)
				]
			)
		];
		this.weakness = new Weakness(energyType.FIGHTING, "1.5");
		this.resistance = new Resistance(energyType.FIGHTING, "20");
	}

	function Charmeleon(name) {
		Pokemon.call(this, name);
		this.energyType = energyType.FIRE;
		this.hitpoints = 70;
		this.stage = 1;
		this.attacks = [
			new Attack("Flare", 30, [
					new AttackCost(energyType.FIRE, 1),
					new AttackCost(energyType.COLORLESS, 1)
				]
			)
		];
		this.weakness = new Weakness(energyType.WATER, "2");
		this.resistance = new Resistance(energyType.FIRE, "20");		
	}

	function Charizard(name) {
		Pokemon.call(this, name);
		this.energyType = energyType.FIRE;
		this.hitpoints = 120;
		this.evolvesFrom = pokemon.CHARMELEON;
		this.stage = 2;
		this.attacks = [
			new Attack("Fire Blast", 50, [
					new AttackCost(energyType.FIRE, 2),
					new AttackCost(energyType.COLORLESS, 1)
				]
			)
		];
		this.weakness = new Weakness(energyType.WATER, "1.5");
		this.resistance = new Resistance(energyType.FIRE, "100");		
	}


	let mijnPickachu = new Pikachu("mijnPickachu");
	console.dir(mijnPickachu);

	let mijnCharmeleon = new Charmeleon("mijnCharmeleon");
	console.dir(mijnCharmeleon);

	let mijnCharizard = new Charizard("mijnCharizard");
	console.dir(mijnCharizard);

})();