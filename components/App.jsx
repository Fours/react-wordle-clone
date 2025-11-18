import { useEffect, useState } from "react"

export default function App() {
    const [word, setWord] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        
        function eventListener(event) {
            if (event.keyCode >= 65 && event.keyCode <=  90) {
                setWord(word => word + event.key.toLowerCase())
                setIsSubmitted(false)
            } else if (event.key === "Backspace") {
                setWord(word => word.slice(0, -1))
            } else if (event.key === "Enter") {
                setIsSubmitted(true)
                setWord("")
            }
        }

        window.addEventListener("keydown", eventListener)

        return () => {
            window.removeEventListener("keydown", eventListener)
        }
    }, [])
    
    return (
        <>
            <h1>Wordle Clone</h1>
            <h2>{word.toUpperCase()}</h2>
            {isSubmitted ? <h2>Submitted</h2> : null}
        </>
    )  
}