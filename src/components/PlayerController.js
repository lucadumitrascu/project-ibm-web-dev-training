import React, { useEffect } from "react";
import { connect } from "react-redux";
import '../index.css';

const PlayerController = ({ setPlayerStyle, increaseX, increaseY, decreaseX, decreaseY, playerX, playerY }) => {

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
      }, 350);
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
      }, 350);
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
      }, 350);
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
      }, 350);
    }
  };

  return (
    <div>
      <div className="main-div-player-controller">
        <div className="secondary-div-player-controller">
          <div className="button-keypad" onClick={handleUpClick}>
            &#5123;
          </div>
        </div>

        <div className="secondary-div-player-controller">
          <div className="button-keypad" onClick={handleLeftClick}>
            &#5130;
          </div>
          <div className="button-keypad" onClick={handleDownClick}>
            &#5121;
          </div>
          <div className="button-keypad" onClick={handleRightClick}>
            &#5125;
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerX: state.player.playerX,
  playerY: state.player.playerY,
});

const mapDispatchToProps = (dispatch) => ({
  increaseX: () => dispatch({ type: "INCREASEX" }),
  decreaseX: () => dispatch({ type: "DECREASEX" }),
  increaseY: () => dispatch({ type: "INCREASEY" }),
  decreaseY: () => dispatch({ type: "DECREASEY" }),
  setPlayerStyle: (direction) => dispatch({ type: "SET_PLAYER_STYLE", payload: direction }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);