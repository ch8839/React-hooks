import { useState } from 'react'

const useWordle = (words: string) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState<Array<string>>([])
  const [isCorrect, setIsCorrect] = useState(false)

  const formatGuess = () => {
    let formattedGuess = Array.from(currentGuess).map((item, index) => {
      if (item == words[index]) {
        return { key: item, color: 'green' }
      } else {
        const wordsIndex = words.indexOf(item)
        if (~wordsIndex) {
          return { key: item, color: 'yellow' }
        } else {
          return { key: item, color: 'gray' }
        }
      }
    })

    console.log('>>>formattedGuess', formattedGuess, words)

    return formattedGuess
  }

  const addNewGuess = (
    formattedGuess: Array<{ color: string; key: string }>
  ) => {
    if (currentGuess === words) {
      setIsCorrect(true)
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]
    })
    setTurn((prevTurn) => {
      return prevTurn + 1
    })
    setCurrentGuess('')
  }

  const handleKeyup = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      if (turn > 5) {
        console.log('you used all your guesses!')
        return
      }
      if (history.includes(currentGuess)) {
        console.log('you already tried that word.')
        return
      }
      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars.')
        return
      }
      const formatted = formatGuess()
      addNewGuess(formatted)
    }
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toUpperCase())
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, handleKeyup }
}

export default useWordle
