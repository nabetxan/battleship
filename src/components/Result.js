function Result({
  result,
  player,
  handleClickRestartButton,
  src,
  className,
  alt,
}) {
  return (
    <div className="result">
      <div className="font-xLarge winner">{player.name} Wins!!</div>
      <div>
        <img src={src} className={className} alt={alt}></img>
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

export default Result;
