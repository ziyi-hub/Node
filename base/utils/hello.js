
const multiply = (param1, param2) => {
    return param1 * param2;
}

function say_hello(str) {
    console.log(`Hello, ${str}`)
    console.log("Hello," + str)
}

function somme(param1, param2) {
    return param1 + param2;
}

module.exports = { somme, say_hello, multiply };