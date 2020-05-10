class Fighter {
    constructor(fighterProps) {
        let name = fighterProps.name,
            damage = fighterProps.damage,
            hp = fighterProps.hp,
            totalHp = fighterProps.hp,
            strength = fighterProps.strength,
            agility = fighterProps.agility,
            wins = 0,
            losses = 0;
        this.getName = () => name;
        this.getDamage = () => damage;
        this.getStrength = () => strength;
        this.getAgility = () => agility;
        this.getHealth = () => hp;
        this.attack = (enemy) => {
            let maxPercent = 100;
            let chanceOfAttack = strength + agility;
            let isAttack = Math.random() <= chanceOfAttack / maxPercent;
            if (isAttack) {
                enemy.dealDamage(damage);
                console.log(name + ' makes ' + damage + ' to ' + enemy.getName());
            } else {
                console.log(name + ' attack missed');
            }
        }
        this.logCombatHistory = () => {
            console.log('Name: ' + name + ', Wins: ' + wins + ', Losses: ' + losses);
        }
        this.heal = (healPoints) => {
            hp + healPoints > totalHp ? hp = totalHp : hp += healPoints;
        }
        this.dealDamage = (dealPoints) => {
            hp - dealPoints < 0 ? hp = 0 : hp -= dealPoints;
        }
        this.addWin = () => {
            wins++;
        }
        this.addLoss = () => {
            losses++;
        }
    }
}

let battle = (fighter1, fighter2) => {
    if (!fighter1.getHealth()) {
        console.log(fighter1.getName() + ' is dead and cannot fight!');
    } else if (!fighter2.getHealth()) {
        console.log(fighter2.getName() + ' is dead and cannot fight!');
    }
    while(fighter1.getHealth() && fighter2.getHealth()){
        fighter1.attack(fighter2);
        if (!fighter2.getHealth()) {
            fighter1.addWin();
            fighter2.addLoss();
            console.log(fighter1.getName() + ' has won!');
            break;
        }
        fighter2.attack(fighter1);
        if (!fighter1.getHealth()) {
            fighter2.addWin();
            fighter1.addLoss();
            console.log(fighter2.getName() + ' has won!');
            break;
        }
    }
}