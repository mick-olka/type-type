const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');
let quote=null;
let wordsCount = 1;
let speedArray = [];

//========================================
quoteInputElement.addEventListener('input', () => {
    const quoteArray = quoteDisplayElement.querySelectorAll('span');
    const inputArray = quoteInputElement.value.split('');
    const rightQuoteArr = quote.split('');
    let correct = true;

    // quoteArray.forEach((characterSpan, index) => {
    //     const character = inputArray[index];
    //     if (character == null) {        //  if not written yet
    //         characterSpan.classList.remove('correct');
    //         characterSpan.classList.remove('incorrect');
    //         correct=false;
    //     } else if (character === characterSpan.innerText) { //  if correct
    //         //characterSpan.innerText(character);
    //         characterSpan.classList.add('correct');
    //         characterSpan.classList.remove('incorrect');
    //     } else {    //  if not correct
    //         //characterSpan.innerText(character);
    //         characterSpan.classList.add('incorrect');
    //         characterSpan.classList.remove('correct');
    //         correct=false;
    //     }
    // });

    for (var i = quoteArray.length - 1; i >= 0; i--) {
        if (inputArray[i]==null) {
            
            quoteArray[i].innerHTML=rightQuoteArr[i];
            quoteArray[i].classList.remove('correct');
            quoteArray[i].classList.remove('incorrect');
            correct=false;
        }
        else if (rightQuoteArr[i]===inputArray[i]) {
            quoteArray[i].innerHTML=rightQuoteArr[i];
            quoteArray[i].classList.add('correct');
            quoteArray[i].classList.remove('incorrect');
        }
        else {
            quoteArray[i].innerHTML=inputArray[i];
            quoteArray[i].classList.add('incorrect');
            quoteArray[i].classList.remove('correct');
            correct=false;
        }
    }

    if (correct) {
        let p = document.createElement("p");
        speedArray.push(wordsCount / getTimerTime() * 60);
        let averageSpeed = countAverageSpeed();
        //p.innerText= averageSpeed.toFixed(2);
        speedElement.innerText=averageSpeed.toFixed(2);
        renderNewQuote();
    };
});
//========================================
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL, {
    	headers: {
      'Access-Control-Allow-Origin': '*',
    },
    })
        .then(response => response.json())
        .then(data => data.content);
}

//========================================

async function renderNewQuote() {
    quote = await getRandomQuote();
    quoteDisplayElement.innerText = '';
    wordsCount=1;
    quote.split('').forEach(character => {
        character===' ' ? wordsCount++ : null;
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })

    quoteInputElement.value = null;
    startTimer();
}

//========================================

let countAverageSpeed = () => {
    let sum = 0;
    for (var i = 0; i < speedArray.length; i++) {
        sum+=speedArray[i];
    }
    return sum/speedArray.length;
}

//========================================

let startTime;
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();