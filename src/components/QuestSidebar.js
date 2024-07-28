import React from "react";
import { connect } from "react-redux";

const QuestsSidebar = ({ quests }) => {
  return (
    <div>
      <div className="panel div-stats-quest-panel">
        <h1 className="panel-title h1-stats-npc-title">Quests</h1>
        {quests.map((quest) => (
          <div key={quest.id} className="stat div-quest">
            <p className="stat-value p-quest-title">{quest.quest}</p>
            <p className="stat-value p-quest-progress">
              Progress: {quest.progress}/{quest.target ? quest.target : 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quests: state.quest.quests,
});

export default connect(mapStateToProps)(QuestsSidebar);