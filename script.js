class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperandText = previousOperand
        this.currentOperandText = currentOperand
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            if (this.previousOperand === '') return
            this.operation = operation
            return
        }
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let result
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                result = previous + current
                break
            case '-':
                result = previous - current
                break
            case '*':
                result = previous * current
                break
            case '/':
                result = previous / current
                break
            default: return
        }

        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringValue = number.toString()
        const integerPart = parseFloat(stringValue.split('.')[0])
        const decimalPart = stringValue.split('.')[1]
        let integerDisplay
        if (isNaN(integerPart)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerPart.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalPart != null) {
            return `${integerDisplay}.${decimalPart}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandText.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandText = document.querySelector('[data-old-op]')
const currentOperandText = document.querySelector('[data-op]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
