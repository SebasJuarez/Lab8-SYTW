import React from 'react';
import { useState, useEffect } from 'react';

//Carta
import Card from "./Comp/Carta";
//Imagenes para las cartas
import Anemo from './Media/Anemo.png';
import Geo from './Media/Geo.png';
import Dendro from './Media/Dendro.png';
import Pyro from './Media/Pyro.png';
import Hydro from './Media/Hydro.png';
import Light from './Media/Light.png';
import Cryo from './Media/Cryo.png';
import Electro from './Media/Electro.png';

//Datos de las cartas (imagen, bandera para ver si ya se hizo la pareja)
const cardImages = [
  {"src": Anemo, paiLight: false},
  {"src": Geo, paiLight: false},
  {"src": Dendro, paiLight: false },
  {"src": Pyro, paiLight: false },
  {"src": Hydro, paiLight: false },
  {"src": Light, paiLight: false },
  {"src": Cryo, paiLight: false },
  {"src": Electro, paiLight: false }
];

function App() {
  //Estados
  const [cards, setCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [selectedOne, setSelectedOne] = useState(null)
  const [selectedTwo, setSelectedTwo]= useState(null)
  const [disabled, setDisabled] = useState(false)

  //Función para mezclar las cartas
  const mixCards = () => {
    const mixedCards = [...cardImages, ...cardImages]
    .sort (() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setSelectedOne(null)
    setSelectedTwo(null)
    setCards(mixedCards)
    setMoves(0)
  }

  //Función al darle click a una carta
  const handleSelect = (card) =>{
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
  }

  //Para voltear las cartas
  useEffect (() => {
    if (selectedOne && selectedTwo){
      setDisabled(true)
    }
    if (selectedOne && selectedTwo){
      if (selectedOne.src === selectedTwo.src){
        setCards(lastCards => {
          return lastCards.map(card => {
            if (card.src === selectedOne.src){
              return {...card, paiLight: true}
            }
            else{
              return card
            }
          })
        })
        resetMove()
      }
      else{
        setTimeout(() => resetMove(), 1000) 
      }
    }
  }, [selectedOne, selectedTwo])

  //Función ara resetear las cartas y aumentar los movimientos
  const resetMove = () => {
    setSelectedOne(null)
    setSelectedTwo(null)
    setMoves(lastMove => lastMove + 1)
    setDisabled(false)
  }

  //Iniciar el juego al iniciar la página
  useEffect (() => {
    mixCards()
  }, [])


  //Para poner el alert cuando ganó
  let Contador = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].paiLight) { 
      Contador = Contador + 1
    }
  }

  return (
    <div className='container'>
        <h1>Juego de Memoria de Genshin Impact</h1> 
      <h2> Movimientos: {moves} </h2>
      <button onClick={mixCards} className='restartButton'> Volver a empezar </button>

      <div className='cardGrid'>
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card}
            handleSelect={handleSelect}
            flipped={card === selectedOne || card === selectedTwo || card.paiLight}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
};

export default App;