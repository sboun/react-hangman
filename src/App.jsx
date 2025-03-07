import { useState } from 'react'
import './App.css'
import words from "./assets/words.json"
import GuessingForm from "./components/GuessingForm.jsx"
import HangmanWord from "./components/HangmanWord.jsx"
import IncorrectGuesses from "./components/IncorrectGuesses.jsx"


function getRandomWord(){
  const length = words.length;
  let randomInt = Math.floor(Math.random()*length);
  return words[randomInt];  
}

export default function App() {
  const [word, setWord] = useState(getRandomWord()); //target word to guess
  const [guess,setGuess] = useState(""); //letter that user guesses
  const [wrongGuess,setWrongGuesses] = useState([]);
  const [correctGuess,setCorrectGuesses] = useState([]);

  function resetGame(){
    setWord(getRandomWord());
    setWrongGuesses([]);
    setCorrectGuesses([]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(wrongGuess.includes(guess) || correctGuess.includes(guess)){
      alert("Letter already guessed");
    } else if(word.includes(guess)){
      console.log("correct guess");
      setCorrectGuesses([...correctGuess,guess])
    } else{
      console.log("wrong guess");
      setWrongGuesses([...wrongGuess,guess]);
    }
    setGuess("");
  }

  const handleChange = (e) => {
    setGuess(e.target.value);
  }

  if(wrongGuess.length >= 6){
    resetGame();
    alert("Game is over. Too many wrong guesses. Resetting game.");
  }

  return (
    <>
      <h1>Hangman 𖨆</h1>
      <HangmanWord word={word} correctGuess={correctGuess} resetGame={resetGame}/>
      <GuessingForm guess={guess} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <IncorrectGuesses wrongGuess={wrongGuess}/>
    </>
  )
}

