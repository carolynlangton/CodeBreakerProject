let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' && attempt.value === '') {
        setHiddenFields();
    }

    if (!validateInput(input.value)) {
        return false;
    } else {
        attempt.value++;
    }

    const guessResult = getResults(input.value);

    if (guessResult) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if (attempt >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

//implement new functions here
function setHiddenFields() {
    attempt.value = 0;
    answer.value = Math.floor(Math.random() * 10000).toString();

    while (answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }
}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
    let isValid = false;

    if (input.length === 4) {
        isValid = true;
    } else {
        setMessage('Guesses must be exactly 4 characters long.');
    }

    return isValid;
}

function getResults(input) {
    let correctGuesses = 0;
    let resultsDiv = document.getElementById('results');
    let resultsContent = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';

    for (let i = 0; i < input.length; i++) {
        if (input[i] === answer.value[i]) {
            resultsContent += '<span class="glyphicon glyphicon-ok"></span>';
            correctGuesses++;
        } else if (answer.value.indexOf(input[i]) > -1) {
            resultsContent += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            resultsContent += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }

    resultsContent += '</div></div>';
    resultsDiv.innerHTML += resultsContent;
    return correctGuesses === 4;
}

function showAnswer(didPlayerWin) {
    const code = document.getElementById('code');
    code.innerHTML = answer.value;

    if (didPlayerWin) {
        code.className += ' success';
    } else {
        code.className += ' failure';
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}