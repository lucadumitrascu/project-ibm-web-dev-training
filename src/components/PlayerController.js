//src/components/Counter.js
import React from "react";
import { connect } from "react-redux";
import '../index.css'

const PlayerController = ({ increaseX, increaseY, decreaseX, decreaseY, playerX, playerY }) => {

  return (
    <div>

      <div className="div-group-title-components">
        <p className="title-player-controller">Player position:</p>
        <p className="title-player-controller-x"> X:{playerX}</p>
        <p className="title-player-controller-y"> Y:{playerY}</p>
      </div>

      <div className="main-div-player-controller">

        <div className="secondary-div-player-controller">
          <button className="button-keypad" onClick={decreaseY} disabled={playerY === 0}>
            UP
          </button>
        </div>

        <div className="secondary-div-player-controller">
          <button className="button-keypad" onClick={decreaseX} disabled={playerX === 0}>
            LEFT
          </button>
          <button className="button-keypad" onClick={increaseY} disabled={playerY === 9}>
            DOWN
          </button>
          <button className="button-keypad" onClick={increaseX} disabled={playerX === 9}>
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