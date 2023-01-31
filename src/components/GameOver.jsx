import React, {useContext} from 'react'
import {AppContext} from '../App'

const GameOver = () => {
  const { gameOver, currAttempt, correctWord } = useContext(AppContext)

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    <div className='flex flex-col justify-center items-center pt-4 md:pt-10 space-y-2 md:space-y-4'>
      <h3 className='text-2xl font-bold'>{gameOver.guessedWord ? "You won the game!" : "You failed"}</h3>
      <h1 className='text-xl capitalize'>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (<h3 className='text-xl'>You guessed in {currAttempt.attempt} attempts</h3>)}
      <button className='bg-black text-white p-2 w-20 rounded-lg hover:scale-105'
      onClick={handleRestart}
      >
        Restart
      </button>
    </div>
  )
}

export default GameOver