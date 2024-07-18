import { connect } from "react-redux";
import { useEffect } from "react";
import '../index.css'

const NpcController = ({ npcincreaseX, npcincreaseY, npcdecreaseX, npcdecreaseY, time }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMove = Math.floor(Math.random() * 4)
      switch (randomMove) {
        case 0:
          npcincreaseX();
          break;
        case 1:
          npcdecreaseX();
          break;
        case 2:
          npcincreaseY();
          break;
        case 3:
          npcdecreaseY();
          break;
        default:
          break;
      }
    }, time);
    return () => clearInterval(interval);
  }, [time]);

  return null;
};

const mapStateToProps = (state) => ({
  time: state.npc.time
});

const mapDispatchToProps = (dispatch) => ({
  npcincreaseX: () => dispatch({ type: "npcINCREASEX" }),
  npcdecreaseX: () => dispatch({ type: "npcDECREASEX" }),
  npcincreaseY: () => dispatch({ type: "npcINCREASEY" }),
  npcdecreaseY: () => dispatch({ type: "npcDECREASEY" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NpcController);