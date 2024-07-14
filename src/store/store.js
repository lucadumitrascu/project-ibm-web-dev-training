import { combineReducers, configureStore } from '@reduxjs/toolkit';
import playerControllerReducer from '../reducers/playerReducer.js';
import npcControllerReducer from '../reducers/npcReducer.js';

const store = configureStore({
  reducer:combineReducers({
    player: playerControllerReducer,
    npc: npcControllerReducer
  })
});

export default store;