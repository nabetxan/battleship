function Introduction({ player1, computerMode }) {
  return computerMode ? (
    <div id="intro">
      <div className="font-normal">
        <div>
          Hello {player1.name === "Minochan" ? "there" : <b>{player1.name}</b>}
          !!
        </div>
        <div>Welcome to our Platypus Research Lab. </div>
        <div>Can you find the hidden platypus faster than us?</div>
        <div>
          Place your piece on the board and rotate it using the button on the
          left.{" "}
        </div>
        <div>Once you are ready, Start button will appear automatically. </div>
      </div>
    </div>
  ) : (
    <div id="intro">
      <div className="font-normal">
        <div>
          Hello there!! This is a <b>2 playes mode.</b>{" "}
        </div>
        <div>Let's see which of you can find the hidden platypus faster.</div>
        <div>
          Good luck to both of you. Now, pass the device to the first player.{" "}
        </div>
        <div>Make sure your opponent won't see while you are playing.</div>
      </div>
    </div>
  );
}

export default Introduction;
