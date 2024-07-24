import { connect } from "react-redux";
import { useEffect } from "react";

const NpcController = ({ setNpcStyle, npcincreaseX, npcincreaseY, npcdecreaseX, npcdecreaseY, npcX, npcY, time }) => {

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMove = Math.floor(Math.random() * 4);

      switch (randomMove) {
        case 0:
          if (npcX < 8) {
            setNpcStyle("npc-right-anim");
            setTimeout(() => {
              npcincreaseX();
              setNpcStyle("npc-right");
            }, 350);
          }
          break;
        case 1:
          if (npcX > 1) {
            setNpcStyle("npc-left-anim");
            setTimeout(() => {
              npcdecreaseX();
              setNpcStyle("npc-left");
            }, 350);
          }
          break;
        case 2:
          if (npcY < 8) {
            setNpcStyle("npc-down-anim");
            setTimeout(() => {
              npcincreaseY();
              setNpcStyle("npc-down");
            }, 350);
          }
          break;
        case 3:
          if (npcY > 1) {
            setNpcStyle("npc-up-anim");
            setTimeout(() => {
              npcdecreaseY();
              setNpcStyle("npc-up");
            }, 350);
          }
          break;
        default:
          break;
      }
    }, time);

    return () => clearInterval(interval);
  }, [setNpcStyle, npcincreaseX, npcincreaseY, npcdecreaseX, npcdecreaseY, npcX, npcY, time]);


  return null;
};

const mapStateToProps = (state) => ({
  npcX: state.npc.npcX,
  npcY: state.npc.npcY,
  time: state.npc.time,
});

const mapDispatchToProps = (dispatch) => ({
  npcincreaseX: () => dispatch({ type: "npcINCREASEX" }),
  npcdecreaseX: () => dispatch({ type: "npcDECREASEX" }),
  npcincreaseY: () => dispatch({ type: "npcINCREASEY" }),
  npcdecreaseY: () => dispatch({ type: "npcDECREASEY" }),
  setNpcStyle: (direction) => dispatch({ type: "SET_NPC_STYLE", payload: direction }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NpcController);