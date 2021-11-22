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
const resultDisplay = document.querySelector('.resultDisplay');
const history = document.querySelector('.history');


keypad.onclick = (e) => {
    let t = e.target;
    if (resultDisplay.innerHTML == "Error") clear();
    else if (t.className == "key num") {
        if (history.innerHTML.includes("=") || history.innerHTML == resultDisplay.innerHTML) clear();
        newNumInput(e);
    } else if (t.className == "key operator" && resultDisplay.innerHTML.length>0) {
        if (resultDisplay.innerHTML == 0) operandArray = [0];
        createNewOperand();
        if (t.innerHTML == "="){
            if (b == '') history.innerHTML = resultDisplay.innerHTML;
            else evaluate();
        } else if (b == '') {
            operation = t.innerHTML;
            history.innerHTML = a + " " + operation;
        }  else {
            evaluate();
            operation = t.innerHTML;
            history.innerHTML = a + " " + operation;
        }
    }
}

const newNumInput = (e) => {
    numInput = e.target.innerHTML;
    operandArray.push(numInput);
    resultDisplay.innerHTML = operandArray.join('');
}

const createNewOperand = () => {
    if (a == '') a = operandArray.join('');
    else b = operandArray.join('');
    operandArray = [];
}


const evaluate = () => {
    a = Number(a);
    b = Number(b);
    history.innerHTML += ' ' + b + ' =';
    a = Math.round(operate(a, b, operation)*1000000)/1000000;
    resultDisplay.innerHTML = a;
    b = '';
    if (resultDisplay.innerHTML == "NaN" || resultDisplay.innerHTML == "Infinity") resultDisplay.innerHTML = "Error";
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
}


squareButton.onclick = () => {
    if (a=='') {
        createNewOperand();
        a = Number(a);
        if (history.innerHTML.length > 0) history.innerHTML = ' sqr(' + a + ') =';
        else history.innerHTML += ' sqr(' + a + ') =';
        a = Math.round((a*a)*1000000)/1000000;
        resultDisplay.innerHTML = a;
    } else if (a != '' && b == '' && history.innerHTML.includes("=") || a != '' && !history.innerHTML.includes(" ")) {
        a = Number(a);
        history.innerHTML = ' sqr(' + a + ') =';
        a = Math.round((a*a)*1000000)/1000000;
        resultDisplay.innerHTML = a;
    } else {
        createNewOperand();
        a = Number(a);
        history.innerHTML = a + ' ' + operation + ' sqr(' + b + ') =';
        b = b*b;
        a = Math.round(operate(a, b, operation)*1000000)/1000000;
        resultDisplay.innerHTML = a;
        b = '';
    }
}


deleteButton.onclick = () => {
    a = '';
    let result = resultDisplay.innerHTML;
    resultDisplay.innerHTML = result.substring(0, result.length - 1);
    if (resultDisplay.innerHTML.length > 0) operandArray.pop();
    if (operandArray.length = 1) operandArray = resultDisplay.innerHTML.split('');
}


signButton.onclick = () => {
    if (operandArray.length > 0) {
        if (resultDisplay.innerHTML.includes('-')) operandArray.shift();
        else operandArray.unshift("-");
        resultDisplay.innerHTML = operandArray.join('');
    } else {
        a = -1 * a;
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

