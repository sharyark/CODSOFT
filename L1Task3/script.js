document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calculator .buttons button');
    let currentOperand = '';
    let previousOperand = '';
    let currentOperator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'clear') {
                clearDisplay();
            } else if (button.id === 'calculate') {
                calculate();
            } else if (button.classList.contains('operator')) {
                handleOperator(button.value);
            } else {
                appendNumber(button.value);
            }
        });
    });

    function appendNumber(number) {
        currentOperand += number;
        display.value = currentOperand;
    }

    function handleOperator(operator) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            calculate();
        }
        currentOperator = operator;
        previousOperand = currentOperand;
        currentOperand = '';
        display.value = `${previousOperand} ${currentOperator}`; // Display the operator
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentOperand = result;
        previousOperand = '';
        currentOperator = null;
        display.value = result;
    }

    function clearDisplay() {
        currentOperand = '';
        previousOperand = '';
        currentOperator = null;
        display.value = '';
    }
});
