import React from "react";
import { connect } from "react-redux";
import '../index.css';

const PlayerController = ({ increaseX, increaseY, decreaseX, decreaseY, playerX, playerY }) => {

  return (
    <div>
      <p className="counter_title">Player positon: X:{playerX} Y:{playerY}</p>

      <div className="main-div">
        <div className="secondary-div">
          <button className="button-keypad" onClick={decreaseY}>
            UP
          </button>
        </div>

        <div className="secondary-div">
          <button className="button-keypad" onClick={decreaseX}>
            LEFT
          </button>
          <button className="button-keypad" onClick={increaseY}>
            DOWN
          </button>
          <button className="button-keypad" onClick={increaseX}>
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
});

const mapDispatchToProps = (dispatch) => ({
  increaseX: () => dispatch({ type: "INCREASEX" }),
  decreaseX: () => dispatch({ type: "DECREASEX" }),
  increaseY: () => dispatch({ type: "INCREASEY" }),
  decreaseY: () => dispatch({ type: "DECREASEY" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);