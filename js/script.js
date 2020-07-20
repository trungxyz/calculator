let calculation = {
  firstNumber: '',
  operator: '',
  secondNumber: '',
  accum: ''
};

function continueCalculation(firstNumber, operator) {

  calculation.firstNumber = firstNumber;
  calculation.operator = operator;
  calculation.secondNumber = '';
  calculation.accum = '';

  document.querySelector('#primary-display').textContent = firstNumber;

  let secondaryDisplay = document.querySelector('#secondary-display');
  secondaryDisplay.textContent = "(" + secondaryDisplay.textContent + ")";

};

document.querySelectorAll('.number').forEach( function(button) {

  button.addEventListener('click', function() {

    if (calculation.accum != '') {
      resetCalculation();
    }

    let calculationNumber = storeNumber(button.value);
    updateDisplay(calculationNumber, button.value);
  })

});

function storeNumber(value) {

  if (calculation.operator === '') {
    calculation.firstNumber += value;
    return "firstNumber";
  } else {
    calculation.secondNumber += value;
    return "secondNumber";
  }

};

document.querySelectorAll('.operator').forEach( function(button) {

  button.addEventListener('click', function() {

    if (calculation.firstNumber === '') {
      return;
    }

    if (button.id === "clear") {
      resetCalculation();
      return;
    } else if (button.id === "equal") {
      let callOperator = calculation.operator;
      calculation.accum = window[callOperator](calculation.firstNumber, calculation.secondNumber).toString();
      updateDisplay("equal", calculation.accum);
      return;
    }

    if (calculation.secondNumber === '') {
      updateDisplay("operator", button.value);
      calculation.operator = button.id;
    } else if (calculation.secondNumber != '') {
      let callOperator = calculation.operator;
      let firstNumber = window[callOperator](calculation.firstNumber, calculation.secondNumber).toString();
      continueCalculation(firstNumber, button.id);
      document.querySelector('#secondary-display').textContent += " " + button.value + " ";
    }

  })

});

document.querySelectorAll('.modifier').forEach( function(button) {

})

function updateDisplay(calculationType, buttonValue) {

  let primaryDisplay = document.querySelector('#primary-display');
  let secondaryDisplay = document.querySelector('#secondary-display');

  if (calculationType === "firstNumber") {
    primaryDisplay.textContent = calculation.firstNumber;
    secondaryDisplay.textContent += buttonValue;
  } else if (calculationType === "secondNumber") {
    primaryDisplay.textContent = calculation.secondNumber;
    secondaryDisplay.textContent += buttonValue;
  } else if (calculationType === "operator") {
    if (calculation.operator === '') {
      secondaryDisplay.textContent += " " + buttonValue + " ";
    } else {
      let string = secondaryDisplay.textContent;
      secondaryDisplay.textContent = string.slice(0, string.length - 2) + " " + buttonValue + " ";
    }
  } else if (calculationType === "equal") {
    primaryDisplay.textContent = buttonValue;
  }

};

function resetCalculation() {

  for (let key in calculation) {
    calculation[key] = '';
  }

  document.querySelector('#primary-display').textContent = '';
  document.querySelector('#secondary-display').textContent = '';

};

function clearDisplay() {

}

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  if (Number(b) === 0) {
    return NaN;
  } else {
    return Math.round( (Number(a) / Number(b)) * 100 )/100;
  }
}

function decimalPlace(a) {

}

function backspace(a) {

}

function plusminus(a) {
  return -a;
}

function percentage(a) {
  return a / 100;
}
