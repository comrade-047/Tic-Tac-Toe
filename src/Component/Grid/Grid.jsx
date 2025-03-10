import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css'

function isWinner(board,symbol){
    if(board[0]==board[1] && board[1]==board[2] && board[2]==symbol) return symbol;
    if(board[3]==board[4] && board[4]==board[5] && board[5]==symbol) return symbol;
    if(board[6]==board[7] && board[7]==board[8] && board[8]==symbol) return symbol;

    if(board[0]==board[3] && board[3]==board[6] && board[6]==symbol) return symbol;
    if(board[1]==board[4] && board[4]==board[7] && board[7]==symbol) return symbol;
    if(board[2]==board[5] && board[5]==board[8] && board[8]==symbol) return symbol;

    if(board[0]==board[4] && board[4]==board[8] && board[8]==symbol) return symbol;
    if(board[2]==board[4] && board[4]==board[6] && board[6]==symbol) return symbol;

    return '';
}
function Grid({numberOfCards}){

    const [turn,setTurn ] = useState(true) ; // false -> X turn , true -> 0

    const[board,setBoard] = useState(Array(numberOfCards).fill('')); // initially all cards have pen

    const [winner,setWinner] = useState(null);

    function play(index){
        console.log(index);
        console.log("move done");
        if(turn==true){
            board[index] = '0';
        }
        else {
            board[index] = 'X';
        }
        const win = isWinner(board,turn?'0':'X');
        if(win){
            setWinner(win);
            return;
        }
        if(board.every(cell=>cell!=='')){
            setWinner('Draw');
        }
        setBoard([...board]); // updates the board with a shallow copy of itself as variable in useState are immutable
        setTurn(!turn);
    }

    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }

    return(
        <div className="grid-wrapper">
        {winner  && winner!='Draw' && 
            <>
                <h1 className="turn-highlight">Winner is {winner}</h1>
                <button className="reset"  onClick={reset}>Reset Game</button>
            </>
        }
        {winner === 'Draw' && (
                <>
                    <h1 className="turn-highlight">It&apos;s a Draw!</h1>
                    <button className="reset" onClick={reset}>Reset Game</button>
                </>
        )}
        {!winner && <h1 className="turn-highlight">Current Turn : { (turn)?'0':'X'}</h1>}
        <div className="grid">
        {board.map((value,idx)=>{
            return <Card gameEnd={winner?true:false} onPlay={play} player = {value} key={ idx } index={idx}/>
        })}
        </div>
        </div>
    );
}
export default Grid;