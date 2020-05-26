function Vehicle (color, engine) {
    this._driveInterval = null;
    this._stopInrerval = null;
    this._isStopped = true;
    this._maxSpeed = 70;
    this._speed = 0;
    this._speedUp = 20;
    this._color = color;
    this._engine = engine;

    this.getInfo = () => {
        return {
            engine: this._engine,
            color: this._color,
            maxSpeed: this._maxSpeed
        }
    }

    this.drive = () => {
        if (!this._isStopped) {
            console.log('Already drives');
            return;
        }
        this._isStopped = false;
        this._driveInterval = setInterval(() => {
            console.log(this._speed += this._speedUp);
            if (this._speed > this._maxSpeed) {
                console.log('speed is too high, SLOW DOWN!')
                clearInterval(this._driveInterval);
            }
        }, 2000);
    }

    this.stop = () => {
        if (this._isStopped) {
            console.log('Already slows down');
            return;
        }
        clearInterval(this._driveInterval);
        const currSpeed = this._speed;
        this._isStopped = true;
        this._stopInrerval = setInterval(() => {
            console.log(this._speed -= this._speedUp);
            if (!this._speed) {
                clearInterval(this._stopInrerval);
                this.printLastMaxSpeed(currSpeed);
            }
        }, 1500)
    }

    this.printLastMaxSpeed = (currSpeed) => {
        console.log(`Vehicle is stopped. Maximum speed during the drive was: ${currSpeed}`);
    }

    this.upgradeEngine = (newEngine, maxSpeed) => {
        if(this._isStopped){
            this._engine = newEngine;
            this._maxSpeed = maxSpeed;
        } else {
            console.log('You can upgrade engine only if vehicle is stopped');
        }
    }
}

function Car (color, engine, model) {
    Vehicle.call(this, color, engine);
    this._maxSpeed = 80;
    this._model = model;

    this.getInfo = () => {
        return {
            engine: this._engine,
            color: this._color,
            maxSpeed: this._maxSpeed,
            model: this._model
        }
    }

    this.getModel = () => {
        return this._model;
    }

    this.printLastMaxSpeed = (currSpeed) => {
        console.log(`Car ${this.getModel()} is stopped. Maximum speed during the drive ${currSpeed}`);
    }

    this.changeColor = (newColor) => {
        if(this._isStopped && this._color !== newColor){
            this._color = newColor;
        }
    }
}

function Motorcycle (color, engine, model) {
    Car.call(this, color, engine, model);
    this._maxSpeed = 90;

    this.printLastMaxSpeed = () => {
        console.log(`Motorcycle ${this.getModel()} is stopped. Good drive`);
    }

    this.drive = () => {
        console.log('Let’s drive');
        this._driveInterval = setInterval(() => {
            console.log(this._speed += this._speedUp);
            if (this._speed > this._maxSpeed) {
                console.log('speed is too high, SLOW DOWN!');
            }
            if (this._speed - this._maxSpeed >= 30) {
                console.log('Engine overheating');
                this._isStopped = true;
                this.stop();
            }
        }, 2000);
    }
}

let moto = new Motorcycle('green', 'V8', 1);
let car = new Car('green', 'V8', 1);

console.log(moto);

moto.drive();