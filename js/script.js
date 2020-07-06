let buttons = document.querySelectorAll('.buttons');
let calculation = document.querySelector('#calculation');
let output = document.querySelector('#output');
let outputStored = '';
let lastOperator = '';
let returnSwitch = 0;
let errorSwitch = 0;

let accum = 0;
let lastNumber = 0;

buttons.forEach( function(btn) {
  btn.addEventListener('click', function() {
    // check switch function
    if (returnSwitch === 1 || errorSwitch === 1) {
      clearOperator();
    }
    if (btn.value >= 0 && btn.value <= 9) {
      output.textContent = outputStored + btn.value;
      outputStored = output.textContent;
      calculation.textContent += btn.value;
    } else if (btn.value === 'C') {
      clearOperator();
    } else if (btn.value === '='){
      performOperation(lastOperator, Number(accum), Number(output.textContent));
      returnSwitch = 1;
    } else {
      lastNumber = outputStored;
      if (accum == 0) {
        accum = outputStored;
      } else {
        performOperation(lastOperator, Number(accum), Number(lastNumber));
        accum = output.textContent;
      }
      outputStored = "";
      lastOperator = btn.value;
      calculation.textContent += ' ' + btn.value + ' ';
    }
  });
});

function performOperation(operator, numberOne, numberTwo) {
  if (operator === '+') {
    output.textContent = addOperator(numberOne, numberTwo);
  } else if (operator === '-') {
    output.textContent = subtractOperator(numberOne, numberTwo);
  } else if (operator === '×') {
    output.textContent = multiplyOperator(numberOne, numberTwo);
  } else if (operator === '÷') {
    output.textContent = divideOperator(numberOne, numberTwo);
  }
}

function addOperator(a, b) {
  return a + b;
}

function subtractOperator(a, b) {
  return a - b;
}

function multiplyOperator(a, b) {
  return a * b;
}

function divideOperator(a, b) {
  if (b == 0) {
    errorSwitch = 1;
    return "error";
  } else {
    return a / b;
  }
}

function equalOperator() {

}

function backspaceOperator() {

}

function plusminusOperator() {

}

function percentageOperator() {

}

function clearOperator() {
  outputStored = "";
  calculation.textContent = '';
  output.textContent = '';
  returnSwitch = 0;
  errorSwtich = 1;
  accum = 0;
  lastNumber = 0;
  lastOperator = '';
}
