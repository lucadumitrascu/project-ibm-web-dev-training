const initialState = {
  npcX: 2,
  npcY: 2,
};

const npcControllerReducer = (state = initialState, action) => {
  switch (action.type) {
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