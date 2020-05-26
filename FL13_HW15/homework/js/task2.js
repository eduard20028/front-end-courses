function Vehicle (color, engine) {
    this._driveInterval = null;
    this._stopInterval = null;
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
            maxSpeed: this._maxSpeed,
            model: this._model || 'unknown model'
        }
    }

    this.getModel = () => {
        return this._model;
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
        this._stopInterval = setInterval(() => {
            console.log(this._speed -= this._speedUp);
            if (this._speed === 0 || this._speed < 0) {
                clearInterval(this._stopInterval);
                this.printLastMaxSpeed(currSpeed);
            }
        }, 1500)
    }

    this.printLastMaxSpeed = (currSpeed) => {
        console.log(`Vehicle is stopped. Maximum speed during the drive was: ${currSpeed}.`);
    }

    this.upgradeEngine = (newEngine, maxSpeed) => {
        if(!this._isStopped){
            console.log('You can upgrade engine only if vehicle is stopped');
        } else {
            this._engine = newEngine;
            this._maxSpeed = maxSpeed;
        }
    }
}

function Car (color, engine, model) {
    Vehicle.call(this, color, engine);
    this._maxSpeed = 80;
    this._model = model;

    this.printLastMaxSpeed = (currSpeed) => {
        console.log(`Car ${this.getModel()} is stopped. Maximum speed during the drive ${currSpeed}.`);
    }

    this.changeColor = (newColor) => {
        if(!this._isStopped){
            console.log('Please, stop the car to change color');
        } else if (this._color === newColor) {
            console.log('This color is already used. Please, choose another one.')
        } else {
            this._color = newColor;
        }
    }
}

function Motorcycle (color, engine, model) {
    Vehicle.call(this, color, engine);
    this._maxSpeed = 90;
    this._model = model;

    this.printLastMaxSpeed = () => {
        console.log(`Motorcycle ${this.getModel()} is stopped. Good drive.`);
    }

    this.drive = () => {
        if (!this._isStopped) {
            console.log('Already drives');
            return;
        }
        console.log('Let’s drive');
        this._isStopped = false;
        this._driveInterval = setInterval(() => {
            console.log(this._speed += this._speedUp);
            if (this._speed > this._maxSpeed) {
                console.log('Speed is too high, SLOW DOWN!');
            }
            if (this._speed - this._maxSpeed >= 30) {
                console.log('Engine overheating!');
                this.stop();
            }
        }, 2000);
    }
}