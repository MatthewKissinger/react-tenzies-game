import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {

    // 1. Put Real Dots on the Dice -- DONE
    // 2. Track the Number of Rolls -- DONE
    // 3. Track the time it took to win -- DONE
    // 4. Save Number of Rolls and the Time it Took to win to LocalStorage
    // 5. Display get Data from LocalStorage and Display it for the User

    const [dice, setDice] = React.useState(allNewDice());

    const [tenzies, setTenzies] = React.useState(false);

    const [rolls, setRolls] = React.useState(0);

    const [timer, setTimer] = React.useState(0);

    React.useEffect(() => {
        if (!tenzies) {
          let sec = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
          }, 1000);
          return () => {
            clearInterval(sec);
          };
        } else {
          setTimer((prevTimer) => prevTimer);
        }
      }, [tenzies]);

    // check for game winning conditions
    React.useEffect(() => {

        // Bob's solution
        // const allHeld = dice.every(die => die.isHeld);
        // const firstValue = dice[0].value;
        // const allSameValue = dice.every(die => die.value === firstValue);

        const isHeldArray = dice.filter(die => {
            return die.isHeld;
        })

        const diceSameValueArray = dice.filter(die => {
            return die.value === dice[0].value;
        })

        if (isHeldArray.length === 10 && diceSameValueArray.length === 10) {
            setTenzies(true);
        }
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

    function clickRoll(e) {

        if (!tenzies) {
            setDice(oldDice => {
                return oldDice.map(die => {
                    return die.isHeld ? 
                    die : 
                    {...die, value: Math.floor(Math.random() * 6) + 1}
                })
            })

            setRolls(oldRolls => {
                return oldRolls + 1
            })
        } else {
            newGame();
        }
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

    function newGame() {
        setTenzies(false);
        setDice(allNewDice);
        setRolls(0);
        setTimer(0)
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="game-stats-container">
                <div className="timer">Time: {timer}</div>
                <h3 className="roll-counter"># of Rolls: {rolls}</h3>
            </div>
            <div className="dice-container">
                {dieElements}
            </div>
            <button className="roll-btn" onClick={clickRoll}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}