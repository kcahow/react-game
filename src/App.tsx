import { PlayNumber } from './components/PlayNumber';
import { Target } from './components/Target';
import { useEffect, useRef, useState } from 'react';
import { uniqueRandomNumbers, gameState, gameButton } from "./util";
import "./App.css";

// Define the game state type
type gameType = {
  state: gameState;
  target?: number;
  currentSelections: gameButton[];
  playButtonText: string;
};

function App() {

  // Set the state for the game
  const [game, setGame] = useState<gameType>({
    state: "new",
    target: undefined,
    currentSelections: [],
    playButtonText: 'Play'
  
  });

  // State to hold the remaining seconds
  const [remainingSeconds, setRemainingSeconds] = useState(10);
  
  // Set the challenge numbers to be an array of game buttons
  // The challenge numbers are the numbers that the player will use to sum to the target
  const challengeNumbers = useRef<gameButton[]>([]);
  const intervalId = useRef<number>();

  const handlePlayButton = () => {
    // Set the challenge numbers to a new set of unique random numbers
    // for this we want 6 unique numbers between 1 and 9
    challengeNumbers.current = uniqueRandomNumbers(6, 9);
    // Initialise the timer
    setRemainingSeconds(10);
    // Set the game state
    setGame((prevState) => ({
      ...prevState,
      currentSelections: [],
      state: "playing",
      playButtonText: "Playing",
      target: calcTarget(challengeNumbers.current),
    }));
  };

  // This effect will run when the game state changes 
  // for the first time, hitting the play button
  useEffect(() => {
    if (game.state === 'playing') {
      intervalId.current = setInterval(() => {
        setRemainingSeconds((pSeconds) => {
          if (pSeconds === 1) {
            clearInterval(intervalId.current);
            setGame((prevState) => ({
              ...prevState,
              state: "lost",
              playButtonText: "Play Again",
            }));
            return 0;
          }
          return pSeconds - 1;
        });
      }, 1_000);
    }
  }, [game.state]);

  // This effect will run when the game state changes
  // when the player has selected 4 numbers
  useEffect(() => {
    if (game.state === 'playing') {
        const total = game.currentSelections.reduce((acc, curr) => acc + curr.value, 0);
        if (total === game.target) {
          clearInterval(intervalId.current);
          setGame((prevState) => ({
            ...prevState,
            state: "won",
            playButtonText: "Play Again",
          }));
        } else if(game.currentSelections.length === 4) {
          clearInterval(intervalId.current);
          setGame((prevState) => ({
            ...prevState,
            state: "lost",
            playButtonText: "Play Again",
          }));
        }
    }
  }, [game.currentSelections, game.state, game.target]);

  // Function to calculate the target number
  const calcTarget = (challengeNumbers: gameButton[]) => {
    return challengeNumbers
    .slice(0, 4) // just for testing, make it random later
    .reduce((acc: number, curr: gameButton) => acc + curr.value, 0);
  }

  // Function to handle the number chosen, this will be passed to the PlayNumber component
  const numberChosenHandler = (tile: gameButton) => {
    setGame((prevState) => ({
      ...prevState,
      currentSelections: [...prevState.currentSelections, tile],
    }));
  };


  return (
    <>
      <div className="game">
        <div className="help">Pick 4 numbers that sum to the target</div>
        <Target
          value={calcTarget(challengeNumbers.current)}
          gameState={game.state}
        />
        <div className="challenge-numbers">
          {challengeNumbers.current.map((tile, index) => (
            <PlayNumber
              key={index}
              btn={tile}
              state={game.state}
              currentSelectionsCount={game.currentSelections.length}
              maxSelections={4}
              onNumberChosen={numberChosenHandler}
            />
          ))}
        </div>
        <div className="footer">
          <div className="timer-value">{remainingSeconds}</div>
          <button onClick={handlePlayButton}>{game.playButtonText}</button>
        </div>
      </div>
    </>
  );
}

export default App;
