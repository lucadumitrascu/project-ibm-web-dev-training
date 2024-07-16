import React from "react";
import { connect } from "react-redux";
import '../index.css';

const PlayerStats = ({ playerX, playerY, hp, strength }) => {

  return (
    <div>
      <div className="div-stats-panel">
        <h1 className="h1-stats-title">Stats</h1>
        <div className="div-hp">
          <p className="p-stats-hp"> HP </p>
          <p className="p-stats-hp-value">{hp}</p>
        </div>
        <div className="div-str">
          <p className="p-stats-str"> STR </p>
          <p className="p-stats-str-value">{strength}</p>
        </div>
        <div className="div-stats-position">
          <p className="p-stats-position"> POS </p>
          <div className="div-stats-position-value">
            <p className="p-stats-position-x"> X: {playerX}</p>
            <p className="p-stats-position-y"> Y: {playerY}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerX: state.player.playerX,
  playerY: state.player.playerY,
  hp: state.player.hp,
  strength: state.player.strength
});


export default connect(mapStateToProps)(PlayerStats);