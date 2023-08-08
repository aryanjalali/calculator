/*
Pseudocode ?

Take user number input(s)
Take user sign input
Store numbers up to now as current number
Store sign as current math function
Take user number input(s)
User clicks enter signals to apply math function to two numbers
OR user clicks another math function signals to perform calculation
Make result the new current number and display it

*/

let buttonList = document.querySelectorAll('button');
let display = document.querySelector('#display');
let currentNumber = 0;
let currentOperation = '';
let readyToCalculate = false;
let nextNumberDisplayZero = false;

buttonList.forEach(button => button.addEventListener('click', getUserInput));

function getUserInput(e) {
     e.preventDefault();

     //e.target.innerText refers to the symbol/text/number on the button
     switch(e.target.innerText){
          case 'CLEAR':
               clearCalculator()
               break;
          case 'DELETE':
               deleteNumber();
               break;
          case '+':
          case '-':
          case '*':
          case '÷':
               performMath(e.target.innerText);
               break;
          case '.':
               addDecimal();
               break;
          case '=':
               calculate();
               break;
          default: // Only numbers unaccounted for in previous cases
               getNumber(e.target.innerText);   
     }
     
     
}

function clearCalculator() {
     currentNumber = 0;
     currentOperation = '';
     readyToCalculate = false; 
     nextNumberDisplayZero = false;
     display.innerText = 0;
}

function deleteNumber() {
     if (display.innerText.length === 0 || display.innerText === '0') return;
     display.innerText = display.innerText.substring(0, display.innerText.length - 1);
     if (display.innerText === ''){
          display.innerText = '0';
     }
}

function getNumber(number){
     if (display.innerText == 0){
          display.innerText = '';
     }

     if (nextNumberDisplayZero === true){
          display.innerText = '';
          nextNumberDisplayZero = false;
     }
     display.innerText += number;
}

function addDecimal(){
     if (display.innerText.includes('.')){
          return;
     }
     display.innerText += '.';
}

function performMath(mathSign){
     if (readyToCalculate === false) {
          currentNumber = display.innerText;
          display.innerText = 0;
          readyToCalculate = true;
          currentOperation = mathSign;
     } else {
          let output = operate(currentOperation);

          display.innerText = output;
          currentNumber = output;
          
          currentOperation = mathSign;
          nextNumberDisplayZero = true;
     }    
}

function calculate() {
     if (readyToCalculate === false){
          return;
     } 
     let output = operate(currentOperation);
     display.innerText = output;
     currentNumber = output;
     readyToCalculate = false;
     nextNumberDisplayZero = true;
}

function operate(operation){
     let output = 0;
     if (operation == '+'){
          output = Number(currentNumber) + Number(display.innerText);
     } else if (operation == '-') {
          output = Number(currentNumber) - Number(display.innerText);
     } else if (operation == '*') {
          output = Number(currentNumber) * Number(display.innerText);
     } else if (operation == '÷') {
          if (display.innerText == 0){
               currentNumber = 0;
               readyToCalculate = false;
               nextNumberDisplayZero = true;
               return display.innerText = 'nice try';
          }
          output = Number(currentNumber) / Number(display.innerText);
     }
     return output;
}