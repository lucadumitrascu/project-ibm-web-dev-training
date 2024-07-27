import React from "react";
import { connect } from "react-redux";

const NpcStats = ({strength }) => {

  return (
    <div>
      <div className="div-stats-npc-panel">
        <h1 className="h1-stats-npc-title">Enemy</h1>
        <div className="div-hp">
          <p className="p-stats-npc-hp">HP</p>
          <p className="p-stats-npc-hp-value">10</p>
        </div>
        <div className="div-str">
          <p className="p-stats-npc-str">STR</p>
          <p className="p-stats-npc-str-value">{strength}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  strength: state.npc.strength
});


export default connect(mapStateToProps)(NpcStats);