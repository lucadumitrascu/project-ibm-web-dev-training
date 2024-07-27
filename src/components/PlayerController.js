import React, { useEffect } from "react";
import { connect } from "react-redux";

const PlayerController = ({ setPlayerStyle, increaseX, increaseY, decreaseX, decreaseY, playerX, playerY, maps, mapIndex }) => {

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
    if (playerY > 0) {
      if (!clicked && (maps[mapIndex].matrix[playerY - 1][playerX] === 0 || maps[mapIndex].matrix[playerY - 1][playerX] === 2)) {
        clicked = true;
        setPlayerStyle("player-up-anim");
        setTimeout(() => {
          decreaseY();
          setPlayerStyle("player-up");
          clicked = false;
        }, 400);
      }
    }
  };

  const handleDownClick = () => {
    if (playerY < 9) {
      if (!clicked && (maps[mapIndex].matrix[playerY + 1][playerX] === 0 || maps[mapIndex].matrix[playerY+1][playerX] === 2)) {
        clicked = true;
        setPlayerStyle("player-down-anim");
        setTimeout(() => {
          increaseY();
          setPlayerStyle("player-down");
          clicked = false;
        }, 400);
      }
    }
  };

  const handleLeftClick = () => {
    if (playerX > 0) {
      if (!clicked && (maps[mapIndex].matrix[playerY][playerX - 1] === 0 || maps[mapIndex].matrix[playerY][playerX-1] === 2)) {
        clicked = true;
        setPlayerStyle("player-left-anim");
        setTimeout(() => {
          decreaseX();
          setPlayerStyle("player-left");
          clicked = false;
        }, 400);
      }
    }
  };

  const handleRightClick = () => {
    if (playerX < 9) {
      if (!clicked && (maps[mapIndex].matrix[playerY][playerX + 1] === 0 || maps[mapIndex].matrix[playerY][playerX+1] === 2)) {
        clicked = true;
        setPlayerStyle("player-right-anim");
        setTimeout(() => {
          increaseX();
          setPlayerStyle("player-right");
          clicked = false;
        }, 400);
      }
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
  maps: state.map.maps,
  mapIndex: state.map.mapIndex
});

const mapDispatchToProps = (dispatch) => ({
  increaseX: () => dispatch({ type: "INCREASEX" }),
  decreaseX: () => dispatch({ type: "DECREASEX" }),
  increaseY: () => dispatch({ type: "INCREASEY" }),
  decreaseY: () => dispatch({ type: "DECREASEY" }),
  setPlayerStyle: (direction) => dispatch({ type: "SET_PLAYER_STYLE", payload: direction }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);