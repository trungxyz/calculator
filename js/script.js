function lastEntryType() {

  if (calculation.firstNumber === '') {
    return null;
  } else if (calculation.operator === '') {
    return "firstNumber";
  } else if (calculation.secondNumber === '') {
    return "operator";
  } else if (calculation.accum === '') {
    return "secondNumber";
  } else {
    return "equal";
  }

}

let calculation = {
  firstNumber: '',
  operator: '',
  secondNumber: '',
  accum: ''
};

// Looks good
function continueCalculation(firstNumber, operator) {

  calculation.firstNumber = firstNumber;
  calculation.operator = operator;
  calculation.secondNumber = '';
  calculation.accum = '';

  // consolidate updateDisplay
  let primaryDisplay = document.querySelector('#primary-display');
  let secondaryDisplay = document.querySelector('#secondary-display');

  primaryDisplay.textContent = firstNumber;
  secondaryDisplay.textContent = "(" + secondaryDisplay.textContent + ")";

};

document.querySelectorAll('.number').forEach( function(button) {

  button.addEventListener('click', function() {

    let primaryDisplay = document.querySelector('#primary-display');

    if (lastEntryType() === "equal" || primaryDisplay.textContent === "error") {
      resetCalculation();
    }

    let calculationNumber = storeNumber(button.value);
    updateDisplay(calculationNumber, button.value);
  })

});

// Needs lastEntryType or is this function even needed
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

    if (button.id === "clear") {
      resetCalculation();
      return;
    }

    if (document.querySelector('#primary-display').textContent === "error") {
      return;
    }

    if (lastEntryType() === null) {
      return;
    }

    if (button.id === "equal") {
      // make equal function
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

      if (firstNumber === "error") {
        return;
      }

      continueCalculation(firstNumber, button.id);
      document.querySelector('#secondary-display').textContent += " " + button.value + " ";
    }

  })

});

document.querySelectorAll('.modifier').forEach( function(button) {

  button.addEventListener('click', function() {

    if (document.querySelector('#primary-display').textContent === "error") {
      return;
    }

    if (button.id === "backspace") {
      let string = document.querySelector('#secondary-display').textContent;

      if (string.slice(string.length - 1, string.length) === ")") {
        return;
      }

      if (lastEntryType() === "firstNumber") {
        calculation.firstNumber = calculation.firstNumber.slice(0, calculation.firstNumber.length - 1);
        document.querySelector('#primary-display').textContent = calculation.firstNumber;
        document.querySelector('#secondary-display').textContent = string.slice(0, string.length - 1);
      } else if (lastEntryType() === "secondNumber") {
        calculation.secondNumber = calculation.secondNumber.slice(0, calculation.secondNumber.length - 1);
        document.querySelector('#primary-display').textContent = calculation.secondNumber;
        document.querySelector('#secondary-display').textContent = string.slice(0, string.length - 1);
      }

      return;

    }

    let callModifier = button.id;
    let number;

    if (lastEntryType() === "firstNumber") {
      number = calculation.firstNumber;
    } else if (lastEntryType() === "secondNumber") {
      number = calculation.secondNumber;
    } else if (lastEntryType() === "operator") {
      return;
    } else if (lastEntryType() === "equal") {

      if (button.id === "decimal") {
        resetCalculation();
        calculation.firstNumber = "0.";
        document.querySelector('#primary-display').textContent = calculation.firstNumber;
        document.querySelector('#secondary-display').textContent = calculation.firstNumber;
        return;
      }

      if (button.id === "plusminus") {
        let temp = calculation.accum;
        continueCalculation(temp, '');
        number = calculation.firstNumber;
        calculation.firstNumber = window[callModifier](number).toString();

        let string = document.querySelector('#secondary-display').textContent;

        if ( string.slice(0, 1) === "-" ) {
          document.querySelector('#secondary-display').textContent = string.slice(1, string.length);
        } else {
          document.querySelector('#secondary-display').textContent = "-" + string;
        }

        document.querySelector('#primary-display').textContent = calculation.firstNumber;

        return;
      }

      let temp = calculation.accum;
      continueCalculation(temp, '');
      number = calculation.firstNumber;
    }

    let result = window[callModifier](number).toString();

    if (!result) {
      return;
    }

    updateDisplay(callModifier, button.value);

    if (lastEntryType() === "firstNumber") {
      calculation.firstNumber = result;
    } else if (lastEntryType() === "secondNumber") {
      calculation.secondNumber = result;
    } else if (lastEntryType() === "equal") {
      calculation.firstNumber = result;
    }


    document.querySelector('#primary-display').textContent = result;


  })

});

// consolidate updateDisplay
function updateDisplay(calculationType, buttonValue) {

  let primaryDisplay = document.querySelector('#primary-display');
  let secondaryDisplay = document.querySelector('#secondary-display');

  if (calculation.firstNumber === "error") {
    return;
  }

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
  } else if (calculationType === "decimal") {

    if (lastEntryType() === "firstNumber") {
      if (calculation.firstNumber.includes(".")) {
        return;
      }
      secondaryDisplay.textContent += buttonValue;
    } else if (lastEntryType() === "secondNumber") {
      if (calculation.secondNumber.includes(".")) {
        return;
      }
      secondaryDisplay.textContent += buttonValue;
    } else if (lastEntryType() === "equal") {
      resetCalculation();
    }

  } else if (calculationType === "percentage") {
    secondaryDisplay.textContent += "%";
  } else if (calculationType === "plusminus") {
    let string = secondaryDisplay.textContent;

    if (string.slice(string.length - 1, string.length) === ")") {
      if ( string.slice(0, 1) === "-" ) {
        document.querySelector('#secondary-display').textContent = string.slice(1, string.length);
      } else {
        document.querySelector('#secondary-display').textContent = "-" + string;
      }
      return;
    }

    if (lastEntryType() === "firstNumber") {
      secondaryDisplay.textContent = string.slice(0, string.length - calculation.firstNumber.length) + calculation.firstNumber * (-1);
      console.log(calculation.firstNumber.length);
    } else if (lastEntryType() === "secondNumber") {
      secondaryDisplay.textContent = string.slice(0, string.length - calculation.secondNumber.length) + calculation.secondNumber * (-1);
      console.log(calculation.firstNumber.length);
    } else if (lastEntryType() === "equal") {
    }

  }

};

function resetCalculation() {

  for (let key in calculation) {
    calculation[key] = '';
  }

  // consolidate updateDisplay
  document.querySelector('#primary-display').textContent = '';
  document.querySelector('#secondary-display').textContent = '';

};

function add(a, b) {
  return Math.round( ( Number(a) + Number(b) ) * 100 ) / 100;
}

function subtract(a, b) {
  return Math.round( ( Number(a) - Number(b) ) * 100 ) / 100;
}

function multiply(a, b) {
  return Math.round( Number(a) * Number(b) * 100 ) / 100;
}

function divide(a, b) {
  if (Number(b) === 0) {

    let primaryDisplay = document.querySelector('#primary-display');
    let secondaryDisplay = document.querySelector('#secondary-display');

    primaryDisplay.textContent = "error"

    return "error";
  } else {
    return Math.round( (Number(a) / Number(b)) * 100 ) / 100;
  }
}

function decimal(a) {
  if (a.includes(".") === true) {
    return a;
  }
  return a + '.';
}

function percentage(a) {
  return a / 100;
}

function backspace(a) {
  return;
}

function plusminus(a) {
  return -a;
}
