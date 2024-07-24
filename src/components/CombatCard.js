import React from "react";
import { connect } from "react-redux";
import playerCardImage from '../assets/playerStripes/playerDown.png';
import npcCardImage from '../assets/npcStripes/npcDown.png'

const CombatCard = ({ isPlayer, hpPlayer, hpNpc, strPlayer, strNpc, playerCardStyle, npcCardStyle }) => {

    const generateCard = () => {
        if (isPlayer) {
            return (
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
        } else {
            return (
                <div className={npcCardStyle}>
                    <img src={npcCardImage} alt="combat character" />

                    <div className="group-divs-hp-npc">
                        <p className="p-hp-npc">HP</p>
                        <div className="div-progress-hp-npc">
                            <div className="div-progres-bar-hp-npc">
                                {hpNpc}
                            </div>
                        </div>
                    </div>

                    <div className="group-divs-str-npc">
                        <p className="p-str-npc">STR</p>
                        <div className="div-progress-str-npc">
                            <div className="div-progres-bar-str-npc">
                                {strNpc}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            {generateCard()}
        </div>
    );
};
const mapStateToProps = (state) => ({
    hpPlayer: state.player.hp,
    strPlayer: state.player.strength,
    hpNpc: state.npc.hp,
    strNpc: state.npc.strength,
    npcCardStyle: state.npc.npcCardStyle,
    playerCardStyle: state.player.playerCardStyle,
});


export default connect(mapStateToProps)(CombatCard);