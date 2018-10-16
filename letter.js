

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
        if(input === this.character){
            this.guessed = true;
        }
    }
}

module.exports = {
    letter: Letter
}
