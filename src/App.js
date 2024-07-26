import React from "react";
import PlayerController from "./components/PlayerController";
import NpcController from "./components/NpcController";
import MapBase from "./components/MapBase";
import PlayerStats from "./components/PlayerStats"
import NpcStats from "./components/NpcStats"
import "./App.css";
import '../src/index.css';

function App() {
  return (
    <div className="App">
      <p className="app-title">Game</p>
      <div className="component-map-stats">
        <div></div>
        <div></div>
        <MapBase />
        <PlayerStats />
        <div></div>
      </div>
      <div className="component-player-controller">
        <PlayerController />
        <NpcController />
      </div>
    </div>
  );
}

export default App;