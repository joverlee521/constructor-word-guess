var Letter = require("./letter.js");
var inquirer = require("inquirer");
var alphabet = /[a-zA-Z]/;

function wordToArray(currentWord){
    var array = [];
    for(var i = 0; i < currentWord.length; i++){
        var letterObject = new Letter.letter(currentWord[i]);
        array.push(letterObject);
    }
    return array;
}

function Word(currentWord){
    this.wordArray = wordToArray(currentWord),
    this.displayWord = function(){
        var word = [];
        for(var i = 0; i < this.wordArray.length; i++){
            var letterString = this.wordArray[i].display();
            word.push(letterString);
        }
        console.log(word.join(" "));
    }
    this.checkGuess = function(input){
        for(var i = 0; i < this.wordArray.length; i++){
            this.wordArray[i].checkLetter(input);
        }
    }
}

// var dog = new Word("apple");

// inquirer.prompt([
//     {
//         type: "input",
//         name: "letter",
//         message: "Guess a letter!",
//         validate: function(input){
//             if(alphabet.test(input)) {
//                 return true;
//             }
//             else {
//                 console.log("\n Please enter a letter!");
//                 return false
//             }
//         }

//     }
// ]).then(function(input){
//     dog.checkGuess(input.letter)
//     dog.displayWord();
// })