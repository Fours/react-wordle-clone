import { useEffect, useState } from "react"
import Line from "./Line"

const MAX_WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export default function App() {
    const solution = "hello"
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

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
    
    return (
        <>
            <h1>WORDLE CLONE</h1>
            <section>
                {guesses.map((g, i) => 
                    <Line key={i} word={g} solution={solution} />)}
                <h2>{currentGuess.toUpperCase()}</h2>
                {isSubmitted ? <h2>Submitted</h2> : null}
            </section>
        </>
    )  
}