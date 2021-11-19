let operandArray = [];
let operation;
let numInput;
let a;
let b;

const numKey = document.querySelectorAll('.num');
const operator = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equalButton');
const plusButton = document.querySelector('#plusButton');
const minusButton = document.querySelector('#minusButton');
const clearButton = document.querySelector('#clearButton');
const resultDisplay = document.querySelector('.resultDisplay');
const historyDisplay = document.querySelector('.history');

document.onclick = (e) => {
    let target = e.target;
    if (target.className == "key num") newNumInput(e);
    else if (target.className == "key operator" && operandArray.length > 0) {
        if (target.innerHTML !== "="){
            operation = target.innerHTML;
            console.log("operation set to " + operation);
        } 
        createNewOperand();
        if (target.innerHTML == "="){
            evaluate();
        }
        //createNewOperand();
    }
}

const newNumInput = (e) => {
    numInput = e.target.innerHTML;
    operandArray.push(numInput);
    console.log(operandArray);
    resultDisplay.innerHTML = operandArray.join('');
}

const createNewOperand = () => {
    if (!a) a = operandArray.join('');
    else b = operandArray.join('');
    console.log("a = " + a,'\n',"operandArray =", operandArray,'\n',"b = " + b);
    operandArray = [];
    console.log("operandArray =", operandArray);
}


/*equalButton.onclick = () => {
    evaluate();
}
*/

const evaluate = () => {
    a = Number(a);
    b = Number(b);
    operate(a, b, operation);
    console.log(a + " " + operation + " " + b + " = "  + operate(a, b, operation));
}












clearButton.onclick = () => {
    operandArray = [];
    resultDisplay.innerHTML = 0;
    historyDisplay.innerHTML = "";
    console.clear();
}





const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, b, operation) => {
    if (operation == "+") return add(a, b);
    if (operation == "—") return subtract(a, b);
    if (operation == "×") return multiply(a, b);
    if (operation == "÷") return divide(a, b);
}












