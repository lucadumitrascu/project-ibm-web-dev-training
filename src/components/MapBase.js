import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import '../index.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CombatCard from "./CombatCard";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from '../store/store';

const MapBase = ({
  npcStyle, playerStyle, playerX, playerY, npcX, npcY,
  setNpcX, setNpcY, setPlayerX, setPlayerY, setNpcTime,
  hpPlayer, hpNpc, strPlayer, strNpc, getDmgPlayer, getDmgNpc, setPlayerHP, setNpcHP, increasePlayerStr
}) => {

  const MySwal = withReactContent(Swal);
  const endCombatSwal = withReactContent(Swal);

  const hpPlayerRef = useRef(hpPlayer);
  const hpNpcRef = useRef(hpNpc);

  useEffect(() => {
    hpPlayerRef.current = hpPlayer;
    hpNpcRef.current = hpNpc;
  }, [hpPlayer, hpNpc]);

  useEffect(() => {
    if (npcX === playerX && npcY === playerY) {
      setNpcX(8);
      setNpcY(1);
      setPlayerX(1);
      setPlayerY(8);
      setNpcTime(5000000);
      MySwal.fire({
        title: 'Combat!',
        html: `<div class="modal-div">
               <div id="combat-card-player"></div>
               <div>
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
          const playerCardContainer = document.getElementById("combat-card-player");
          const npcCardContainer = document.getElementById("combat-card-npc");

          if (playerCardContainer && npcCardContainer) {
            const playerCardRoot = createRoot(playerCardContainer);
            const npcCardRoot = createRoot(npcCardContainer);

            playerCardRoot.render(
              <Provider store={store}>
                <CombatCard isPlayer={true} />
              </Provider>
            );
            npcCardRoot.render(
              <Provider store={store}>
                <CombatCard isPlayer={false} />
              </Provider>
            );
          }

          const modalElement = document.querySelector('.swal2-popup');
          let firstEntry = true;
          let defendClicked = false;
          let attackClicked = false;
          let defendButton = document.getElementById('defend-button');
          let attackButton = document.getElementById('attack-button');
          let stopGame = false;

          const enterCombatMode = (attackInterval) => {
            defendButton.disabled = true;
            attackButton.disabled = true;

            const performNPCAttack = () => {
              defendButton.disabled = false;
              modalElement.classList.add('modal-npc-pre-attack');

              setTimeout(() => {
                modalElement.classList.remove('modal-npc-pre-attack');
                modalElement.classList.add('modal-npc-attack');

                if (!defendClicked) {
                  getDmgPlayer(strNpc * Math.floor(Math.random() * 5 + 1));
                }

                setTimeout(() => {
                  modalElement.classList.remove('modal-npc-attack');
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
                      setPlayerHP(5);
                      setNpcHP(5);
                      setNpcTime(400);
                    });
                  }
                  if (!stopGame) {
                    let newAttackInterval = Math.floor(Math.random() * 2000 + 1000);
                    setTimeout(performPlayerAttack, newAttackInterval);
                    defendButton.disabled = true;
                    defendClicked = false;
                  }
                }, 250);
              }, 250);
            };

            const performPlayerAttack = () => {
              attackButton.disabled = false;
              modalElement.classList.add('modal-player-pre-attack');

              setTimeout(() => {
                modalElement.classList.remove('modal-player-pre-attack');
                modalElement.classList.add('modal-player-attack');

                if (attackClicked) {
                  getDmgNpc(strPlayer * Math.floor(Math.random() * 5 + 1));
                }

                setTimeout(() => {
                  modalElement.classList.remove('modal-player-attack');
                  if (hpNpcRef.current <= 0) {
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
                      setPlayerHP(5);
                      setNpcHP(5);
                      increasePlayerStr();
                      setNpcTime(400);
                    });
                  }

                  if (!stopGame) {
                    let newAttackInterval = Math.floor(Math.random() * 2000 + 1000);
                    setTimeout(performNPCAttack, newAttackInterval);
                    attackButton.disabled = true;
                    attackClicked = false;
                  }
                }, 250);
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
  }, [npcX, playerX, npcY, playerY]);

  const createMapMatrix = () => {
    const size = 10;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      matrix[i][0] = 1;
      matrix[i][size - 1] = 1;
    }
    for (let j = 0; j < size; j++) {
      matrix[0][j] = 1;
      matrix[size - 1][j] = 1;
    }

    matrix[playerY][playerX] = 2;
    matrix[npcY][npcX] = 3;

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
            className = npcStyle;
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
  npcX: state.npc.npcX,
  npcY: state.npc.npcY,
  playerStyle: state.player.playerStyle,
  npcStyle: state.npc.npcStyle,
  hpPlayer: state.player.hp,
  strPlayer: state.player.strength,
  hpNpc: state.npc.hp,
  strNpc: state.npc.strength,
});

const mapDispatchToProps = (dispatch) => ({
  setNpcX: (x) => dispatch({ type: "SET_NPC_X", payload: x }),
  setNpcY: (y) => dispatch({ type: "SET_NPC_Y", payload: y }),
  setPlayerX: (x) => dispatch({ type: "SET_PLAYER_X", payload: x }),
  setPlayerY: (y) => dispatch({ type: "SET_PLAYER_Y", payload: y }),
  setNpcTime: (time) => dispatch({ type: "SET_NPC_TIME", payload: time }),
  getDmgPlayer: (dmg) => dispatch({ type: "GET_DMG_PLAYER", payload: dmg }),
  getDmgNpc: (dmg) => dispatch({ type: "GET_DMG_NPC", payload: dmg }),
  setPlayerHP: (hp) => dispatch({ type: "SET_PLAYER_HP", payload: hp }),
  setNpcHP: (hp) => dispatch({ type: "SET_NPC_HP", payload: hp }),
  increasePlayerStr: () => dispatch({ type: "INCREASE_PLAYER_STR" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);