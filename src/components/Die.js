import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die" 
            style={styles}
            onClick={props.holdDice}>
            {/* {props.value} */}

            {props.value === 1 && 
            <div className="one-dot">
                <div className="dot"></div>
            </div>}

            {props.value === 2 && 
            <div className="two-dots">
                <div className="dot"></div>
                <div className="dot"></div>
            </div>}

            {props.value === 3 && 
            <div className="three-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>}

            {props.value === 4 && 
            <div className="four-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>}

            {props.value === 5 && 
            <div className="five-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>}

            {props.value === 6 && 
            <div className="six-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>}

        </div>
    )
}