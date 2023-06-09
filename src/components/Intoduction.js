function Introduction({ player1, computerMode }) {
  return computerMode ? (
    <div>
      <div className="font-normal height80 margin20">
        <div>
          Hello {player1.name === "Minochan" ? "there" : <b>{player1.name}</b>}
          !!
        </div>
        <div>
          Welcome to our Platypus Research Lab. Can you find the hidden platypus
          faster than us?
        </div>
        <div>
          Place your piece on the board and rotate it using the button on the
          left. Once you are ready, start button will appear.{" "}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="font-normal height80 margin20">
        <div>Hello there!!</div>
        <div>
          This is a 2 playes mode. Let's see which of you can find the hidden
          platypus faster.
        </div>
        <div>
          Good luck to both of you. Now, pass the device to the first player.{" "}
        </div>
      </div>
    </div>
  );
}

export default Introduction;
