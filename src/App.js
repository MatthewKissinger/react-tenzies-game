import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid";

export default function App() {

    const [dice, setDice] = React.useState(allNewDice());

    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        console.log("Dice state changed")
    }, [dice]);

    const dieElements = dice.map((die) => {
        return (
            <Die 
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={(event) => holdDice(event, die.id)}
            />
        )
    })

    function allNewDice() {
        const newDice = [];
        const length = 10;
        
        for (let i = 0; i < length; i++) {

            newDice.push({
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            });
        }
        return newDice;
    }

    function clickRoll() {
            setDice(oldDice => {
                return oldDice.map(die => {
                    return die.isHeld ? 
                    die : 
                    {...die, value: Math.floor(Math.random() * 6) + 1}
                })
            })
    }

    function holdDice(event, id) {

        setDice(oldDice => {
            return oldDice.map(die => {
                return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
            })
        })
    }

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dieElements}
            </div>
            <button className="roll-btn" onClick={clickRoll}>
                Roll
            </button>
        </main>
    )
}