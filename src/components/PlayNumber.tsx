import { gameState, gameButton } from '../util';
type Props = {
    state: gameState
    btn: gameButton;
    currentSelectionsCount: number;
    maxSelections: number;
    onNumberChosen: (tile: gameButton) => void;
  };

export const PlayNumber = ({ state, btn, currentSelectionsCount, maxSelections, onNumberChosen }: Props) => {
    const handleSelection = () => {
        if(currentSelectionsCount  < maxSelections && !btn.selected && state === 'playing') {
          btn.selected = true;
          onNumberChosen(btn);
        }
      };

    return (
            <div className="number" style={{ opacity: (btn.selected) ? .5 : 1 }} onClick={handleSelection}>
              {btn.value}
            </div>
    )
};

