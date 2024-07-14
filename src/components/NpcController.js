import { connect } from "react-redux";
import { useEffect } from "react";
import '../index.css'

const NpcController = ({ npcincreaseX, npcincreaseY, npcdecreaseX, npcdecreaseY }) => {
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
    }, 500);
    return () => clearInterval(interval);
  }, [npcincreaseX, npcincreaseY, npcdecreaseX, npcdecreaseY]);

  return null;
};

const mapStateToProps = (state) => ({
  npcX: state.npc.npcX,
  npcY: state.npc.npcY,
});

const mapDispatchToProps = (dispatch) => ({
  npcincreaseX: () => dispatch({ type: "npcINCREASEX" }),
  npcdecreaseX: () => dispatch({ type: "npcDECREASEX" }),
  npcincreaseY: () => dispatch({ type: "npcINCREASEY" }),
  npcdecreaseY: () => dispatch({ type: "npcDECREASEY" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NpcController);