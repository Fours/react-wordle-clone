export default function Line({ word, solution = "", isSubmitted = false }) {
    
    return (
        <div className="line">            
            {word.split("").map((letter, index) => {
                
                let extraClass = ""
                if (isSubmitted) {
                    extraClass = "guessed"
                    if (solution[index] === letter){
                        extraClass = "correct-spot"
                    } else if (solution.split("").includes(letter)) {
                        extraClass = "correct-letter"
                    }
                }
                
                return <div key={index} className={`letter ${extraClass}`}>{letter}</div>
            })}
        </div>
    )

}