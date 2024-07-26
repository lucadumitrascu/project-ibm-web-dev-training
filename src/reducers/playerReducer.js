const initialState = {
  playerX: 5,
  playerY: 5,
  hp: 1,
  strength: 1,
  playerStyle: "player-down",
  playerCardStyle: "combat-card-container",
};

const playerControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_PLAYER_STR':
      return { ...state, strength: state.strength + 1 };
    case 'SET_PLAYER_HP':
      return { ...state, hp: action.payload.hp };
    case 'GET_DMG_PLAYER':
      return { ...state, hp: state.hp - action.payload.dmg };
    case 'SET_PLAYER_CARD_STYLE':
      return { ...state, playerCardStyle: action.payload.style };
    case "SET_PLAYER_STYLE":
      return { ...state, playerStyle: action.payload };
    case 'SET_PLAYER_X':
      return { ...state, playerX: action.payload.x };
    case 'SET_PLAYER_Y':
      return { ...state, playerY: action.payload.y };
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