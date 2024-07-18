import React from "react";
import { connect } from "react-redux";
import '../index.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MapBase = ({ playerStyle, playerX, playerY, npcX, npcY, setNpcX, setNpcY, setPlayerX, setPlayerY, setNpcTime }) => {

  const MySwal = withReactContent(Swal);

  const renderTable = () => {
    const rows = Array.from({ length: 10 }, (_, rowIndex) => rowIndex);
    const cols = Array.from({ length: 10 }, (_, colIndex) => colIndex);

    return rows.map(rowIndex => (
      <tr key={rowIndex}>
        {

          cols.map(colIndex => {
            let className = "";

            if (playerX === colIndex && playerY === rowIndex) {
              className = playerStyle;
            }

            if (npcX === colIndex && npcY === rowIndex) {
              className = "npc-cell";
            }

            if (npcX === colIndex && npcY === rowIndex && playerX === colIndex && playerY === rowIndex) {
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
                didOpen: () => {

                  const modalElement = document.querySelector('.swal2-popup');
                  let firstEntry = true;
                  const enemyAttack = (attackInterval) => {

                    const performAttack = () => {
                      modalElement.classList.add('modal-npc-pre-attack');

                      setTimeout(() => {
                        modalElement.classList.remove('modal-npc-pre-attack');
                        modalElement.classList.add('modal-npc-attack');

                        setTimeout(() => {
                          modalElement.classList.remove('modal-npc-attack');
                          let newAttackInterval = Math.floor(Math.random() * 2000 + 1000);
                          setTimeout(performAttack, newAttackInterval);
                        }, 500);
                      }, 250);
                    };

                    if (firstEntry) {
                      setTimeout(() => {
                        firstEntry = false;
                        performAttack();
                      }, attackInterval);
                    }
                    else {
                      performAttack();
                    }
                  };

                  enemyAttack(2000);

                  document.getElementById('attack-button').addEventListener('click', () => {
                    setNpcTime(500);

                    MySwal.close();
                  });

                  document.getElementById('defend-button').addEventListener('click', () => {

                    MySwal.close();
                  });
                }
              });
              className = "npc-cell";
            }

            if (rowIndex === 0 || rowIndex === 9 || colIndex === 0 || colIndex === 9) {
              className = "map-border";
            }

            return <td key={colIndex} className={className}></td>;
          })

        }

      </tr>
    ))
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
  playerStyle: state.player.playerStyle
});

const mapDispatchToProps = (dispatch) => ({
  setNpcX: (x) => dispatch({ type: "SET_NPC_X", payload: x }),
  setNpcY: (y) => dispatch({ type: "SET_NPC_Y", payload: y }),
  setPlayerX: (x) => dispatch({ type: "SET_PLAYER_X", payload: x }),
  setPlayerY: (y) => dispatch({ type: "SET_PLAYER_Y", payload: y }),
  setNpcTime: (time) => dispatch({ type: "SET_NPC_TIME", payload: time })
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);