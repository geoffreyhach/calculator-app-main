let key = document.querySelectorAll('.key');
let screen = document.querySelector('#calculator-screen');
let operatorKeys = document.querySelectorAll('.operator');
let pressedKey;
let firstValue = 0;
let secondValue = null;
let operator = null;
const regex = /ab+c/;
screen.value = firstValue;

//theme selector
let themeToggle = document.querySelector('.theme-toggle');
let body = document.querySelector('body');
themeToggle.value = 1;

themeToggle.addEventListener('input', () => {
    let i = themeToggle.value;

    body.classList.remove(...body.classList);
    body.classList.add(`theme${i}`);
})

key.forEach(el => el.addEventListener('click', () => {
    pressedKey = el.value;
    // if pressing number and no operator selected
    if (el.classList.contains('number') && operator == null) {
        if (screen.value == 0) screen.value = pressedKey;
        else screen.value += Number(pressedKey);      
    }

    // if pressing number and an operator is selected
    if (el.classList.contains('number') && operator !== null) {
        key.forEach(el => el.classList.remove('active'));
        if (screen.value == firstValue) screen.value = pressedKey;
        else screen.value += Number(pressedKey);
        console.log(pressedKey);
    }

    if (el.classList.contains('dot')) {
        screen.value += ".";
    }


    //if pressing an operator
    if (el.classList.contains('operator'))  {
        
        
        if (el.value == "-" && screen.value == 0) {
        screen.value='-';
        return;
        }

        // and if no other operator isn't selected
        if (operator == null) {
        firstValue = screen.value;
        operator = el.value; 
        return
        }

        // and another operator is already selected
        if (operator !== null && secondValue == null){ 
            operator = el.value;
            return;
        }
    
        if (operator !== null) {
            secondValue = screen.value;
            screen.value = calculate();
            operator = el.value; 
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
        key.forEach(el => el.classList.remove('active'));
    }

    if (el.classList.contains('del')) {
        const a = screen.value.split('')
        a.length = a.length - 1;
        screen.value = a.join('');
        if (a.length == 0) screen.value = 0;
    
    }
}))

    //change active class on the operators
operatorKeys.forEach (el => el.addEventListener('click', () => {
    operatorKeys.forEach (el => el.classList.remove('active'));
    el.classList.add('active');
}))

function calculate() {
    let result;
    if (operator == "+") result = Number(firstValue) + Number(secondValue);
    if (operator == "-") result = Number(firstValue) - Number(secondValue);
    if (operator == "*") result = Number(firstValue) * Number(secondValue);
    if (operator == "/") result = Number(firstValue) / Number(secondValue);
    key.forEach(el => el.classList.remove('active'));
    secondValue = null;
    return result;
}

