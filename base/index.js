//console.log("Hi Ziyi, happy a nice day")


const {somme, say_hello, multiply} = require("./utils/hello.js") //syntaxe de ES5
const Robot = require("./classes/robot.js")
//import say_hello from "./utils/hello.js"
say_hello("géniale")
console.log(somme(3, 2))

const nono = new Robot("red")
console.log(nono.who_am_i())


console.log(multiply(2, 4))