function SwitchPlayerButton({
  gameStatus,
  STATUS,
  handleGameStatusChange,
  handleMoved,
  P1,
  P2,
  classNameValue,
}) {
  //P1 to P2
  if (gameStatus === STATUS.SETUP_P1 || gameStatus === STATUS.ON_GAME_P1) {
    return (
      <button
        id="switch-btn"
        className={classNameValue}
        onClick={() => {
          if (gameStatus === STATUS.ON_GAME_P1) {
            handleGameStatusChange(STATUS.ON_GAME_SWITCH_P2);
          } else {
            handleGameStatusChange(STATUS.SETUP_P2);
          }
          handleMoved(false);
        }}
      >
        Click here and pass the device to {P2.name}
      </button>
    );
  } else {
    //P2 tp P1
    return (
      <button
        id="switch-btn"
        className={classNameValue}
        onClick={() => {
          handleGameStatusChange(STATUS.ON_GAME_SWITCH_P1);
          handleMoved(false);
        }}
      >
        Click here and pass the device to {P1.name}
      </button>
    );
  }
}

export default SwitchPlayerButton;
