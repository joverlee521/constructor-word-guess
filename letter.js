

function Letter(character) {
    this.character = character,
    this.guessed = false,
    this.display = function(){
        if(this.guessed){
            return this.character;
        }
        else{
            return "_";
        }
    },
    this.checkLetter = function(input){
        if(input.toLowerCase() === this.character.toLowerCase()){
            this.guessed = true;
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports = {
    letter: Letter
}
