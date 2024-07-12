import React from "react";
import PlayerController from "./components/PlayerController";
import MapBase from "./components/MapBase";
import "./App.css";

function App() {
  return (
    <div className="App">
      <p className="app-title">Game</p>
      <div className="component-map">
      <MapBase />
      </div>
      <div>
      <PlayerController className="component-player-controller"/>
      </div>
    </div>
  );
}

export default App;