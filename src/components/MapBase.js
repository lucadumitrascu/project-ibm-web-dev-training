import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import store from '../store/store';
import { createRoot } from "react-dom/client";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CombatCard from "./CombatCard";

const MapBase = ({
  npcs, playerStyle, playerX, playerY, removeNpc,setPlayerX, setPlayerY, setNpcX, setNpcY,
  setNpcTime, hpPlayer, strPlayer, getDmgPlayer, getDmgNpc, setPlayerHP, setNpcHP, 
  increasePlayerStr, setPlayerCardStyle, setNpcCardStyle
}) => {
  const MySwal = withReactContent(Swal);
  const endCombatSwal = withReactContent(Swal);
  const hpPlayerRef = useRef(hpPlayer);
  const hpNpcRefs = useRef({});

  useEffect(() => {
    hpPlayerRef.current = hpPlayer;
    npcs.forEach(npc => {
      hpNpcRefs.current[npc.id] = npc.hp;
    });
  }, [hpPlayer, npcs]);

  useEffect(() => {
    npcs.forEach(npc => {
      if (npc.npcX === playerX && npc.npcY === playerY) {
        let strNpc = npc.strength;
        setNpcX(npc.id, 8);
        setNpcY(npc.id, 1);
        setPlayerX(1);
        setPlayerY(8);
        setNpcTime(5000000);
        MySwal.fire({
          title: 'Combat!',
          html: `<div class="modal-div">
                 <div id="combat-card-player"></div>
                 <div class="div-group-middle-section">
                 <div class="div-combat-zone">
                    <div class="div-player" id="div-player"> </div>
                    <div class="div-npc" id="div-npc"> </div>
                 </div>
                 <button id="defend-button" class="modal-button-defend">Defend</button>
                 <button id="attack-button" class="modal-button-attack">Attack</button>
                 </div>
                 <div id="combat-card-npc"></div>
                 </div>`,
          customClass: {
            popup: 'modal'
          },
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            let playerCardContainer = document.getElementById("combat-card-player");
            let npcCardContainer = document.getElementById("combat-card-npc");

            if (playerCardContainer && npcCardContainer) {
              const playerCardRoot = createRoot(playerCardContainer);
              const npcCardRoot = createRoot(npcCardContainer);

              playerCardRoot.render(
                <Provider store={store}>
                  <CombatCard npcId={0} isPlayer={true} />
                </Provider>
              );
              npcCardRoot.render(
                <Provider store={store}>
                  <CombatCard npcId={npc.id} isPlayer={false} />
                </Provider>
              );
            }

            let firstEntry = true;
            let defendClicked = false;
            let attackClicked = false;
            let defendButton = document.getElementById('defend-button');
            let attackButton = document.getElementById('attack-button');
            let divPlayer = document.getElementById('div-player');
            let divNpc = document.getElementById('div-npc');
            let stopGame = false;

            const enterCombatMode = (attackInterval) => {
              defendButton.disabled = true;
              attackButton.disabled = true;

              const performNPCAttack = () => {
                defendButton.disabled = false;
                setNpcCardStyle('combat-card-container combat-card-npc-pre-attack');

                setTimeout(() => {
                  setNpcCardStyle('combat-card-container');
                  divNpc.classList.add('div-npc-attack');

                  if (!defendClicked) {
                    setTimeout(() => {
                      divPlayer.classList.add('div-player-damage');
                      getDmgPlayer(strNpc * Math.floor(Math.random() * 5 + 1));
                    }, 150);

                    setTimeout(() => {
                      setPlayerCardStyle('combat-card-container combat-card-player-damage');
                    }, 150);
                  } else {
                    setTimeout(() => {
                      divPlayer.classList.add("div-player-defense");
                    }, 250);
                    setTimeout(() => {
                      setPlayerCardStyle('combat-card-container combat-card-player-defense');
                    }, 150);
                  }

                  setTimeout(() => {
                    setPlayerCardStyle('combat-card-container');
                    if (hpPlayerRef.current <= 0) {
                      stopGame = true;

                      endCombatSwal.fire({
                        title: 'You died!',
                        confirmButtonText: 'Continue',
                        showConfirmButton: true,
                        customClass: {
                          popup: 'modal-end-combat'
                        },
                      }).then(() => {
                        setPlayerHP(20);
                        setNpcHP(npc.id, 20);
                        setNpcTime(400);
                      });
                    }
                    setTimeout(() => {
                      divNpc.classList.remove('div-npc-attack');
                      divPlayer.classList.remove('div-player-damage');
                      divPlayer.classList.remove("div-player-defense");
                    }, 100);

                    if (!stopGame) {
                      let newAttackInterval = Math.floor(Math.random() * 2000 + 1000);
                      setTimeout(performPlayerAttack, newAttackInterval);
                      defendButton.disabled = true;
                      defendClicked = false;
                    }
                  }, 500);
                }, 250);
              };

              const performPlayerAttack = () => {
                attackButton.disabled = false;
                setPlayerCardStyle('combat-card-container combat-card-player-pre-attack');

                setTimeout(() => {
                  setPlayerCardStyle('combat-card-container');
                  divPlayer.classList.add('div-player-attack');

                  if (!attackClicked) {
                    setTimeout(() => {
                      divNpc.classList.add('div-npc-defense');
                    }, 250);

                    setTimeout(() => {
                      setNpcCardStyle('combat-card-container combat-card-npc-defense');
                    }, 150);
                  } else {
                    setTimeout(() => {
                      divNpc.classList.add("div-npc-damage");
                      getDmgNpc(npc.id, strPlayer * Math.floor(Math.random() * 5 + 1));
                    }, 150);
                    setTimeout(() => {
                      setNpcCardStyle('combat-card-container combat-card-npc-damage');
                    }, 150);
                  }

                  setTimeout(() => {
                    setNpcCardStyle('combat-card-container');
                    if (hpNpcRefs.current[npc.id] <= 0) {
                      stopGame = true;
                      endCombatSwal.fire({
                        title: 'You Win!',
                        text: 'Your strength will be increased by 1!',
                        confirmButtonText: 'Continue',
                        showConfirmButton: true,
                        customClass: {
                          popup: 'modal-end-combat'
                        },
                      }).then(() => {
                        setPlayerHP(20);
                        removeNpc(npc.id);
                        increasePlayerStr();
                        setNpcTime(400);
                      });
                    }

                    setTimeout(() => {
                      divPlayer.classList.remove('div-player-attack');
                      divNpc.classList.remove('div-npc-damage');
                      divNpc.classList.remove('div-npc-defense');
                    }, 100);

                    if (!stopGame) {
                      let newAttackInterval = Math.floor(Math.random() * 2000 + 1000);
                      setTimeout(performNPCAttack, newAttackInterval);
                      attackButton.disabled = true;
                      attackClicked = false;
                    }
                  }, 500);
                }, 250);
              };

              if (firstEntry) {
                setTimeout(() => {
                  firstEntry = false;
                  performNPCAttack();
                }, attackInterval);
              }
            };
          
            enterCombatMode(2000);

            attackButton.addEventListener('click', () => {
              attackClicked = true;
            });

            defendButton.addEventListener('click', () => {
              defendClicked = true;
            });
          }
        });
      }
    });
  },);

  const createMapMatrix = () => {
    const size = 10;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) { // First and last column
      matrix[i][0] = 1;
      matrix[i][size - 1] = 1;
    }
    for (let j = 0; j < size; j++) { // First and last row
      matrix[0][j] = 1;
      matrix[size - 1][j] = 1;
    }

    matrix[playerY][playerX] = 2;
    npcs.forEach(npc => {
      matrix[npc.npcY][npc.npcX] = 3;
    });

    return matrix;
  };

  const matrix = createMapMatrix();

  const renderTable = () => {
    return matrix.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, colIndex) => {
          let className = "";

          if (cell === 1) {
            className = "map-border";
          } else if (cell === 2) {
            className = playerStyle;
          } else if (cell === 3) {
            const npc = npcs.find(npc => npc.npcY === rowIndex && npc.npcX === colIndex);
            className = npc ? npc.npcStyle : "";
          }

          return <td key={colIndex} className={className}></td>;
        })}
      </tr>
    ));
  };

  return (
    <div className="main-div-map">
      <table className="map-table">
        <tbody>
          {renderTable()}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerX: state.player.playerX,
  playerY: state.player.playerY,
  npcs: state.npc.npcs,
  playerStyle: state.player.playerStyle,
  hpPlayer: state.player.hp,
  strPlayer: state.player.strength,
});

