import TextField from "@mui/material/TextField";

function SetupPlayers({ player, handleChangeName }) {
  // const [currentCell, setCurrentCell] = useState([]);

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Your name"
        variant="filled"
        spellCheck={false}
        sx={{
          input: {
            color: "var(--color-white)",
            fontSize: "25px",
            fontFamily: "Shadows Into Light",
          },
          label: {
            color: "var(--color-white)",
            fontFamily: "Shadows Into Light",
            "&.Mui-focused": {
              color: "var(--color-start-button)", // Customize the label color when focused
            },
          },
          width: "180px",

          "& .MuiFilledInput-underline:before": {
            borderBottomColor: "var(--color-white)", // Customize the underline color
          },
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: "var(--color-start-button)", // Customize the highlight color
          },
          "& .MuiFilledInput-underline:hover:before": {
            borderBottomColor: "var(--color-start-button)", // Customize the hover color
          },
        }}
        defaultValue={player.name !== "" ? player.name : "Minochan"}
        onChange={(e) => handleChangeName(e, player)}
      />
    </div>
  );
}

export default SetupPlayers;
