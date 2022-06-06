const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

// fisher-yates shuffling for game mechanics
// function shuffle(array) {
//     let currentIndex = array.length, randomIndex;
//     while (currentIndex != 0) {
//         randomIndex = Math.floor(Math.random()*currentIndex);
//         currentIndex--;

//         [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//     }
//     return array;
// }

// driver class constructor for base drivers
class BaseDriver {
    constructor(color, number) {
        this.name = `${color} ${number}`
        this.gearBox = [1,2,3,4,5,6];
        this.currentGear = 1;
        this.movement = 0;
        // driver health
        this.health = 18;
        // location on array map
        this.lane = 1;
        this.lanePosition = 0;
    }
}

let yellowOne = new BaseDriver('Yellow','One');
let yellowTwo = new BaseDriver('Yellow','Two');
let redOne = new BaseDriver('Red','One');
let redTwo = new BaseDriver('Red','Two');
let blueOne = new BaseDriver('Blue','One');
let blueTwo = new BaseDriver('Blue','Two');
let orangeOne = new BaseDriver('Orange','One');
let orangeTwo = new BaseDriver('Orange','Two');
let blackOne = new BaseDriver('Black','One');
let blackTwo = new BaseDriver('Black','Two');

class AdvancedDriver {
    constructor(name) {
        this.name = name;
        this.gearBox = [1,2,3,4,5,6];
        this.currentGear = 1;
        this.movement = 0;
        // driver health
        this.tireWP = 6;
        this.brakesWP = 3;
        this.gearboxWP = 3;
        this.bodyWP = 3;
        this.engineWP = 3;
        this.roadhandlingWP = 2;
        // location on array map
        this.lane = 1;
        this.lanePosition = 0;
    }
    slipstream() {
        // if movement is complete && you are directly behind another player
        // then movement + 3
    }
    rollMovement() {
        // return die.roll of this.gearbox
    }
    // consider single movement method 
    // check current movement, 
    // check for current location hazards, 
    // check for options, 
    // check if lane changes complete

    // or separate lane 
    moveSameLane() {

    }
    moveRight() {
        // change lane
        // change lane position
        // reduce this.movement 1
    }
    moveLeft() {
        // change lane
        // change lane position
        // reduce this.movement 1
    }
}

// create advanced drivers
let yellowOneAdvanced = new AdvancedDriver('Yellow','One');
let yellowTwoAdvanced = new AdvancedDriver('Yellow','Two');
let redOneAdvanced = new AdvancedDriver('Red','One');
let redTwoAdvanced = new AdvancedDriver('Red','Two');
let blueOneAdvanced = new AdvancedDriver('Blue','One');
let blueTwoAdvanced = new AdvancedDriver('Blue','Two');
let orangeOneAdvanced = new AdvancedDriver('Orange','One');
let orangeTwoAdvanced = new AdvancedDriver('Orange','Two');
let blackOneAdvanced = new AdvancedDriver('Black','One');
let blackTwoAdvanced = new AdvancedDriver('Black','Two');

class Dice {
    constructor(gear, color, minMove, maxMove) {
        this.gear = gear;
        this.color = color;
        this.minMove = minMove;
        this.maxMove = maxMove;
    }
    roll(minMove, maxMove) { 
        min = Math.ceil(minMove);
        // +1 because the max would not be inclusive otherwise
        max = Math.floor(maxMove)+1;
        return Math.floor(Math.random()*(max - min)+min)
    }
}

// create dice
let firstGearDie = new Dice(1,'yellow',1,2)
let secondGearDie = new Dice(2,'orange',2,4)
let thirdGearDie = new Dice(3,'red',4,8)
let fourthGearDie = new Dice(4,'green',7,12)
let fifthGearDie = new Dice(5,'purple',11,20)
let sixthGearDie = new Dice(6,'blue',21,30)

// create dice array for rollMovement()
// let dice = [firstGearDie, secondGearDie, thirdGearDie, fourthGearDie, fifthGearDie, sixthGearDie]

// set up track lanes (separate or single?) as arrays with obstacles

const components = {
    'basedriver':{
        'yellowOne': yellowOne,
        'yellowTwo': yellowTwo,
        'redOne': redOne,
        'redTwo': redTwo,
        'blueOne': blueOne,
        'blueTwo': blueTwo,
        'orangeOne': orangeOne,
        'orangeTwo': orangeTwo,
        'blackOne': blackOne,
        'blackTwo': blackTwo
    },
    'advanceddriver':{
        'yellowOneAdvanced': yellowOneAdvanced,
        'yellowTwoAdvanced': yellowTwoAdvanced,
        'redOneAdvanced': redOneAdvanced,
        'redTwoAdvanced': redTwoAdvanced,
        'blueOneAdvanced': blueOneAdvanced,
        'blueTwoAdvanced': blueTwoAdvanced,
        'orangeOneAdvanced': orangeOneAdvanced,
        'orangeTwoAdvanced': orangeTwoAdvanced,
        'blackOneAdvanced': blackOneAdvanced,
        'blackTwoAdvanced': blackTwoAdvanced
    },
    'dice':{
        'firstGearDie':firstGearDie,
        'secondGearDie':secondGearDie,
        'thirdGearDie':thirdGearDie,
        'fourthGearDie':fourthGearDie,
        'fifthGearDie':fifthGearDie,
        'sixthGearDie':sixthGearDie
    },
    'unavailable':{
        'status': 'currently unavailable'
    }
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:componentName', (request,response)=>{
    const componentsName = request.params.componentName
    if(components[componentsName]){
        response.json(components[componentsName])
    }else{
        response.json(components['unavailable'])
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}`)
})

// client side below
// drivers will move by clicking on tracks, checking for position on array, and checking conditions/options of array lanes
