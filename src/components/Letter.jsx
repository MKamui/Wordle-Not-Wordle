import React, {useContext, useEffect} from 'react'
import {AppContext} from '../App'

const Letter = ({letterPos, attemptVal}) => {
  const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext)
  const letter = board[attemptVal][letterPos]

  const correct = correctWord.toUpperCase()[letterPos] === letter
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter)

  const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error")

  useEffect(() => {
  if(letter !== "" && !correct && !almost){
    setDisabledLetters((prev) => [...prev, letter])
  }
  }, [currAttempt.attempt])
  

  return (
    <div className='h-12 w-12 md:h-20 md:w-20 border border-gray-600 m-1 grid items-center text-xl rounded-xl' id={letterState}>
      {letter}
    </div>
  )
}

export default Letter