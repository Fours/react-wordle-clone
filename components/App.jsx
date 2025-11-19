import { useEffect, useState } from "react"
import Line from "./Line"
import words from "../util/words"

const MAX_WORD_LENGTH = 5;
const MAX_GUESS_COUNT = 6;

const wordList = words()
function randomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)]
}

export default function App() {        
    
    const [solution, setSolution] = useState(randomWord())
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    const isGameWon = guesses.includes(solution)
    const isGameOver = 
        isGameWon || guesses.length === MAX_GUESS_COUNT

    useEffect(() => {
        
        function eventListener(event) {
            if (event.keyCode >= 65 && event.keyCode <=  90) {
                setCurrentGuess(word => 
                    word.length >= MAX_WORD_LENGTH ? word : word + event.key.toLowerCase())
                setIsSubmitted(false)
            } else if (event.key === "Backspace") {
                setCurrentGuess(word => word.slice(0, -1))
            } else if (event.key === "Enter") {
                setIsSubmitted(true)
            }
        }

        window.addEventListener("keydown", eventListener)

        return () => {
            window.removeEventListener("keydown", eventListener)
        }
    }, [])

    if (isSubmitted){
        setGuesses(prev => [...prev, currentGuess])
        setCurrentGuess("")
        setIsSubmitted(false)
    }

    const emptyRowCount = 
        isGameOver ? MAX_GUESS_COUNT - guesses.length : MAX_GUESS_COUNT - guesses.length - 1

    function startNewGame() {
        setSolution(randomWord())
        setCurrentGuess("")
        setGuesses([])
    }

    return (
        <>
            <h1>WORDLE CLONE</h1>
            <p>Use keyboard to enter letters<br />and press Enter to submit word</p>
            <section>
                {isGameOver && !isGameWon ? 
                    <Line word={solution} solution={solution} isSubmitted={true} /> : null}
                {guesses.map((g, i) => 
                    <Line key={i} word={g} solution={solution} isSubmitted={true} />)}
                {!isGameOver ? 
                    <Line word={currentGuess.padEnd(5).slice(0, 5)} /> : null}
                {Array(emptyRowCount).fill(null).map((x, i) => {
                    return <Line key={i} word="     " />
                })}
                {isGameOver ? <button onClick={() => startNewGame()}>START NEW GAME</button> : null}                
            </section>
        </>
    )
}