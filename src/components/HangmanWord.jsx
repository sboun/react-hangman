export default function HangmanWord({word,correctGuess,resetGame}){
    const guessArr = word.split("").map((letter)=>
        correctGuess.includes(letter) ? letter : "_");
    
    if(guessArr.join("") === word){
        resetGame();
        alert("Yay! You win. Resetting game.")
    }
    return(
        <div id="game">
        <h2>{guessArr.join(" ")}</h2>
        </div>
    )
}