import React from "react";
import { connect } from "react-redux";
import '../index.css'

const MapBase = ({ playerStyle, playerX, playerY, npcX, npcY }) => {

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
              className = `${playerStyle} npc-cell`;
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

export default connect(mapStateToProps)(MapBase);