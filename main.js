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

buttonList.forEach(button => button.addEventListener('click', getUserInput));

function getUserInput(e) {
     e.preventDefault();

     //e.target.innerText refers to the symbol/text/number on the button
     switch(e.target.innerText){
          case 'CLEAR':
               console.log('clear');
               break;
          case 'DELETE':
               deleteNumber();
               break;
          case '+':
          case '-':
          case '*':
          case '÷':
               console.log('symbol');
               break;
          case '.':
               console.log('decimal');
               break;
          case '=':
               console.log('equals');
               break;
          default: // Only numbers unaccounted for in previous cases
               getNumber(e.target.innerText);   
     }
     
     
}

function clearCalculator(e) {

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
     display.innerText += number;
}