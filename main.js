let buttonList = document.querySelectorAll('button');
let display = document.querySelector('#display');
let currentNumber = 0;
let currentOperation = '';
let readyToCalculate = false;
let nextNumberDisplayZero = false;
let operationHolding = false;

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

//Provide keyboard support
document.addEventListener('keydown', (e) => {
     switch(e.key){
          case 'Backspace':
               deleteNumber();
               break;
          case '+':
          case '-':
          case '*':
          case '/':
               performMath(e.key);
               break;
          case '.':
               addDecimal();
               break;
          case 'Enter':
               calculate();
               break;
          case '0':
          case '1':
          case '2':
          case '3':     
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':             
          case '9':
               getNumber(e.key);
               break;
          default:
               return; 
     }
});

function clearCalculator() {
     currentNumber = 0;
     currentOperation = '';
     readyToCalculate = false; 
     nextNumberDisplayZero = false;
     display.innerText = 0;
     operationHolding = false;
}

function deleteNumber() {
     if (display.innerText.length === 0 || display.innerText === '0') return;
     display.innerText = display.innerText.substring(0, display.innerText.length - 1);
     if (display.innerText === ''){
          display.innerText = '0';
     }
}

function getNumber(number){
     if (display.innerText === '0'){
          display.innerText = '';
     }

     if (nextNumberDisplayZero === true){
          display.innerText = '';
          nextNumberDisplayZero = false;
     }
     display.innerText += number;
     operationHolding = false;
}

function addDecimal(){
     if (display.innerText.includes('.')){
          return;
     }
     display.innerText += '.';
}

function performMath(mathSign){
     if (operationHolding === true){
          currentOperation = mathSign;
          return;
     }

     if (readyToCalculate === false) {
          currentNumber = display.innerText;
          display.innerText = 0;
          readyToCalculate = true;
          currentOperation = mathSign;
          operationHolding = true;
     } else {
          let output = operate(currentOperation);

          display.innerText = output;
          currentNumber = output;
          
          currentOperation = mathSign;
          nextNumberDisplayZero = true;
          operationHolding = true;
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
     operationHolding = false;
}

function operate(operation){
     let output = 0;
     if (operation == '+'){
          output = Number(currentNumber) + Number(display.innerText);
     } else if (operation == '-') {
          output = Number(currentNumber) - Number(display.innerText);
     } else if (operation == '*') {
          output = Number(currentNumber) * Number(display.innerText);
     } else if (operation == '÷' || operation =='/') {
          if (display.innerText == 0){
               currentNumber = 0;
               readyToCalculate = false;
               nextNumberDisplayZero = true;
               return display.innerText = 'nice try';
          }
          output = Number(currentNumber) / Number(display.innerText);
     }
     
     //Round to 3 decimal places
     if(output.toString().indexOf('.') >= 0){
          if (output.toString().substring(output.toString().indexOf('.')).length > 4){
               output = Math.round(output * 1000) / 1000;
          };
     }
     
     return output;
}