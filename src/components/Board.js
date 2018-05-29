import React from 'react';
import Square from './Square';


/*=====================================
  BOARD
=====================================*/
class Board extends React.Component {
    
    //PROPS:
    // squares[]
    // onClick()

    renderSquare(index) {
        return (
            <Square 
                value={this.props.squares[index]} 
                onClick={() => this.props.onClick(index)} 
            />
        );
    }

    inlineSquares() {
        const total = 9; let inline = []; let squares = [];
        for(let i = 0; i < total; i++){
            if(i % 3 === 0 && i !== 0){
                inline.push(squares);
                squares = [];
            }
            if(i === total - 1){
                inline.push(squares);
            }
            squares.push(this.renderSquare(i));      
        }
        return inline;
    }

    renderRows() {
        let boardRows = [];
        const squares = this.inlineSquares();

        for(let x = 0; x < squares.length; x++){
            boardRows.push(
                <div key={x} className="board-row">
                    {squares[x]}
                </div>
            );
        }
        return <div>{boardRows}</div>;
    }

    render() {
        return this.renderRows();
    }
}

export default Board;