import React from 'react';
import Board from './Board';
import calculateWinner from '../helpers/calculateWinner';

/*=====================================
  BOARD
=====================================*/
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                col: null,
                row: null,
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }



    historySteps() {
        const active = this.state.stepNumber;

        const moves = this.state.history.map( (step, move) => {
            const classStyle = active === move ? 'list-group-item list-group-item-action game-list text-night-blue bg-light' : 'list-group-item list-group-item-action game-list';
            const location = step.col && step.row ? ' - Location: col ' + step.col + ' row ' + step.row : '';
            const desc = move ?' Go to step number ' + move : ' Go to game start' ;
            
            return (
                <button 
                    key={move} 
                    type="button"
                    onClick={() => this.jumpTo(move)} 
                    className={classStyle}>
                    <i className="fa fa-thumb-tack text-coral" aria-hidden="true"></i>{desc} 
                    <br/>
                    {location}
                </button>
            );
        });

        return moves;
    }

    getWinner() {
        const winner = 
            calculateWinner(
                this.state.history[this.state.stepNumber].squares
            );
        return winner ? 'Winner: ' + winner : 'Next player up is: ' + (this.state.xIsNext ? ' X' : ' O');
    }

    render(){
        const current = this.state.history[this.state.stepNumber];
        return (
            <div className="container-fluid">
                <div className="row mx-auto">
                    <div className="col-12">
                        <h1 className="game-master-header">
                            Tic-Tac-Toe 
                            <i className="fa fa-gamepad fa-lg text-tropic-blue" aria-hidden="true"></i>
                        </h1>
                        <h4 className="text-center font-weight-light">
                            {this.getWinner()}
                        </h4>
                    </div>
                </div>
                <div className="row mx-auto"> 
                    <div className="col-5 pt-5 px-0">
                        <div className="list-group">
                            <button type="button" className="list-group-item disabled game-list-header disabled">
                                GAME HISTORY 
                                <i className="fa fa-history text-tropic-blue fa-lg" aria-hidden="true"></i>
                            </button>
                            {this.historySteps()}
                        </div>
                    </div>
                    <div className="col-7 pt-5 px-0">
                        <div className="d-flex justify-content-center">
                        <Board 
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    calcCol(i) {
        if(i === 0 || i === 3 || i === 6){
            return 1;
        }else if(i === 1 || i === 4 || i === 7){
            return 2;
        }else if(i === 2 || i === 5 || i === 8){
            return 3;
        }
    }

    calcRow(i) {
        if(i === 0 || i === 1 || i === 2){
            return 1;
        }else if(i === 3 || i === 4 || i === 5){
            return 2;
        }else if(i === 6 || i === 7 || i === 8){
            return 3;
        }
    }

    handleClick(i) {
        
        const history = this.state.history.slice(0, this.state.stepNumber + 1); //copy history + 1

        const currentSquares = history[history.length - 1].squares.slice(); //copy current squares

       
        const column = this.calcCol(i);
        const row = this.calcRow(i);

       

        if (calculateWinner(currentSquares) || currentSquares[i]) { return; }

        currentSquares[i] = this.state.xIsNext ? 'X' : 'O';



        this.setState({
            history: 
                history.concat([
                    {
                        squares: currentSquares,
                        col: column,
                        row: row
                    }
                ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0 //true if i is even number
        })
    }
}

export default Game;