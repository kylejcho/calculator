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
const resultDisplay = document.querySelector('.resultDisplay');
const historyDisplay = document.querySelector('.history');


keypad.onclick = (e) => {
    let target = e.target;
    if (target.className == "key num" && historyDisplay.innerHTML.includes("=")) clear();
    if (target.className == "key num" ) newNumInput(e);

    else if (target.className == "key operator" && operandArray.length || target.className == "key operator" && a != 0 ) {
        createNewOperand();
        if (target.innerHTML !== "=" && b == ''){
            operation = target.innerHTML;
            historyDisplay.innerHTML = a + " " + operation;
            console.log("operation set to " + operation);
        } 
        if (target.innerHTML !== "=" && b != '') {
            console.log("operation set to " + operation);
            evaluate();
            operation = target.innerHTML;
            historyDisplay.innerHTML = a + " " + operation;
        }
        if (target.innerHTML == "=" && b != ''){
            evaluate();
            
        } else if (target.innerHTML == "=" && b == '') {
            historyDisplay.innerHTML = resultDisplay.innerHTML;
        }
    }
}

const newNumInput = (e) => {
    numInput = e.target.innerHTML;
    operandArray.push(numInput);
    console.log(operandArray);
    resultDisplay.innerHTML = operandArray.join('');
    //resize();
}

const createNewOperand = () => {
    if (a == '') a = operandArray.join('');
    else b = operandArray.join('');
    console.log("a = " + a,'\n',"operandArray =", operandArray,'\n',"b = " + b);
    operandArray = [];
    console.log("operandArray =", operandArray);
}


const evaluate = () => {
    a = Number(a);
    b = Number(b);
    historyDisplay.innerHTML += ' ' + b + ' =';
    let answer = Math.round(operate(a, b, operation)*1000000)/1000000;
    console.log(a + " " + operation + " " + b + " = "  + answer);
    resultDisplay.innerHTML = answer;
    a = answer;
    b = '';
    console.log("a = " + a);
    console.log("b = " + b);
    console.log("answer = " + answer);
}





const resize = () => {
    if (resultDisplay.innerHTML.length > 10 && fontSize > 25) {
        fontSize -= 1.75;
        resultDisplay.style.fontSize = fontSize +"px";
    } 
}

clearButton.onclick = () => {
    clear();
}

const clear = () => {
    operandArray = [];
    resultDisplay.innerHTML = 0;
    historyDisplay.innerHTML = "";
    a = '';
    b = '';
    console.clear();
}


squareButton.onclick = () => {
    if (a=='' && b =='') {
        createNewOperand();
        a = Number(a);
        b = a;
        historyDisplay.innerHTML += ' sqr(' + b + ') =';
        let answer = Math.round(operate(a, b, operation)*1000000)/1000000;
        console.log(b + "^2 = "  + answer);
        resultDisplay.innerHTML = answer;
        a = answer;
        b = '';
    } else if (a != '' && b == '' && historyDisplay.innerHTML.includes("=")) {
        a = Number(a);
        historyDisplay.innerHTML = ' sqr(' + a + ') =';
        let answer = Math.round((a*a)*1000000)/1000000;
        a = answer;
        resultDisplay.innerHTML = answer;
    }
    else {
        createNewOperand();
        a = Number(a);
        historyDisplay.innerHTML = a + ' ' + operation + ' sqr(' + b + ') =';
        b = Math.round((b*b)*1000000)/1000000;
        let answer = Math.round(operate(a, b, operation)*1000000)/1000000;
        a = answer;
        resultDisplay.innerHTML = answer;
        b = '';
    }
}


deleteButton.onclick = () => {
    let result = resultDisplay.innerHTML;
    resultDisplay.innerHTML = result.substring(0, result.length - 1);
    if (resultDisplay.innerHTML.length > 0) {
        operandArray.pop();
    } if (operandArray.length = 1) {
        operandArray = resultDisplay.innerHTML.split('');
    }
    console.log(operandArray);
    a = resultDisplay.innerHTML;
    console.log("AAAA ==="+ a);
    console.log("b =" + b)
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

