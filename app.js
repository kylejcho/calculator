let currentOperand = [0];
let lastOperand;
let input;
let numInput;
let currentDisplay = '';

const numKey = document.querySelectorAll('.num');
const operator = document.querySelectorAll('.operator');
const result = document.querySelector('.result');
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
    if (currentOperand[0] === 0) {
        currentOperand[0] = numInput;
        console.log(currentOperand);
    } else {
        currentOperand.push(numInput);
        console.log(currentOperand);
    }
    updateOperand();
}

const updateOperand = () => {
     result.innerHTML = currentOperand.join('');
} 


const createOperand = () => {
    lastOperand = currentOperand.join('');
    console.log(lastOperand)
}


plusButton.onclick = () => {
    createOperand();
}





const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = () => {
 
    
}
