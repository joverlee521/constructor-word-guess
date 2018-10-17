// Construct for letters
function Letter(character) {
    this.character = character,
    this.guessed = false,
    // Method that displays the character or an underscore
    this.display = function(){
        // If the letter has been guessed, then return the character 
        if(this.guessed){
            return this.character.toUpperCase();
        }
        // If the letter has not been guessed, return an underscore;
        else{
            return "_";
        }
    },
    // Method that checks if the input is the same as this character
    this.checkLetter = function(input){
        // Changes guessed to true if the input matches the character
        if(input.toLowerCase() === this.character.toLowerCase()){
            this.guessed = true;
            return true;
        }
        else{
            return false;
        }
    }
}

// Exporting the Letter constructor so it can be used in word.js
module.exports = Letter;
