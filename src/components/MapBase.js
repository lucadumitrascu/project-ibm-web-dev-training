import React from "react";
import { connect } from "react-redux";
import '../index.css'

const MapBase = ({ playerX, playerY }) => {
  const renderTable = () => {
    const rows = Array.from({ length: 10 }, (_, rowIndex) => rowIndex);
    const cols = Array.from({ length: 10 }, (_, colIndex) => colIndex);
    
    return rows.map(rowIndex => (
      <tr key={rowIndex}>
        {

        cols.map(colIndex => {
          let className = "";
          if (playerX === colIndex && playerY === rowIndex) {
            className = "player-cell";
          }

          if(rowIndex === 0 || rowIndex === 9 || colIndex === 0 || colIndex === 9) {
            className = "border-blue";
          }
          return <td key={colIndex} className={className}></td>;
        })
        
        }

      </tr>
    ))};
    

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