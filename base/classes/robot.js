

const { v4: uuidv4 } = require('uuid');

class Robot {

    constructor(color) {
        this.ref = uuidv4();
        this.color = color;
    }

    who_am_i(){
        return "I am the robot " + this.ref + " and i am " + this.color;
    }
}
module.exports = Robot;