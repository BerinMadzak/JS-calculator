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

    setConstant(constant) {
        switch (constant) {
            case 'e':
                this.currentOperand = 2.7182818284590452353602874713527
                break
            case String.fromCharCode(960):
                this.currentOperand = 3.1415926535897932384626433832795
            default: return
        }
    }

    unaryOperation(operation) {
        let result
        let op
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return

        switch (operation) {
            case 'sin':
                result = Math.sin(current)
                op = `sin(${current})`
                break
            case 'cos':
                result = Math.cos(current)
                op = `cos(${current})`
                break
            case 'tan':
                result = Math.tan(current)
                op = `tan(${current})`
                break
            case 'asin':
                if (current < -1 || current > 1) return
                result = Math.asin(current)
                op = `asin(${current})`
                break
            case 'acos':
                if (current < -1 || current > 1) return
                result = Math.acos(current)
                op = `acos(${current})`
                break
            case 'atan':
                result = Math.atan(current)
                op = `atan(${current})`
                break
            case '1/x':
                result = 1 / current
                op = `1/${current}`
                break
            case '|x|':
                result = Math.abs(current)
                op = `|${current}|`
                break
            case '+/-':
                result = -current
                op = ''
                break
            case 'log':
                result = Math.log10(current)
                op = `log(${current})`
                break
            case 'ln':
                result = Math.log(current)
                op = `ln(${current})`
                break
            case 'x2':
                result = Math.pow(current, 2)
                op = `sqr(${current})`
                break
            case 'x3':
                result = Math.pow(current, 3)
                op = `cube(${current})`
                break
            case String.fromCharCode(8730) + 'x':
                result = Math.sqrt(current)
                op = `${String.fromCharCode(8730)}(${current})`
                break
            case String.fromCharCode(8731) + 'x':
                result = Math.cbrt(current)
                op = `${String.fromCharCode(8731)}(${current})`
                break
            case 'n!':
                result = this.factoriel(current)
                op = `fact(${current})`
                break
            default: return
        }
        this.previousOperand = op
        this.currentOperand = result
        this.operation = null
    }

    factoriel(num) {
        let sum = 1
        for (let i = 2; i <= num; i++) sum *= i
        return sum
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
            case 'sin':
                result = sin(current)
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

    updateDisplay(unary = false) {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if (unary) {
            this.previousOperandText.innerText = this.previousOperand
        }
        else if (this.operation != null) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandText.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const unaryOperationButtons = document.querySelectorAll('[data-operation-unary]')
const constantButtons = document.querySelectorAll('[data-constant]')
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

unaryOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.unaryOperation(button.innerText)
        calculator.updateDisplay(true)
    })
})

constantButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.setConstant(button.innerText)
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
