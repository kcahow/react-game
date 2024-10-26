import { gameState, gameButton } from '../util';
type Props = {
    state: gameState
    btn: gameButton;
    currentSelectionsCount: number;
    maxSelections: number;
    handleGameChoice: (tile: gameButton) => void;
  };

export const PlayNumber = ({
  state,
  btn,
  currentSelectionsCount,
  maxSelections,
  handleGameChoice,
}: Props) => {
  const handleSelection = () => {
    if (
      currentSelectionsCount < maxSelections &&
      !btn.selected &&
      state === "playing"
    ) {
      btn.selected = true;
      handleGameChoice(btn);
    }
  };

  return (
    <div
      className="number"
      style={{ opacity: btn.selected ? 0.5 : 1 }}
      onClick={handleSelection}
    >
      {btn.value}
    </div>
  );
};

