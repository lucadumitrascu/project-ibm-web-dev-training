//src/components/MapBase.js
import React from "react";
import { connect } from "react-redux";
import '../index.css'

const MapBase = ({ playerX, playerY }) => {
    const renderTable = () => {
      const rows = Array.from({ length: 10 }, (_, rowIndex) => rowIndex);
      const cols = Array.from({ length: 10 }, (_, colIndex) => colIndex);
      
      return rows.map(rowIndex => (
        <tr key={rowIndex}>

        {cols.map(colIndex => (
            <td key={colIndex} className={playerX === colIndex && playerY === rowIndex ? "player-cell" : ""}></td>
          ))}

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
  playerX: state.playerX,
  playerY: state.playerY
});

export default connect(mapStateToProps)(MapBase);