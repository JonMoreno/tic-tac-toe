import React from 'react';
import ReactDOM from 'react-dom';
import CalculateWinner from './helpers';
import './index.css';

/*=====================================
  SQUARE
    Functional Component.
=====================================*/
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

/*=====================================
  BOARD
=====================================*/
class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    
    renderSquare(index) {
        return (
            <Square 
                value={this.state.squares[index]} 
                onClick={() => this.handleClick(index)} 
            />
        );
    }

    handleClick(index) {
        const squares = this.state.squares.slice(); //copy   
        if(CalculateWinner(squares) || squares[index]) { //if( !null || !null)
            return;
        }
        squares[index] = this.state.xIsNext?'X':'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const winner = CalculateWinner(this.state.squares);
        let status;

        if(winner) {
            status = "The Winner is: " + winner;
        }else {
            status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
          <div>
              <div className="status">{status}</div>
              <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              </div>
              <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
              </div>
              <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
              </div>
          </div>
        );
    }
}

/*=====================================
  BOARD
=====================================*/
class Game extends React.Component {

    render(){
        return (
            <div className="game">
              <div className="game-board">
                <Board />
              </div>

              <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
              </div>
            </div>
        );
    }
}
  
// ========================================
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  