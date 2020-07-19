/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
    Notes Needed to create Game
    
    Variables to store:
    - Scores
    - Round Scores
    - Current Player or Active Player
    - Dice Value (Should be random and should be a whole number);
    - Boolean Data Type with name gamePlaying 
    
    Selectors and Event handling:
    - querySelector
    - addEventListener

    Code Block Sample:

    <div class="player-0-panel active">
        <div class="player-name" id="name-0">Player 1</div>
        <div class="player-score" id="score-0">43</div>
            <div class="player-current-box">
                <div class="player-current-label">Current</div>
                <div class="player-current-score" id="current-0">11</div>
            </div>
    </div>
    
    <button class="btn-new"><i class="ion-ios-plus-outline"></i>New game</button>
    <button class="btn-roll"><i class="ion-ios-loop"></i>Roll dice</button>
    <button class="btn-hold"><i class="ion-ios-download-outline"></i>Hold</button>
*/


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying, lastDiceRoll, lastDiceRollTwo;
let playerAmount = 2;
let diceDom = document.querySelector('.dice');
let diceDomTwo = document.querySelector('.dice-2');

// Start Methods

const init = () => {  
    gamePlaying = true, scores = [0,0], roundScore = 0, activePlayer = 0;
    diceDom.style.display = 'none';
    diceDomTwo.style.display = 'none';
    resetPlayerData(true, true, true);
    querySelector('querySelector', '.player-0-panel').classList.add('active');
}

const querySelector = (type, selector) => {
    switch(type){
        case 'getElementById': 
            return document.getElementById(selector)
        case 'querySelector':
            return document.querySelector(selector)
    }
}

const resetPlayerData = (score, currentScore, winnerStyles) =>{
    for ( let i = 0; i < playerAmount; i++){
        score ? querySelector('getElementById','score-' + [i]).textContent = '0' : null;
        currentScore ? querySelector('getElementById', 'current-' + [i]).textContent = '0' : null;
        if(winnerStyles === true){
            querySelector('querySelector', '.player-' + [i] + '-panel').classList.remove('winner');
            querySelector('querySelector', '.player-' + [i] + '-panel').classList.remove('active');
        }
    }
}

const eliminatePlayerData = () => {
    scores[activePlayer] = 0;
    querySelector('getElementById', 'score-' + activePlayer).textContent = '0';
    newPlayer();
}

const newPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    diceDom.style.display = 'none';
    diceDomTwo.style.display = 'none';
    resetPlayerData(false, true, false);
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

const setWinner = () => {
    gamePlaying = false;
    diceDom.style.display = 'none';
    querySelector('getElementById', 'name-' + activePlayer).textContent = 'WINNER!';
    querySelector('querySelector', '.player-' + activePlayer + '-panel').classList.add('winner');
    querySelector('querySelector', '.player-' + activePlayer + '-panel').classList.remove('active');
}

const randomizeDice = () => Math.floor(Math.random() * 6) + 1;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        
        let dice = randomizeDice();
        let diceTwo = randomizeDice();

        diceDom.src = 'dice-' + dice + '.png', diceDom.style.display = 'block';
        diceDomTwo.src = 'dice-' + diceTwo + '.png', diceDomTwo.style.display = 'block';
        
        if(lastDiceRoll === 6 && dice === 6){
            eliminatePlayerData();
        } else if ( lastDiceRollTwo === 6 && diceTwo === 6){
            eliminatePlayerData();
        } else if (dice !== 1 || diceTwo !== 1 ){
            roundScore += dice + diceTwo;
            querySelector('getElementById', 'current-' + activePlayer).textContent = roundScore;
        } else {
            newPlayer();
        }

        lastDiceRoll = dice;
        lastDiceRollTwo = diceTwo;
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        scores[activePlayer] += roundScore;
        querySelector('getElementById', 'score-' + activePlayer).textContent = scores[activePlayer];
        
        let scoreInput = querySelector('querySelector', 'input').value;  
        let winningScore;
        scoreInput ? winningScore = scoreInput : winningScore = 100;

        if (scores[activePlayer] >= winningScore){
            setWinner();
        } else{
            newPlayer();
        }
    }
})
