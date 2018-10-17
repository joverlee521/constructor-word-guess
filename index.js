var wordSelection = ["The Little Mermaid" , "The Lion King", "Aladdin", "Hercules", "Cinderella", "Beauty and the Beast", "Pocahontas", "The Aristocats", "Peter Pan", "Dumbo", "The Jungle Book"];
var currentWord;
var inquirer = require("inquirer");
var Word = require("./word.js");
var alphabet = /[a-zA-Z]/;
var remainingGuesses = 10;
var guessedLetters = [];
var usedWords = [];

function selectRandomWord(){
    var selectedWord = wordSelection[Math.floor(Math.random() * wordSelection.length)];
    if(usedWords.indexOf(selectedWord) < 0){
        currentWord = new Word.word(selectedWord);
        usedWords.push(selectedWord);
    }
    else if(usedWords.length !== wordSelection.length){
        selectRandomWord();
    }
    else{
        console.log("There are no more words to guess!");
        playAgain();
    }
}

function guessPrompt(){
    if(remainingGuesses <= 0){
        console.log("You're out of guesses! You lose!");
        playAgain();
    }
    else if(!wordGuessed()){
        console.log("Try to guess the Disney movie!");
        currentWord.displayWord();
        inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: "Guess a letter: ",
                validate: function(input){
                    if(alphabet.test(input) && input.trim().length === 1){
                        return true;
                    }
                    else{
                        console.log("\n Please enter a single letter");
                        return false;
                    }
                }
            }
        ]).then(function(user){
            if(guessedLetters.indexOf(user.guess) >= 0){
                console.log("You already guessed this letter! Try again!");
                guessPrompt();
            }
            else{
                currentWord.checkGuess(user.guess);
                currentWord.displayWord();
                if(currentWord.checkGuess(user.guess)){
                    console.log("CORRECT!");
                }
                else{
                    remainingGuesses--;
                    console.log("INCORRECT! You have " + remainingGuesses + " guesses left!");
                }
                guessedLetters.push(user.guess);
                guessPrompt();
            }
        })
    }
    else{
        console.log("You guessed the word!");
        playAgain();
    }
}

function wordGuessed(){
    var word = currentWord.wordArray;
    for(var i = 0; i < word.length; i++){
        if(!word[i].guessed && word[i] !== " "){
            return false;
        }
    }
    return true;
}

function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to play again?",
            default: true
        }
    ]).then(function(user){
        if(user.confirm){
            guessedLetters = [];
            remainingGuesses = 10;
            selectRandomWord();
            guessPrompt();
            if(usedWords.length === wordSelection.length){
                usedWords = [];
            }
        }
        else{
            console.log("Thank you for playing!");
        }
    })
}

selectRandomWord();
guessPrompt();
