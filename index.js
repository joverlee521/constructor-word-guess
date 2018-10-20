// Require Word construct, inquirer and colors package 
var Word = require("./word");
var inquirer = require("inquirer");
var colors = require("colors");
// Array of words to select for game
var wordSelection = ["The Little Mermaid" , "The Lion King", "Aladdin", "Hercules", "Cinderella", "Beauty and the Beast", "Pocahontas", "The Aristocats", "Peter Pan", "Dumbo", "The Jungle Book"];
var currentWord;
// Regex to check input is an alphabetical letter
var alphabet = /[a-zA-Z]/;
var remainingGuesses = 10;
var guessedLetters = [];
var usedWords = [];
var firstGame = true;

// Function to select random word from the wordSelection array
function selectRandomWord(){
    var selectedWord = wordSelection[Math.floor(Math.random() * wordSelection.length)];
    // Check that word has not already been used in current game
    if(usedWords.indexOf(selectedWord) < 0){
        currentWord = new Word();
        currentWord.wordToArray(selectedWord);
        usedWords.push(selectedWord);
    }
    // If there are still words that has not been used, try selecting another random word
    else if(usedWords.length !== wordSelection.length){
        selectRandomWord();
    }
    // If all words have been used, alert player and ask if they want to play again
    else{
        console.log("There are no more words to guess!".magenta);
        playAgain();
    }
}

// Function to check if word has been guessed
function wordGuessed(){
    var word = currentWord.wordArray;
    // Loops through the word and checks if any of the letter has NOT been guessed
    for(var i = 0; i < word.length; i++){
        if(!word[i].guessed && word[i] !== " "){
            return false;
        }
    }
    // If all the letters have been guessed, then return true
    return true;
}

// Function that prompts user for input
function guessPrompt(){
    // If player used all their guesses, alert them and ask if they want to play again
    if(remainingGuesses <= 0){
        console.log("You're out of guesses! You lose!".red);
        playAgain();
    }
    // If the word has not been guessed, display prompt
    else if(!wordGuessed()){
        // Display word at the start of the game if it is the first game
        if(firstGame){
        console.log("Try to guess the Disney movie!".magenta);
        currentWord.displayWord();
        firstGame = false;
        }
        // Inquirer prompt to ask for user's guess
        inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: "Guess a letter: ",
                // User input validation function
                validate: function(input){
                    // Checks if the user has already guessed the same letter 
                    if(guessedLetters.indexOf(input.trim().toLowerCase()) >= 0){
                        console.log("\n You already guessed this letter! Try again!".red);
                        return false;
                    }
                    // Checks if user's input is a single letter of the alphabet
                    else if(alphabet.test(input) && input.trim().length === 1){
                        return true;
                    }
                    // Asks user to input a single letter if input doesn't match rules
                    else{
                        console.log("\n Please enter a single letter".red);
                        return false;
                    }
                }
            }
        ]).then(function(user){
            // Check user's guess and display word
            currentWord.checkGuess(user.guess);
            currentWord.displayWord();
            // Let the user know if their guess was correct or incorrect
            if(currentWord.checkGuess(user.guess)){
                console.log("CORRECT!".green);
            }
            else{
                // Decrease remaining guesses if incorrect and let user know their remaining guesses
                remainingGuesses--;
                console.log("INCORRECT! You have ".red + remainingGuesses + " guesses left!".red);
            }
            // Store user's guess in an array so it can't be repeated
            guessedLetters.push(user.guess.trim().toLowerCase());
            guessPrompt();
    
        })
    }
    else{
        // If the word has been guessed, let the user know and ask if they want to play again
        console.log("You guessed the word!".green);
        playAgain();
    }
}

// Function that asks user if they want to play again
function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to play again?",
            default: true
        }
    ]).then(function(user){
        // Start game over with a new word if they user confirms they want to play again
        if(user.confirm){
            firstGame = true;
            guessedLetters = [];
            remainingGuesses = 10;
            selectRandomWord();
            guessPrompt();
            if(usedWords.length === wordSelection.length){
                usedWords = [];
            }
        }
        // End game if the user does not want to play again
        else{
            console.log("Thank you for playing!".magenta);
        }
    })
}

selectRandomWord();
guessPrompt();
