const initialState = {
  quests: [
    {
      id: 0,
      quest: "Open the chest",
      progress: 0,
      done: false
    },
    {
      id: 1,
      quest: "Finish level 1",
      progress: 0,
      done: false
    },
    {
      id: 2,
      quest: "Finish level 2",
      progress: 0,
      done: false
    },
    {
      id: 3,
      quest: "Finish level 3",
      progress: 0,
      done: false
    },
    {
      id: 4,
      quest: "Finish level 4",
      progress: 0,
      done: false
    },
    {
      id: 5,
      quest: "Deal 1 critical hit",
      progress: 0,
      done: false
    },
    {
      id: 6,
      quest: "Defeat 5 enemies",
      progress: 0,
      done: false,
      target: 5
    }
  ]
};

const questControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUEST_DONE':
      return {
        ...state,
        quests: state.quests.map(quest =>
          quest.id === action.payload.id ? { ...quest, done: action.payload.value } : quest
        )
      };
    case 'SET_QUEST_PROGRESS':
      return {
        ...state,
        quests: state.quests.map(quest =>
          quest.id === action.payload.id ? { ...quest, progress: action.payload.value } : quest
        )
      };
    case 'INCREASE_QUEST_PROGRESS':
      return {
        ...state,
        quests: state.quests.map(quest =>
          quest.id === action.payload.id ? { ...quest, progress: quest.progress + action.payload.value } : quest
        )
      };
    case 'RESET_ALL_QUESTS':
      return {
        ...state,
        quests: state.quests.map(quest => ({
          ...quest,
          progress: 0,
          done: false
        }))
      };
    default:
      return state;
  }
};

export default questControllerReducer;