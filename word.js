var Letter = require("./letter.js");
var correctGuess = false;

function wordToArray(currentWord){
    var array = [];
    for(var i = 0; i < currentWord.length; i++){
        if(currentWord[i] !== " "){
            var letterObject = new Letter.letter(currentWord[i]);
            array.push(letterObject);
        }
        else{
            array.push(" ");
        }
    }
    return array;
}

function Word(currentWord){
    this.wordArray = wordToArray(currentWord),
    this.displayWord = function(){
        var word = [];
        for(var i = 0; i < this.wordArray.length; i++){
            if(this.wordArray[i] !== " "){
                var letterString = this.wordArray[i].display();
                word.push(letterString);
            }
            else{
                word.push(" ");
            }
        }
        console.log(word.join(" "));
    }
    this.checkGuess = function(input){
        correctGuess = false;
        for(var i = 0; i < this.wordArray.length; i++){
            if(this.wordArray[i] !== " "){
                if(this.wordArray[i].checkLetter(input)){
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

module.exports = {
    word: Word
}