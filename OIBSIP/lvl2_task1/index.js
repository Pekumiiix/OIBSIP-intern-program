const numbers = document.querySelectorAll('.number')
const equationContainer = document.querySelector('.equation')
const answerContainer = document.querySelector('.ans')
const clearButton = document.querySelector('.clear')
const deleteButton = document.querySelector('.delete')
const solveButton = document.querySelector('.enter')
const signs = document.querySelectorAll('.sign')

numbers.forEach((number) => {
    let numberValue = number.value

    number.addEventListener('click', () => {
        equationContainer.innerHTML += numberValue
    })
})

clearButton.addEventListener('click', () => {
    equationContainer.innerHTML = ''
    answerContainer.innerHTML = ''
})

deleteButton.addEventListener('click', () => {
    const equationText = equationContainer.innerHTML

    if(equationText > 0) {
        const updatedText = equationText.slice(0, -1)

        equationContainer.innerHTML = updatedText.length > 0 ? updatedText : '0'
    }
})

solveButton.addEventListener('click', () => {
    answerContainer.innerHTML = eval(equationContainer.innerHTML).toFixed(2)
})

signs.forEach((sign) => {
    sign.addEventListener('click', () => {
        if(answerContainer.innerHTML != '') {
            const newEquation = answerContainer.innerHTML

            equationContainer.innerHTML = Number(newEquation).toFixed(1) + sign.value
        }
    })
})