class Traveler {
    constructor(name){
        this._name = name;
        this._food = 1;
        this._isHealthy = true;
    }


    set name(name) {
        this._name = name
    }
    set food(food) {
        this._food = food
    }
    set isHealthy(health){
        this._isHealthy = health
    }


    get name(){
        return this._name;
    }
    get food(){
        return this._food
    }
    get isHealthy(){
        return this._isHealthy
    }

    hunt() {
        this._food = this._food + 2
    }

    eat() {
        if(this._food > 0){
            this._food--
        }else{
            this._isHealthy = false;
        }
    }
}

class Hunter extends Traveler {
    constructor(name, isHealthy) {
        super(name, isHealthy);
        this._food = 2;
    }

    hunt() {
        this._food = this._food + 5
    }

    eat() {
        if(this._food > 1){
            this._food = this._food - 2
        }else{
            this._food = 0 
            this._isHealthy = false;
        }
    }

    giveFood(traveler, numOfFoodUnits) {
        if(numOfFoodUnits < this._food) {
            this._food -= numOfFoodUnits
            traveler.food += numOfFoodUnits
        }
    }
}

class Doctor extends Traveler {
    constructor(name, food, isHealthy) {
        super(name, food, isHealthy);
    }

    heal(traveler){
        traveler.isHealthy = true
    }
}

class Wagon {
   
    constructor(capacity){
        this._capacity = capacity;
        this._passanger = [];
    }

    getAvailableSeatCount() {
        return this._capacity - this._passanger.length;
    }

    join(travaler) {
        if (this.getAvailableSeatCount() > 0) {
            this._passanger.push(travaler)
        }
    }
    shouldQuarantine() {
        let result = false
        for(let i = 0; i < this._passanger.length; i++) {
            if(this._passanger[i].isHealthy === false){
                result = true
                break
            }
        }
        return result
    }
    totalFood() {
        let result = 0
        for(let i = 0; i < this._passanger.length; i++) {
            result += this._passanger[i].food
        }
        return result
    }

}


// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);

