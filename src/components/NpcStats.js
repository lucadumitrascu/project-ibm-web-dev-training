import React from "react";
import { connect } from "react-redux";
import '../index.css';

const NpcStats = ({ npcX, npcY, hp, strength }) => {

    return (
      <div>
        <div className="div-stats-npc-panel">
          <h1 className="h1-stats-npc-title">NPC</h1>
          <div className="div-hp">
            <p className="p-stats-npc-hp">HP</p>
            <p className="p-stats-npc-hp-value">{hp}</p>
          </div>
          <div className="div-str">
            <p className="p-stats-npc-str">STR</p>
            <p className="p-stats-npc-str-value">{strength}</p>
          </div>
          <div className="div-stats-npc-position">
            <p className="p-stats-npc-position">POS</p>
            <div className="div-stats-npc-position-value">
              <p className="p-stats-npc-position-x"> X: {npcX}</p>
              <p className="p-stats-npc-position-y"> Y: {npcY}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
    npcX: state.npc.npcX,
    npcY: state.npc.npcY,
    hp: state.npc.hp,
    strength: state.npc.strength
});


export default connect(mapStateToProps)(NpcStats);