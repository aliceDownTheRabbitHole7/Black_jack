var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ['a', 'k', 'q', 'j', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    let types = ['c', 's', 'h', 'd'];
    deck = [];

    // Loops through every value and adds each type to every value

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + '-' + types[i]);
        }
    }
}

// Randomizes deck

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Deals out cards for you and the dealer

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 17) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = './cards/' + card + '.png';
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealer-cards').append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = './cards/' + card + '.png';
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById('your-cards').append(cardImg);
    }

    document.getElementById('hit').addEventListener('click', hit);
    document.getElementById('stay').addEventListener('click', stay);
}

// Draws additional card if requested

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = './cards/' + card + '.png';
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById('your-cards').append(cardImg);

    if (reduceAce(yourSum, yourAceCount) >= 21) {
        canHit = false;
    }

}

// Player decides to stay with the score they have and end the game

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById('hidden').src = './cards/' + hidden + '.png';

    let message = '';
    if (yourSum > 21 || yourSum < dealerSum) {
        message = 'You Lose!';
    }
    else if (dealerSum > 21 || yourSum > dealerSum) {
        message = 'You Win!'
    }
    else {
        message = "Tie goes to the dealer."
    }

    document.getElementById('dealer-sum').innerText = dealerSum;
    document.getElementById('your-sum').innerText = yourSum;
    document.getElementById('results').innerText = message;
}

// Gives each card a numeric value

function getValue(card) {
    let data = card.split('-');
    let value = data[0];

    if (isNaN(value)) {
        if (value == 'a') {
            return 11;
        } else {
            return 10;
        }
    }
    return parseInt(value);
}

// Checks if the card is an ace

function checkAce(card) {
    if (card[0] == 'a') {
        return 1;
    } else {
        return 0;
    }
}

// Decides whether the ace will equal 10 or 1

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}


