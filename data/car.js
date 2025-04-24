class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model} ${this.speed} ${this.isTrunkOpen}`);
  }

  go() {
    if(this.speed <= 195 && this.isTrunkOpen === false){
      this.speed += 5;
    }
  }

  brake() {
    if(this.speed >= 5){
      this.speed -= 5;
    }
  }

  openTrunk(){
    if(speed = 0){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car{
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if(this.speed <= (300 - this.acceleration)){
      this.speed += this.acceleration;
    }
  }

  openTrunk(){
    console.log('Race cars do not have a trunk');
  }

  closeTrunk(){
    console.log('Race cars do not have a trunk');
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

const raceCar1 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
})

car1.go();
car1.go();
car2.go();
car2.go();
car2.go();
car2.brake();

car1.displayInfo();
car2.displayInfo();

raceCar1.displayInfo();
raceCar1.openTrunk();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();

