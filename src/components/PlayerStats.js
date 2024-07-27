import React from "react";
import { connect } from "react-redux";

const PlayerStats = ({ playerX, playerY, hp, strength, mapIndex }) => {

  return (
    <div>
      <div className="div-stats-player-panel">
        <h1 className="h1-stats-player-title">Player</h1>
        <div className="div-hp">
          <p className="p-stats-player-hp"> HP </p>
          <p className="p-stats-player-hp-value">{hp}</p>
        </div>
        <div className="div-str">
          <p className="p-stats-player-str"> STR </p>
          <p className="p-stats-player-str-value">{strength}</p>
        </div>
        <div className="div-stats-player-position">
          <p className="p-stats-player-position"> POS </p>
          <div className="div-stats-player-position-value">
            <p className="p-stats-player-position-x"> X: {playerX}</p>
            <p className="p-stats-player-position-y"> Y: {playerY}</p>
          </div>
        </div>
        <div className="div-stats-player-level">
          <p className="p-stats-player-level"> LEVEL </p>
          <p className="p-stats-player-level-value">{mapIndex+1}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerX: state.player.playerX,
  playerY: state.player.playerY,
  hp: state.player.hp,
  strength: state.player.strength,
  mapIndex: state.map.mapIndex
});


export default connect(mapStateToProps)(PlayerStats);