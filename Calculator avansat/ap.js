let digit9 = document.querySelector('#digit9');
let digit8 = document.querySelector('#digit8');
let digit7 = document.querySelector('#digit7');
let digit6 = document.querySelector('#digit6');
let digit5 = document.querySelector('#digit5');
let digit4 = document.querySelector('#digit4');
let digit3 = document.querySelector('#digit3');
let digit2 = document.querySelector('#digit2');
let digit1 = document.querySelector('#digit1');
let digit0 = document.querySelector('#digit0');

let add = document.querySelector('#add');
let substract = document.querySelector('#substract');
let multiply = document.querySelector('#multiply');
let divide = document.querySelector('#divide');
let equals  = document.querySelector('#equals');
let result = document.querySelector('.result');
let clear = document.querySelector('#clear');


let firstNumber = 0;
let secondNumber = 0;
let operator = '';

//FLAG
let isFirstNumber = true;
  

function buildNumber(digit){
    if (isFirstNumber){
        firstNumber = (firstNumber * 10) + digit;
        result.innerHTML = firstNumber;
    }else {
        secondNumber = (secondNumber * 10) + digit;
        result.innerHTML = secondNumber;
    }
}

digit7.addEventListener('click', function(){
    buildNumber(7);
});

digit8.addEventListener('click', function(){
    buildNumber(8);
});

digit9.addEventListener('click', function(){
    buildNumber(9);
});

// incepe linia 2 
digit6.addEventListener('click', function(){
    buildNumber(6);
});
digit5.addEventListener('click', function(){
    buildNumber(5);
});
digit4.addEventListener('click', function(){
    buildNumber(4);
});

// incepe linia 3
digit3.addEventListener('click', function(){
    buildNumber(3);
});
digit2.addEventListener('click', function(){
    buildNumber(2);
});
digit1.addEventListener('click', function(){
    buildNumber(1);
});
digit0.addEventListener('click', function(){
    buildNumber(0);
});

//operatorul *
multiply.addEventListener('click', function(){
    isFirstNumber = false;
    if (operator !== '') {
        continueOperation();
    } 
    operator = '*';
    result.innerHTML = operator;
});

// operatorul - 
substract.addEventListener('click', function(){
    isFirstNumber = false;
    if (operator !== '') {
        continueOperation();
    } 
    operator = '-';
    result.innerHTML = operator;
});

// operatorul +
add.addEventListener('click', function(){
    isFirstNumber = false;
    if (operator !== '') {
        continueOperation();
    } 

    operator = '+';
    result.innerHTML = operator;
});
// operatorul /
divide.addEventListener('click', function(){
    isFirstNumber = false;
    if (operator !== '') {
        continueOperation();
    } 
    operator = '/';
    result.innerHTML = operator;
});

// AC button
clear.addEventListener('click', function(){
    if (isFirstNumber){
        firstNumber = String(firstNumber).slice(0, -1);
        result.innerHTML = firstNumber;
    }else {
        secondNumber =  String(secondNumber).slice(0, -1);
        result.innerHTML = secondNumber;
    }
})

//egalul
equals.addEventListener('click', function(){
    let res;
    switch(operator){
        case '*':
            res = firstNumber * secondNumber;
            break;
        case '-':
            res = firstNumber - secondNumber;
            break;
        case '+':
            res = firstNumber + secondNumber;
            break;
        case '/':
            res = firstNumber / secondNumber;
            break;    
        default:
            alert('Nu merge!');
}
    result.innerHTML = res;
    firstNumber = res;
    secondNumber = 0;
    operator = '';
//FLAG
    isFirstNumber = true;
});



function continueOperation() {
    switch (operator) {
        case '*':
            res = firstNumber * secondNumber;
            break;
        case '-':
            res = firstNumber - secondNumber;
            break;
        case '+':
            res = firstNumber + secondNumber;
            break;
        case '/':
            res = firstNumber / secondNumber;
            break;
        default:
            alert('Nu merge!');
    }
    // result.innerHTML = res;
    firstNumber = res;
    secondNumber = 0;
}
// order2
// .then((res) => {
//     console.log(res);
//     return order3;
// })
// .then((res) => {
//     console.log(res);
//     return order1;
// })
// .then((res) => {
//     console.log(res);
// })
