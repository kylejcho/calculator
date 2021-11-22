let operandArray = [];
let operation;
let numInput;
let a = '';
let b = '';
let fontSize = 40;

const keypad = document.querySelector('.keypad');
const equalButton = document.querySelector('#equalButton');
const plusButton = document.querySelector('#plusButton');
const minusButton = document.querySelector('#minusButton');
const clearButton = document.querySelector('#clearButton');
const squareButton = document.querySelector('#squareButton');
const deleteButton = document.querySelector('#deleteButton');
const signButton = document.querySelector('#signButton')
const resultDisplay = document.querySelector('.resultDisplay');
const history = document.querySelector('.history');


keypad.onclick = (e) => {
    let t = e.target;
    if (t.className == "key num") {
        if (history.innerHTML.includes("=") || history.innerHTML == resultDisplay.innerHTML) clear();
        newNumInput(e);
    }
    if (t.className == "key operator") {
        createNewOperand();
        if (t.innerHTML == "="){
            if (b == '') history.innerHTML = resultDisplay.innerHTML;
            else evaluate();
        } else if (b == '') {
            operation = t.innerHTML;
            history.innerHTML = a + " " + operation;
        } else {
            evaluate();
            operation = t.innerHTML;
            history.innerHTML = a + " " + operation;
        }
    }
}

const newNumInput = (e) => {
    numInput = e.target.innerHTML;
    operandArray.push(numInput);
    console.log(operandArray);
    resultDisplay.innerHTML = operandArray.join('');
}

const createNewOperand = () => {
    if (a == '') a = operandArray.join('');
    else b = operandArray.join('');
    console.log("a = " + a + " b = " + b);
    operandArray = [];
    console.log("operandArray =", operandArray);
}


const evaluate = () => {
    a = Number(a);
    b = Number(b);
    history.innerHTML += ' ' + b + ' =';
    a = Math.round(operate(a, b, operation)*1000000)/1000000;
    resultDisplay.innerHTML = a;
    b = '';
    console.log("a = " + a + " b = " + b);
}


clearButton.onclick = () => {
    clear();
}

const clear = () => {
    operandArray = [];
    resultDisplay.innerHTML = 0;
    history.innerHTML = "";
    a = '';
    b = '';
    console.clear();
}


squareButton.onclick = () => {
    if (a=='') {
        createNewOperand();
        a = Number(a);
        b = a;
        history.innerHTML += ' sqr(' + b + ') =';
        let answer = Math.round(operate(a, b, operation)*1000000)/1000000;
        resultDisplay.innerHTML = answer;
        a = answer;
        b = '';
    } else if (a != '' && b == '' && history.innerHTML.includes("=")) {
        a = Number(a);
        history.innerHTML = ' sqr(' + a + ') =';
        let answer = Math.round((a*a)*1000000)/1000000;
        a = answer;
        resultDisplay.innerHTML = answer;
    } else if (a != '' && !history.innerHTML.includes(" ")) {
        a = Number(a);
        history.innerHTML = ' sqr(' + a + ') =';
        let answer = Math.round((a*a)*1000000)/1000000;
        a = answer;
        resultDisplay.innerHTML = answer;
    } else {
        createNewOperand();
        a = Number(a);
        history.innerHTML = a + ' ' + operation + ' sqr(' + b + ') =';
        b = Math.round((b*b)*1000000)/1000000;
        let answer = Math.round(operate(a, b, operation)*1000000)/1000000;
        a = answer;
        resultDisplay.innerHTML = answer;
        b = '';
    }
}


deleteButton.onclick = () => {
    a = '';
    let result = resultDisplay.innerHTML;
    resultDisplay.innerHTML = result.substring(0, result.length - 1);
    if (resultDisplay.innerHTML.length > 0) {
        operandArray.pop();
    } if (operandArray.length = 1) {
        operandArray = resultDisplay.innerHTML.split('');
    }
    console.log(operandArray);
    console.log("a = " + a);
    console.log("b = " + b);
}


signButton.onclick = () => {
    if (operandArray.length > 0) {
        if (resultDisplay.innerHTML.includes('-')) {
            console.log('pppp')
            operandArray.shift();
        } else operandArray.unshift("-");
        
        console.log(operandArray)
        resultDisplay.innerHTML = operandArray.join('');
        console.log("a = " + a);
        console.log("b = " + b); 
    } 
    
    else {
        a = -1 * a;
        console.log(a);
        resultDisplay.innerHTML = a;
    }
}


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const square = (a) => a * b;

const operate = (a, b, operation) => {
    if (operation == "+") return add(a, b);
    if (operation == "-") return subtract(a, b);
    if (operation == "×") return multiply(a, b);
    if (operation == "÷") return divide(a, b);
    if (operation == "2" || "x" || "<i>x</i><sup>2</sup>") return square(a);
}

