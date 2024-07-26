import React from "react";
import { connect } from "react-redux";
import playerCardImage from '../assets/playerStripes/playerDown.png';
import npcCardImage from '../assets/npcStripes/npcDown.png';

const CombatCard = ({ npcId, isPlayer, hpPlayer, strPlayer, npcs, playerCardStyle, npcCardStyle }) => {

    const generatePlayerCard = () => (
        <div className={playerCardStyle}>
            <img src={playerCardImage} alt="combat character" />
            <div className="group-divs-hp-player">
                <p className="p-hp-player">HP</p>
                <div className="div-progress-hp-player">
                    <div className="div-progres-bar-hp-player">
                        {hpPlayer}
                    </div>
                </div>
            </div>
            <div className="group-divs-str-player">
                <p className="p-str-player">STR</p>
                <div className="div-progress-str-player">
                    <div className="div-progres-bar-str-player">
                        {strPlayer}
                    </div>
                </div>
            </div>
        </div>
    );

    const generateNpcCard = () => {
        const activeNpc = npcs.find(npc => npc.id === npcId);

        return activeNpc ? (
            <div key={activeNpc.id} className={npcCardStyle}>
                <img src={npcCardImage} alt="combat character" />
                <div className="group-divs-hp-npc">
                    <p className="p-hp-npc">HP</p>
                    <div className="div-progress-hp-npc">
                        <div className="div-progres-bar-hp-npc">
                            {activeNpc.hp}
                        </div>
                    </div>
                </div>
                <div className="group-divs-str-npc">
                    <p className="p-str-npc">STR</p>
                    <div className="div-progress-str-npc">
                        <div className="div-progres-bar-str-npc">
                            {activeNpc.strength}
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    };

    return (
        <div>
            {isPlayer ? generatePlayerCard() : generateNpcCard()}
        </div>
    );
};

const mapStateToProps = (state) => ({
    hpPlayer: state.player.hp,
    strPlayer: state.player.strength,
    npcs: state.npc.npcs,
    playerCardStyle: state.player.playerCardStyle,
    npcCardStyle: state.npc.npcCardStyle,
});

export default connect(mapStateToProps)(CombatCard);