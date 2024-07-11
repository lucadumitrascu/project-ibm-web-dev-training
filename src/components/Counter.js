//src/components/Counter.js
import React from "react";
import { connect } from "react-redux";

const Counter = ({ increaseX, increaseY, decreaseX, decreaseY, playerX, playerY }) => {


  return (
    <div>
      <p className="counter_title">Player positon: X:{playerX} Y:{playerY}</p>

      <div className="main-div">
        <div className="secondary-div">
        <button className="button-keypad" onClick={increaseY}>
            UP
        </button>
        </div>
        
        <div className="secondary-div">
        <button className="button-keypad" onClick={increaseX}>
            LEFT
        </button>
        <button className="button-keypad" onClick={decreaseY}>
            DOWN
        </button>
        <button className="button-keypad" onClick={decreaseX}>
            RIGHT
        </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerX: state.playerX,
  playerY: state.playerY
  //  Use 'counter: state.counter.counter' and replace the above line if you are using combineReducers to ensure that 'counter' matches the correct key in your store.
});

const mapDispatchToProps = (dispatch) => ({
    increaseX: () => dispatch({ type: "INCREASEX" }),
    decreaseX: () => dispatch({ type: "DECREASEX" }),
    increaseY: () => dispatch({ type: "INCREASEY" }),
    decreaseY: () => dispatch({ type: "DECREASEY" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);