const initialState = {
  playerX: 5,
  playerY: 5,
  hp: 100,
  strength: 1,
  playerStyle: "player-down"
};

const playerControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAYER_STYLE":
      return { ...state, playerStyle: action.payload };
    case "INCREASEX":
      return { ...state, playerX: state.playerX < 8 ? state.playerX + 1 : state.playerX };
    case "DECREASEX":
      return { ...state, playerX: state.playerX > 1 ? state.playerX - 1 : state.playerX };
    case "INCREASEY":
      return { ...state, playerY: state.playerY < 8 ? state.playerY + 1 : state.playerY };
    case "DECREASEY":
      return { ...state, playerY: state.playerY > 1 ? state.playerY - 1 : state.playerY };
    default:
      return state;
  }
};

export default playerControllerReducer;