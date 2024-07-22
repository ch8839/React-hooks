import React, { useEffect } from 'react'
import Grid from './Grid' 

import useWordle from './useWordle'

import './index.css'

interface ICaptchaInputProps {
  value?: string
  length?: number
  autoFocus?: boolean
  onChange?: Function
}

const WordleGame = (props: ICaptchaInputProps) => {
  const words = 'REACT'
  const { currentGuess, guesses, turn, isCorrect, handleKeyup } = useWordle(words)
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => alert('true'), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5) {
      setTimeout(() => alert('over'), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return  (
    <div>
      <h1>Wordle Game</h1>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
    </div>
  )
}

export default WordleGame