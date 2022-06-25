import React from "react"
import Die from "./components/Die"

/**
 * Challenge: Create a `Roll Dice` button that will re-roll
 * all 10 dice
 * 
 * Clicking the button should generate a new array of numbers
 * and set the `dice` state to that new array (thus re-rendering
 * the array to the page)
 */

export default function App() {

    const [dice, setDice] = React.useState(allNewDice());

    const dieElements = dice.map((die, index) => {
        return (
            <Die 
                key={index}
                value={die}
            />
        )
    })

    function allNewDice() {
        const newDice = [];
        const length = 10;
        
        for (let i = 0; i < length; i++) {
            newDice.push(Math.floor(Math.random() * 6) + 1)
        }

        return newDice;
    }

    function clickRoll() {
        setDice(allNewDice())
    }

    return (
        <main>
            <div className="dice-container">
                {dieElements}
            </div>
            <button className="roll-btn" onClick={clickRoll}>
                Roll
            </button>
        </main>
    )
}