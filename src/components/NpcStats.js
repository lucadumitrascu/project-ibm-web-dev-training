import React from "react";
import { connect } from "react-redux";

const NpcStats = ({ strength, hp }) => {
  return (
    <div>
      <div className="panel div-stats-npc-panel">
        <h1 className="panel-title h1-stats-npc-title">Enemy</h1>
        <div className="stat">
          <p className="stat-value p-stats-npc-hp">HP</p>
          <p className="stat-value p-stats-npc-hp-value">{hp}</p>
        </div>
        <div className="stat">
          <p className="stat-value p-stats-npc-str">STR</p>
          <p className="stat-value p-stats-npc-str-value">{strength}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  strength: state.npc.strength,
  hp: state.npc.hp
});

export default connect(mapStateToProps)(NpcStats);