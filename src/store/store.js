import { combineReducers, configureStore } from '@reduxjs/toolkit';
import playerControllerReducer from '../reducers/playerReducer.js';
import npcControllerReducer from '../reducers/npcReducer.js';
import mapControllerReducer from '../reducers/mapReducer.js';
import questControllerReducer from '../reducers/questReducer.js'

const store = configureStore({
  reducer:combineReducers({
    player: playerControllerReducer,
    npc: npcControllerReducer,
    map: mapControllerReducer,
    quest: questControllerReducer
  })
});

export default store;