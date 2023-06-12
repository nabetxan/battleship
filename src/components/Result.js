import IMAGE from "../Image/IMAGE";

function Result({ result, P1, P2, handleClickRestartButton, computerMode }) {
  if (result === "p1-win") {
    return (
      <div className="result">
        <div className="font-xLarge winner">{P1.name} Wins!!</div>
        <div>
          <img
            src={IMAGE.PLATYPUS_CAPTURED}
            className="win-result-image"
            alt="platypus captured"
          ></img>
        </div>
        <div></div>
        <div>
          <button
            id="restart-btn"
            className="font-xLarge"
            onClick={handleClickRestartButton}
          >
            Restart
          </button>
        </div>
      </div>
    );
  } else if (result === "p2-win" && computerMode) {
    return (
      <div className="result">
        <div className="font-xLarge winner">{P2.name} Wins</div>
        <div>
          <img
            src={IMAGE.LOST_PLATYPUS}
            className="lost-result-image"
            alt="platypus lost"
          ></img>
        </div>
        <div></div>
        <div>
          <button
            id="restart-btn"
            className="font-xLarge"
            onClick={handleClickRestartButton}
          >
            Restart
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="result">
        <div className="font-xLarge winner">{P2.name} Wins!!</div>
        <div>
          <img
            src={IMAGE.PLATYPUS_CAPTURED}
            className="win-result-image"
            alt="platypus captured"
          ></img>
        </div>
        <div></div>
        <div>
          <button
            id="restart-btn"
            className="font-xLarge"
            onClick={handleClickRestartButton}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }
}

export default Result;
