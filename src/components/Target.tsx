
type TitleProp = {
    value?: number;
    gameState: 'new' | 'playing' | 'won' | 'lost';
}

const colors = {playing: 'gray', won: 'green', lost: 'red', new: 'lightblue'};

export const Target = ({value, gameState}: TitleProp) =>{
    return (
        <div className="target" style={{backgroundColor:colors[gameState]}}>
            {value}
        </div>
    )
}