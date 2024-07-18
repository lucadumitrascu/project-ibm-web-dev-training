const initialState = {
  npcX: 2,
  npcY: 2,
  hp: 100,
  strength: 1,
  npcStyle: "npc-down",
  time: 400,
};

const npcControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NPC_TIME':
      return { ...state, time: action.payload };
    case 'SET_NPC_X':
      return { ...state, npcX: action.payload };
    case 'SET_NPC_Y':
      return { ...state, npcY: action.payload };
    case "SET_NPC_STYLE":
      return { ...state, npcStyle: action.payload };
    case "npcINCREASEX":
      return { ...state, npcX: state.npcX < 8 ? state.npcX + 1 : state.npcX };
    case "npcDECREASEX":
      return { ...state, npcX: state.npcX > 1 ? state.npcX - 1 : state.npcX };
    case "npcINCREASEY":
      return { ...state, npcY: state.npcY < 8 ? state.npcY + 1 : state.npcY };
    case "npcDECREASEY":
      return { ...state, npcY: state.npcY > 1 ? state.npcY - 1 : state.npcY };
    default:
      return state;
  }
};

export default npcControllerReducer;