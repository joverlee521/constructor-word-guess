var wordSelection = ["Aladdin", "Mulan", "Hercules"];
var currentWord;
var inquirer = require("inquirer");
var Word = require("./word.js");
var alphabet = /[a-zA-Z]/;
var remainingGuesses = 10;

function selectRandomWord(){
    var selectedWord = wordSelection[Math.floor(Math.random() * wordSelection.length)];
    currentWord = new Word.word(selectedWord);
}

function guessPrompt(){
    if(!wordGuessed()){
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
            currentWord.checkGuess(user.guess);
            currentWord.displayWord();
            if(currentWord.checkGuess(user.guess)){
                console.log("CORRECT!");
            }
            else{
                remainingGuesses--;
                console.log("INCORRECT! You have " + remainingGuesses + " guesses left!");
            }
            guessPrompt();
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
        if(!word[i].guessed){
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
            selectRandomWord();
            guessPrompt();
        }
        else{
            console.log("Thank you for playing!");
        }
    })
}

selectRandomWord();
guessPrompt();
