// src/reducers/index.js
const initialState = {
    playerX: 5,
    playerY: 5
  };
  
  const playerControllerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "INCREASEX":
        return { ...state, playerX: state.playerX + 1 };
      case "DECREASEX":
        return { ...state, playerX: state.playerX - 1 };
      case "INCREASEY":
        return { ...state, playerY: state.playerY + 1 };
      case "DECREASEY":
        return { ...state, playerY: state.playerY - 1 };
      default:
        return state;
    }
  };
  
  export default playerControllerReducer;