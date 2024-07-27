import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import store from '../store/store';
import { createRoot } from "react-dom/client";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CombatCard from "./CombatCard";

import ghostImg from "../assets/ghost.png";
import playerImg from "../assets/player.png"


const MapBase = ({
  npcs, playerStyle, playerX, playerY, removeNpc, setPlayerX, setPlayerY, setNpcX, setNpcY,
  setNpcTime, hpPlayer, strPlayer, getDmgPlayer, getDmgNpc, setPlayerHP, setNpcHP,
  increasePlayerStr, setPlayerCardStyle, setNpcCardStyle, maps, mapIndex, changeMap, addNpc, setNpcStrength, removeAllNpcs, resetPlayerStrength,
}) => {
  const MySwal = withReactContent(Swal);
  const endCombatSwal = withReactContent(Swal);
  const introSwal = withReactContent(Swal);

  const hpPlayerRef = useRef(hpPlayer);
  const hpNpcRefs = useRef({});


  const currentLevel = useRef(0);

  const [tableStyle, setTableStyle] = useState("map-table");

  useEffect(() => {
    if (mapIndex === 0) {
      setTableStyle("floor-1");
    } else {
      setTableStyle("floor-2");
    }
  }, [mapIndex]);

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
        setNpcTime(5000000);
        if (playerX !== 8 && playerY !== 8) {
          setNpcX(npc.id, 8);
          setNpcY(npc.id, 8);
        }
        else {
          setNpcX(npc.id, 1);
          setNpcY(npc.id, 1);
        }
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
                    }, 400);

                    setTimeout(() => {
                      setPlayerCardStyle('combat-card-container combat-card-player-damage');
                    }, 400);
                  } else {
                    setTimeout(() => {
                      divPlayer.classList.add("div-player-defense");
                    }, 500);
                    setTimeout(() => {
                      setPlayerCardStyle('combat-card-container combat-card-player-defense');
                    }, 400);
                  }

                  setTimeout(() => {
                    setPlayerCardStyle('combat-card-container');
                    if (hpPlayerRef.current <= 0) {
                      stopGame = true;

                      endCombatSwal.fire({
                        title: 'You died!',
                        confirmButtonText: 'Restart game',
                        showConfirmButton: true,
                        customClass: {
                          popup: 'modal-end-combat'
                        },
                      }).then(() => {
                        setPlayerX(4);
                        setPlayerY(8);
                        setPlayerHP(20);
                        setNpcTime(400);
                        resetPlayerStrength();
                        setNpcStrength(1);
                        removeAllNpcs();
                        setIntroEnded(false);
                        changeMap(0);
                        currentLevel.current = 0;
                      });
                    }
                    setTimeout(() => {
                      divNpc.classList.remove('div-npc-attack');
                      divPlayer.classList.remove('div-player-damage');
                      divPlayer.classList.remove("div-player-defense");
                    }, 350);

                    if (!stopGame) {
                      let newAttackInterval = Math.floor(Math.random() * 2000 + 1000) + 250;
                      setTimeout(performPlayerAttack, newAttackInterval);
                      defendButton.disabled = true;
                      defendClicked = false;
                    }
                  }, 750);
                }, 500);
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
                    }, 500);

                    setTimeout(() => {
                      setNpcCardStyle('combat-card-container combat-card-npc-defense');
                    }, 400);
                  } else {
                    setTimeout(() => {
                      divNpc.classList.add("div-npc-damage");
                      getDmgNpc(npc.id, strPlayer * Math.floor(Math.random() * 5 + 1));
                    }, 400);
                    setTimeout(() => {
                      setNpcCardStyle('combat-card-container combat-card-npc-damage');
                    }, 400);
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
                    }, 350);

                    if (!stopGame) {
                      let newAttackInterval = Math.floor(Math.random() * 2000 + 1000) + 250;
                      setTimeout(performNPCAttack, newAttackInterval);
                      attackButton.disabled = true;
                      attackClicked = false;
                    }
                  }, 750);
                }, 500);
              };

              if (firstEntry) {
                setTimeout(() => {
                  firstEntry = false;
                  performNPCAttack();
                }, attackInterval + 250);
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



  const handleAddNpcs = (numberOfNpcs) => {
    if (numberOfNpcs !== 1) {
      numberOfNpcs = Math.floor(Math.random() * 3 + 1);
    }

    for (let i = 0; i < numberOfNpcs; i++) {
      const newNpc = {
        id: i,
        npcX: i + 2,
        npcY: 5,
        hp: 1,
        strength: 1,
        npcStyle: "npc-down",
      };
      addNpc(newNpc);
    }
  };

  const [introEnded, setIntroEnded] = useState(false);


  useEffect(() => {
    if (mapIndex === 0) { // MAP 1
      if (npcs.length === 0 && playerX === 8 && playerY === 0) {
        if (currentLevel.current === 0) {
          currentLevel.current++;
          handleAddNpcs(2);
          setNpcStrength(2);
        }
        setPlayerY(8);
        changeMap(1);
      }
      else if (npcs.length > 0 && playerX === 8 && playerY === 0) {
        setPlayerY(1);
      }

      if (!introEnded && ((playerX === 6 && playerY === 2)
        || (playerX === 7 && playerY === 1) || (playerX === 7 && playerY === 3))) {

        let step = 0;
        const dialog = [
          { text: 'Ghost: "Bohohoho!"', img: ghostImg },
          { text: 'Player: "A GHOST???"', img: playerImg },
          { text: 'Ghost: "Yes, I am the spirit of someone who once tried to navigate this place."', img: ghostImg },
          { text: 'Player: "What happened to you?"', img: playerImg },
          { text: 'Ghost: "I was here before you. I didn’t make it. The enemies here are ruthless."', img: ghostImg },
          { text: 'Player: "Is there any way to escape?"', img: playerImg },
          { text: 'Ghost: "Only those who are brave and vigilant can survive."', img: ghostImg },
          { text: 'Player: "I must continue, I have no choice."', img: playerImg },
          { text: 'Ghost: "Wait! Oh no, I can feel it... An enemy is here! We can’t talk anymore, you must fight! Good luck!"', img: ghostImg }
        ];

        function showNextDialog() {
          if (step < dialog.length) {
            Swal.fire({
              html: `
          <div id="div-modal-intro" class="div-modal-intro">
              <img id="modalImage" src="" alt="Character Image" style="width: 100px; height: 100px;" />
              <p id="modalText"></p>
              
          </div>
          <button id="nextButton">Next</button>
        `,
              showConfirmButton: false,
              customClass: {
                popup: 'modal-intro'
              },
              didOpen: () => {
                document.getElementById('modalImage').src = dialog[step].img;
                document.getElementById('modalText').textContent = dialog[step].text;
                document.getElementById('nextButton').textContent = step < dialog.length - 1 ? 'Next' : 'Continue';

                document.getElementById('nextButton').addEventListener('click', function () {
                  step++;
                  Swal.close();
                  if (step < dialog.length) {
                    showNextDialog();
                  } else {
                    setIntroEnded(true);
                    handleAddNpcs(1);
                  }
                });
              }
            });
          }
        }
        showNextDialog();
      } // ------------------------------------------------------
    } else if (mapIndex === 1) { // MAP 2
      if (npcs.length === 0 && playerX === 0 && playerY === 1) {
        if (currentLevel.current === 1) {
          currentLevel.current++;
          handleAddNpcs(2);
          setNpcStrength(3);
        }
        setPlayerX(8);
        changeMap(2);
      }
      else if (npcs.length > 0 && playerX === 0 && playerY === 1) {
        setPlayerX(1);
      }
      if (npcs.length === 0 && playerX === 8 && playerY === 9) {
        changeMap(0);
        setPlayerY(1);
      }
      else if (npcs.length > 0 && playerX === 8 && playerY === 9) {
        setPlayerY(8);
      } // ------------------------------------------------------
    } else if (mapIndex === 2) { // MAP 3
      if (npcs.length === 0 && playerX === 1 && playerY === 9) {
        if (currentLevel.current === 2) {
          currentLevel.current++;
          handleAddNpcs(2);
          setNpcStrength(4);
        }
        setPlayerY(1);
        changeMap(3);
      }
      else if (npcs.length > 0 && playerX === 1 && playerY === 9) {
        setPlayerY(8);
      }

      if (npcs.length === 0 && playerX === 9 && playerY === 1) {
        changeMap(1);
        setPlayerX(1);
      }
      else if (npcs.length > 0 && playerX === 9 && playerY === 1) {
        setPlayerX(8);
      } // ------------------------------------------------------
    } else if (mapIndex === 3) { // MAP 4
      if (npcs.length === 0 && playerX === 9 && playerY === 8) {
        if (currentLevel.current === 3) {
          currentLevel.current++;
          handleAddNpcs(2);
          setNpcStrength(5);
        }
        setPlayerX(1);
        changeMap(4);
      }
      else if (npcs.length > 0 && playerX === 9 && playerY === 8) {
        setPlayerX(8);
      }

      if (npcs.length === 0 && playerX === 1 && playerY === 0) {
        changeMap(2);
        setPlayerY(8);
      }
      else if (npcs.length > 0 && playerX === 1 && playerY === 0) {
        setPlayerY(1);
      } // ------------------------------------------------------
    } else if (mapIndex === 4) { // MAP 5
      if (npcs.length === 0 && playerX === 0 && playerY === 8) {
        setPlayerX(8);
        changeMap(3);
      }
      else if (npcs.length > 0 && playerX === 0 && playerY === 8) {
        setPlayerX(1);
      }
    }
  }, [playerX, playerY, changeMap]);

  const [doorStyle, setDoorStyle] = useState("door-closed");
  const [doorAnimOpen, setDoorAnimOpen] = useState(true);
  const [doorAnimClose, setDoorAnimClose] = useState(true);

  useEffect(() => {
    if (npcs.length === 0 && introEnded) {
      if (doorAnimOpen) {
        setDoorAnimOpen(false);
        setDoorAnimClose(true);
        setDoorStyle("door-anim-open");
      } else {
        setDoorStyle("door-open");
      }
    } else if (npcs.length > 0 && mapIndex !== 0) {
      if (doorAnimClose) {
        setDoorAnimOpen(true);
        setDoorAnimClose(false);
        setDoorStyle("door-anim-close");
      } else {
        setDoorStyle("door-close");
      }
    }
    if (!introEnded) {
      setDoorStyle("door-close");
    }
  }, [npcs.length, mapIndex, introEnded]);

  const renderTable = () => {
    return maps[mapIndex].matrix.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, colIndex) => {
          let className = "";

          if (cell === 1) {
            className = "map-border";
          }
          else if (cell === 2) {
            className = doorStyle;
          }
          else if (cell === 3) {
            className = "door-close";
          }
          else if (cell === 4) {
            className = "ghost-cell";
          }
          else if (colIndex === playerX && rowIndex === playerY) {
            className = playerStyle;
          } else if (npcs.find(npc => npc.npcY === rowIndex && npc.npcX === colIndex)) {
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
      <table className={tableStyle}>
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
  maps: state.map.maps,
  mapIndex: state.map.mapIndex,
});

const mapDispatchToProps = (dispatch) => ({
  setNpcX: (id, x) => dispatch({ type: "SET_NPC_X", payload: { id, x } }),
  setNpcY: (id, y) => dispatch({ type: "SET_NPC_Y", payload: { id, y } }),
  setPlayerX: (x) => dispatch({ type: "SET_PLAYER_X", payload: { x } }),
  setPlayerY: (y) => dispatch({ type: "SET_PLAYER_Y", payload: { y } }),
  setNpcTime: (time) => dispatch({ type: "SET_NPC_TIME", payload: { time } }),
  getDmgPlayer: (dmg) => dispatch({ type: "GET_DMG_PLAYER", payload: { dmg } }),
  getDmgNpc: (id, dmg) => dispatch({ type: "GET_DMG_NPC", payload: { id, dmg } }),
  setPlayerHP: (hp) => dispatch({ type: "SET_PLAYER_HP", payload: { hp } }),
  setNpcHP: (id, hp) => dispatch({ type: "SET_NPC_HP", payload: { id, hp } }),
  increasePlayerStr: () => dispatch({ type: "INCREASE_PLAYER_STR" }),
  setNpcCardStyle: (style) => dispatch({ type: "SET_NPC_CARD_STYLE", payload: { style } }),
  setPlayerCardStyle: (style) => dispatch({ type: "SET_PLAYER_CARD_STYLE", payload: { style } }),
  removeNpc: (id) => dispatch({ type: "REMOVE_NPC", payload: { id } }),
  changeMap: (mapIndex) => dispatch({ type: "CHANGE_MAP", payload: { mapIndex } }),
  addNpc: (npc) => dispatch({ type: "ADD_NPC", payload: { npc } }),
  setNpcStrength: (str) => dispatch({ type: "SET_ALL_NPC_STRENGTH", payload: { str } }),
  removeAllNpcs: () => dispatch({ type: "REMOVE_ALL_NPCS" }),
  resetPlayerStrength: () => dispatch({ type: "RESET_PLAYER_STRENGTH" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);