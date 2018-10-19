# Guess the Movie
Command-line word guessing game that was created using constructors. 

## How to Play
* Navigate to the root of game in your terminal
* Start the game by entering `node index.js`
* The game will then print out a series of underscores to represent the movie title to be guessed and ask you to "Guess a letter:" 

  ![start-game-screenshot](../master/images/start-game.png)
* The game will only accept inputs that a single letter of the alphabet that has not already been guessed:

  ![input-validation](../master/images/input-validation.png)
* The game will alert whether your guess was correct or incorrect
    * You can make 10 incorrect guesses before the game is over
* When the word is guessed or when you run out of guesses, the game will ask if you want to play again:

  ![play-again](../master/images/play-again.png)
* If you choose to play again, the game will select a new movie title for you to guess
    * If all of the titles have been used, the game will ask if you want to play the whole game again

## Technologies Used
* JavaScript, Node.js
* [Inquirer](https://www.npmjs.com/package/inquirer)