const mapDispatchToProps = (dispatch) => ({
  setNpcX: (id,x) => dispatch({ type: "SET_NPC_X", payload: { id, x } }),
  setNpcY: (id,y) => dispatch({ type: "SET_NPC_Y", payload: { id, y } }),
  setPlayerX: (x) => dispatch({ type: "SET_PLAYER_X", payload: { x } }),
  setPlayerY: (y) => dispatch({ type: "SET_PLAYER_Y", payload: { y } }),
  setNpcTime: (time) => dispatch({ type: "SET_NPC_TIME", payload: { time } }),
  getDmgPlayer: (dmg) => dispatch({ type: "GET_DMG_PLAYER", payload: { dmg } }),
  getDmgNpc: (id, dmg) => dispatch({ type: "GET_DMG_NPC", payload: { id, dmg } }),
  setPlayerHP: (hp) => dispatch({ type: "SET_PLAYER_HP", payload: { hp } }),
  setNpcHP: (id, hp) => dispatch({ type: "SET_NPC_HP", payload: { id, hp } }),
  increasePlayerStr: () => dispatch({ type: "INCREASE_PLAYER_STR" }),
  setNpcCardStyle: (style) => dispatch({ type: "SET_NPC_CARD_STYLE", payload: {style} }),
  setPlayerCardStyle: (style) => dispatch({ type: "SET_PLAYER_CARD_STYLE", payload: {style} }),
  removeNpc: (id) => dispatch({ type: "REMOVE_NPC", payload: { id } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);