import React, { useEffect } from "react";
import { connect } from "react-redux";
import '../index.css';

const PlayerController = ({ setPlayerStyle, increaseX, increaseY, decreaseX, decreaseY, playerX, playerY, hp, strength }) => {

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          handleUpClick();
          break;
        case "ArrowDown":
          handleDownClick();
          break;
        case "ArrowLeft":
          handleLeftClick();
          break;
        case "ArrowRight":
          handleRightClick();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  },);

  let clicked = false;
  const handleUpClick = () => {
    if (!clicked && playerY > 1) {
      clicked = true;
      setPlayerStyle("player-up-anim");
      setTimeout(() => {
        decreaseY();
        setPlayerStyle("player-up");
        clicked = false;
      }, 500);
    }
  };

  const handleDownClick = () => {
    if (!clicked && playerY < 8) {
      clicked = true;
      setPlayerStyle("player-down-anim");
      setTimeout(() => {
        increaseY();
        setPlayerStyle("player-down");
        clicked = false;
      }, 500);
    }
  };

  const handleLeftClick = () => {
    if (!clicked && playerX > 1) {
      clicked = true;
      setPlayerStyle("player-left-anim");
      setTimeout(() => {
        decreaseX();
        setPlayerStyle("player-left");
        clicked = false;
      }, 500);
    }
  };

  const handleRightClick = () => {
    if (!clicked && playerX < 8) {
      clicked = true;
      setPlayerStyle("player-right-anim");
      setTimeout(() => {
        increaseX();
        setPlayerStyle("player-right");
        clicked = false;
      }, 500);
    }
  };

  return (
    <div>
      <div className="div-group-title-components">
        <p className="title-player-controller">Player position:</p>
        <p className="title-player-controller-x"> X: {playerX}</p>
        <p className="title-player-controller-y"> Y: {playerY}</p>
        <p className="title-player-controller-x"> HP: {hp}</p>
        <p className="title-player-controller-y"> Strength: {strength}</p>
      </div>

      <div className="main-div-player-controller">
        <div className="secondary-div-player-controller">
          <div className="button-keypad" onClick={handleUpClick}>
            UP
          </div>
        </div>

        <div className="secondary-div-player-controller">
          <div className="button-keypad" onClick={handleLeftClick}>
            LEFT
          </div>
          <div className="button-keypad" onClick={handleDownClick}>
            DOWN
          </div>
          <div className="button-keypad" onClick={handleRightClick}>
            RIGHT
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerX: state.player.playerX,
  playerY: state.player.playerY,
  hp: state.player.hp,
  strength: state.player.strength
});

const mapDispatchToProps = (dispatch) => ({
  increaseX: () => dispatch({ type: "INCREASEX" }),
  decreaseX: () => dispatch({ type: "DECREASEX" }),
  increaseY: () => dispatch({ type: "INCREASEY" }),
  decreaseY: () => dispatch({ type: "DECREASEY" }),
  setPlayerStyle: (direction) => dispatch({ type: "SET_PLAYER_STYLE", payload: direction }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);