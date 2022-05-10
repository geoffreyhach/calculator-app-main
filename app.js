let key = document.querySelectorAll('.key');
let screen = document.querySelector('#calculator-screen');
let pressedKey;
let firstValue = 0;
let secondValue;
let operator = null;
screen.value = firstValue;

key.forEach(el => el.addEventListener('click', () => {
    pressedKey = el.value;
    // if pressing number and no operator selected
    if (el.classList.contains('number') && operator == null) {
        if (screen.value == 0) screen.value = pressedKey;
        else screen.value += Number(pressedKey);
        console.log(pressedKey);
    }

    // if pressing number and an operator is selected
    if (el.classList.contains('number') && operator !== null) {
        if (screen.value == firstValue) screen.value = pressedKey;
        else screen.value += Number(pressedKey);
        console.log(pressedKey);
    }

    //if pressing an operator
    if (el.classList.contains('operator'))  {
        // and if no other operator isn't selected
        if (operator == null) {
        firstValue = screen.value;
        operator = el.value; 
        console.log('nonnon')
        return
        }
        // and another operator is already selected
        if (operator !== null) {
            secondValue = screen.value;
            operator = el.value; 
            screen.value = calculate();
            firstValue = screen.value;

        }
    }

    if (el.classList.contains('equal'))  {
        secondValue = screen.value;
        screen.value = calculate();
    }

    if (el.classList.contains('reset')) {
        screen.value = 0;
        firstValue = 0;
        secondValue = 0;
        operator = null;
    }



}))

function calculate() {
    let result;
    if (operator == "+") result = Number(firstValue) + Number(secondValue);
    if (operator == "-") result = Number(firstValue) - Number(secondValue);
    if (operator == "*") result = Number(firstValue) * Number(secondValue);
    if (operator == "/") result = Number(firstValue) / Number(secondValue);

    return result;
}

