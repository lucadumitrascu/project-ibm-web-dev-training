// src/reducers/index.js
const initialState = {
    playerX: 0,
    playerY: 0
  };
  
  const counterReducer = (state = initialState, action) => {
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
  
  export default counterReducer;