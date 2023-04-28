import React, { useState } from 'react';
import "./Carta.css";
import back from '../media/Cardback.png';

function Carta({card, handleSelect, flipped, disabled}) {

  //Al darle click a la carta
  const handleClick = () =>{
    if (!disabled){
      handleSelect(card)
    }
  }

  return (
    <div className="card" >
      <div className={flipped ? "flipped" : ""}>
        <img 
          className="frontCard" 
          src={card.src} 
        />

        <img 
          className="backCard" 
          src={back} 
          onClick={handleClick}
        />
      </div>
    </div>

  )
}

export default Carta