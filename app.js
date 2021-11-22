let operandArray = [];
let operation;
let numInput;
let a = '';
let b = '';

const keypad = document.querySelector('.keypad');
const clearButton = document.querySelector('#clearButton');
const squareButton = document.querySelector('#squareButton');
const deleteButton = document.querySelector('#deleteButton');
const signButton = document.querySelector('#signButton')
const display = document.querySelector('.resultDisplay');
const history = document.querySelector('.history');

keypad.onclick = (e) => {
    let t = e.target;
    if (display.innerHTML == "Error") {
        clear();
    } if (t.className == "key num") {
        numClick(e);
    } if (t.className == "key operator" && display.innerHTML.length > 0) {
        operatorClick(e);
    }
}

const numClick = (e) => {
    if (history.innerHTML.includes("=") || history.innerHTML == display.innerHTML) {
        clear();
    }
    operandArray.push(e.target.innerHTML);
    display.innerHTML = operandArray.join('');
}

const operatorClick = (e) => {
    if (display.innerHTML == 0) {
        operandArray = [0];
    }
    createNewOperand();
    if (e.target.innerHTML == "=") {
        if (b == '') {
            history.innerHTML = display.innerHTML;       
        } else {
            evaluate();
        }
    } else if (b == '') {
        adjustOperation(e);
    } else {
        evaluate();
        adjustOperation(e);
    }
}

const createNewOperand = () => {
    if (a == '') {
        a = operandArray.join('');
    } else {
        b = operandArray.join('');
    }
    operandArray = [];
}

const evaluate = () => {
    a = Number(a);
    b = Number(b);
    history.innerHTML += ' ' + b + ' =';
    a = Math.round(operate(a, b, operation)*1000000)/1000000;
    display.innerHTML = a;
    b = '';
    if (display.innerHTML == "NaN" || display.innerHTML == "Infinity") {
        display.innerHTML = "Error";
    }
}

const adjustOperation = (e) => {
    operation = e.target.innerHTML;
    history.innerHTML = a + " " + operation;
}

const clear = () => {
    operandArray = [];
    display.innerHTML = 0;
    history.innerHTML = "";
    a = '';
    b = '';
}

clearButton.onclick = () => clear();

squareButton.onclick = () => {
    if (a=='') {
        createNewOperand();
        a = Number(a);
        if (history.innerHTML.length > 0) {
            history.innerHTML = ' sqr(' + a + ') =';
        } else {
            history.innerHTML += ' sqr(' + a + ') =';
        }
        a = Math.round((a*a)*1000000)/1000000;
        display.innerHTML = a;
    } else if (a != '' && b == '' && history.innerHTML.includes("=") || a != '' && !history.innerHTML.includes(" ")) {
        a = Number(a);
        history.innerHTML = ' sqr(' + a + ') =';
        a = Math.round((a*a)*1000000)/1000000;
        display.innerHTML = a;
    } else {
        createNewOperand();
        a = Number(a);
        history.innerHTML = a + ' ' + operation + ' sqr(' + b + ') =';
        b = b*b;
        a = Math.round(operate(a, b, operation)*1000000)/1000000;
        display.innerHTML = a;
        b = '';
    }
}

deleteButton.onclick = () => {
    a = '';
    const result = display.innerHTML;
    display.innerHTML = result.substring(0, result.length - 1);
    if (display.innerHTML.length > 0) {
        operandArray.pop();
    } if (operandArray.length = 1) {
        operandArray = display.innerHTML.split('');
    }
}

signButton.onclick = () => {
    if (operandArray.length > 0) {
        if (display.innerHTML.includes('-')) {
            operandArray.shift();
        } else {
            operandArray.unshift("-");
        }
        display.innerHTML = operandArray.join('');
    } else {
        a = -1 * a;
        display.innerHTML = a;
    }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, b, operation) => {
    if (operation == "+") return add(a, b);
    if (operation == "-") return subtract(a, b);
    if (operation == "×") return multiply(a, b);
    if (operation == "÷") return divide(a, b);
}