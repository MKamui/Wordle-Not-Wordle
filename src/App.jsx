import React, {useState, createContext, useEffect } from 'react'
import Board from './components/Board'
import GameOver from './components/GameOver'
import Keyboard from './components/Keyboard'
import { boardDefault, generateWordSet } from './Words'
import Swal from 'sweetalert2'

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [correctWord, setCorrectWord] = useState("")
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })
  }, [])
  

  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if(currAttempt.letterPos !== 5) return

    let currWord = ""
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i].toLowerCase()
    }

    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0})
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This is not a word!',
      })
    }

    if(currWord === correctWord){
      setGameOver({gameOver: true, guessedWord: true})
      return
    }

    if(currAttempt.attempt === 5){
      setGameOver({gameOver: true, guessedWord: false})
    }
  }

  return (
    <div className='text-center bg-slate-200 h-screen w-screen'>
      <nav className='bg-black text-white justify-center h-10 items-center flex text-2xl'>
        <h1>Wordle Not Wordle</h1>
      </nav>
      <AppContext.Provider 
        value={{
          board, 
          setBoard, 
          currAttempt, 
          setCurrAttempt, 
          onSelectLetter, 
          onDelete, 
          onEnter, 
          correctWord, 
          disabledLetters, 
          setDisabledLetters,
          gameOver,
          setGameOver
        }}>
        <Board />
        {gameOver.gameOver ? <GameOver/> : <Keyboard />}
      </AppContext.Provider>
    </div>
  )
}

export default App
