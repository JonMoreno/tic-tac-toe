import React from 'react';

/*=====================================
  SQUARE
  Functional Component.
=====================================*/
function Square(props) {
    
    // PROPS:
    // value
    // onClick()
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;
