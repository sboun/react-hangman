import { useState,useEffect } from 'react'
import './App.css'
import GuessingForm from "./components/GuessingForm.jsx"
import HangmanWord from "./components/HangmanWord.jsx"
import IncorrectGuesses from "./components/IncorrectGuesses.jsx"


function getRandomWord(){
  return fetch("https://random-word-api.herokuapp.com/word")
    .then((response)=>response.json())
    .then((data)=>data[0])
    .catch((err)=>{
        console.log(err.message);
        alert("Error")
        return "default"
    })
}

export default function App() {
  const [word, setWord] = useState(""); //target word to guess
  const [guess,setGuess] = useState(""); //letter that user guesses
  const [wrongGuess,setWrongGuesses] = useState([]);
  const [correctGuess,setCorrectGuesses] = useState([]);

  //make sure word has value on app load
  useEffect(() => {
    async function fetchWord() {
      const newWord = await getRandomWord();
      setWord(newWord);
    }
    fetchWord();
  }, []);

  async function resetGame(){
    setWord(await getRandomWord());
    setWrongGuesses([]);
    setCorrectGuesses([]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!guess){return;}
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

  useEffect(()=>{
    if(wrongGuess.length >= 6){
      resetGame();
      alert("Game is over. Too many wrong guesses. Resetting game.");
    }
  },[wrongGuess]);

  return (
    <>
      <h1>Hangman 𖨆</h1>
      <HangmanWord word={word} correctGuess={correctGuess} resetGame={resetGame}/>
      <GuessingForm guess={guess} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <IncorrectGuesses wrongGuess={wrongGuess}/>
    </>
  )
}

