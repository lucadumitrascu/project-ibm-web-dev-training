import React from "react";
import PlayerController from "./components/PlayerController";
import MapBase from "./components/MapBase";
import "./App.css";

function App() {
  return (
    <div className="App">
      <p className="app-title">Game</p>
      <div>
        <MapBase />
      </div>
      <div>
        <PlayerController />
      </div>
    </div>
  );
}

export default App;