// Requiring the Letter constructor function that was exported from letter.js
var Letter = require("./letter");

// Constructor for words
function Word(){
    this.wordArray = [],
    // Method that changes selected word into in an array of Letter objects
    this.wordToArray = function(currentWord){
        for(var i = 0; i < currentWord.length; i++){
            // Only create a letter object if it is not a space 
            if(currentWord[i] !== " "){
                var letterObject = new Letter(currentWord[i]);
                this.wordArray.push(letterObject);
            }
            else{
                this.wordArray.push(" ");
            }
        }
    }
    // Method that displays this word
    this.displayWord = function(){
        // Empty array to hold the letter and underscores
        var word = [];
        // Loop through the word and call on display function for each letter
        for(var i = 0; i < this.wordArray.length; i++){
            // Only displays letter or underscore if it is not a space
            if(this.wordArray[i] !== " "){
                var letterString = this.wordArray[i].display();
                word.push(letterString);
            }
            else{
                word.push(" ");
            }
        }
        // Displays word array as a string
        console.log(word.join(" "));
    }
    // Method that checks if user input matches any letters of the word
    this.checkGuess = function(input){
        // Flag to track if any letters were guessed
        var correctGuess = false;
        // Loop through word and call on check letter function for each letter
        for(var i = 0; i < this.wordArray.length; i++){
            if(this.wordArray[i] !== " "){
                if(this.wordArray[i].checkLetter(input)){
                    // if any were guessed mark it as a correct guess
                    correctGuess = true;
                }
            }
        }
        if(correctGuess){
            return true;
        }
        else{
            return false;
        }
    }
}

// Exporting the Word constructor to use in index.js
module.exports = Word;