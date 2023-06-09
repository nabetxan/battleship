import { useEffect, useState } from "react";
function SetupGameboard({ player }) {
  const [counter, setCounter] = useState(0);
//   const [gameStatus, setGameStatus] = useState("not-started");
  const [direction, setDirection] = useState("y");
  const [currentCell, setCurrentCell] = useState([]);
  const [result, setResult] = useState();

  const updateCounter = function () {
    setCounter(counter + 1);
  };

//   const nextShipLength = player.gameboard.getShipLength();
//   useEffect(() => {
//     if (!nextShipLength) {
//       setGameStatus("ready-to-play");
//     }
//   }, [nextShipLength]);

  return <div>hola {player.name}</div>;
}

export default SetupGameboard;
