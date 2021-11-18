let currentOperand = [];
let lastOperand;
let operation = '';
let input;
let numInput;
let currentDisplay = '';
let a;
let b;

const numKey = document.querySelectorAll('.num');
const operator = document.querySelectorAll('.operator');
const result = document.querySelector('.result');
const history = document.querySelector('.history');
const equalButton = document.querySelector('#equalKey');
const plusButton = document.querySelector('#plusButton');


document.onclick = (event) => {
    let key = event.target;
    if (key.className === "key num") {
        numInput = key.innerHTML;
        newNumInput();
    }
}


const newNumInput = () => {
    if (currentOperand[0] == 0) {
        currentOperand[0] = numInput;
        console.log( currentOperand);
    } else {
        currentOperand.push(numInput);
        console.log(currentOperand);
    }
    result.innerHTML = currentOperand.join('');
}

plusButton.onclick = () => {
    operation = '+';
    if (a > 0) {
        console.log('hi');
        createNewOperand();
        evaluate();
        addHistory(operation);
        currentOperand = [];
    } else {
        createNewOperand();
        a = Number(lastOperand);
        console.log("a = " + a);
        addHistory(operation);
        currentOperand = [];
    }
}


const createNewOperand = () => lastOperand = currentOperand.join('');



const addHistory = (e) => {
    history.innerHTML = lastOperand + " " + e;
}

const clearDisplay = () => {
    result.innerHTML = '';
}

const evaluate = () => {
    createNewOperand();
    b = Number(lastOperand);
    console.log("b = " + b);
    history.innerHTML = history.innerHTML + " " + lastOperand;

    let answer = operate(a, b, operation);
    result.innerHTML = answer;
    console.log('answer: ' + answer)
    currentOperand = [];
    currentOperand.push(answer);
    a = answer;
    lastOperand = a;
    console.log("a = " + answer)
}


equalButton.onclick = () => {
    evaluate();
}


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, b, operation) => {
    if (operation == "+") return add(a, b);
    if (operation == "-") return subtract(a, b);
    if (operation == "x") return multiply(a, b);
    if (operation == "/") return divide(a, b);
}