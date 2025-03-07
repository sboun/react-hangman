export default function IncorrectGuesses({wrongGuess}){
    return(
        <div id="incorrectGuesses">
            <h3>Incorrectly Guessed Letters</h3>
            <h2>{wrongGuess.join(" ")}</h2>
        </div>
    )
}
