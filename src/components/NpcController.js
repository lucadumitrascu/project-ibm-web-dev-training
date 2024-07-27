import { connect } from "react-redux";
import { useEffect } from "react";

const NpcController = ({
  setNpcStyle, npcincreaseX, npcincreaseY, npcdecreaseX, npcdecreaseY, npcs, time, maps, mapIndex,
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      npcs.forEach((npc) => {
        const randomMove = Math.floor(Math.random() * 4);

        switch (randomMove) {
          case 0:
            if (maps[mapIndex].matrix[npc.npcY][npc.npcX + 1] === 0) {
              setNpcStyle(npc.id, "npc-right-anim");
              setTimeout(() => {
                npcincreaseX(npc.id);
                setNpcStyle(npc.id, "npc-right");
              }, 350);
            }
            break;
          case 1:
            if (maps[mapIndex].matrix[npc.npcY][npc.npcX - 1] === 0) {
              setNpcStyle(npc.id, "npc-left-anim");
              setTimeout(() => {
                npcdecreaseX(npc.id);
                setNpcStyle(npc.id, "npc-left");
              }, 350);
            }
            break;
          case 2:
            if (maps[mapIndex].matrix[npc.npcY + 1][npc.npcX] === 0) {
              setNpcStyle(npc.id, "npc-down-anim");
              setTimeout(() => {
                npcincreaseY(npc.id);
                setNpcStyle(npc.id, "npc-down");
              }, 350);
            }
            break;
          case 3:
            if (maps[mapIndex].matrix[npc.npcY - 1][npc.npcX] === 0) {
              setNpcStyle(npc.id, "npc-up-anim");
              setTimeout(() => {
                npcdecreaseY(npc.id);
                setNpcStyle(npc.id, "npc-up");
              }, 350);
            }
            break;
          default:
            break;
        }
      });
    }, time);

    return () => clearInterval(interval);
  }, [npcs, time, npcincreaseX, npcdecreaseX, npcincreaseY, npcdecreaseY, setNpcStyle, maps, mapIndex]);

  return null;
};

const mapStateToProps = (state) => ({
  npcs: state.npc.npcs,
  time: state.npc.time,
  maps: state.map.maps,
  mapIndex: state.map.mapIndex,
});

const mapDispatchToProps = (dispatch) => ({
  npcincreaseX: (id) => dispatch({ type: "npcINCREASEX", payload: { id } }),
  npcdecreaseX: (id) => dispatch({ type: "npcDECREASEX", payload: { id } }),
  npcincreaseY: (id) => dispatch({ type: "npcINCREASEY", payload: { id } }),
  npcdecreaseY: (id) => dispatch({ type: "npcDECREASEY", payload: { id } }),
  setNpcStyle: (id, style) => dispatch({ type: "SET_NPC_STYLE", payload: { id, style } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NpcController);