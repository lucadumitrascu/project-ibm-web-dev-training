import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import '../index.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
        html: `<button id="defend-button" class="modal-button-defend">Defend</button>
               <button id="attack-button" class="modal-button-attack">Attack</button>`,
        customClass: {
          popup: 'modal'
        },
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
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
                    console.log("NPC WIN!");
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
                    console.log("Player WIN!");
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
  },);

  const renderTable = () => {
    const rows = Array.from({ length: 10 }, (_, rowIndex) => rowIndex);
    const cols = Array.from({ length: 10 }, (_, colIndex) => colIndex);

    return rows.map(rowIndex => (
      <tr key={rowIndex}>
        {cols.map(colIndex => {
          let className = "";

          if (playerX === colIndex && playerY === rowIndex) {
            className = playerStyle;
          }

          if (npcX === colIndex && npcY === rowIndex) {
            className = npcStyle;
          }

          if (rowIndex === 0 || rowIndex === 9 || colIndex === 0 || colIndex === 9) {
            className = "map-border";
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