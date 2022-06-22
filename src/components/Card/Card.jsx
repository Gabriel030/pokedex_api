import React from 'react'
import style from '../Card/Card.module.css'

const typesColors={
  fire: style.fire,
  normal: style.normal,
  fighting: style.fighting,
  flying: style.flying,
  ground: style.ground,
  poison: style.poison,
  rock: style.rock,
  bug: style.bug,
  ghost: style.ghost,
  steel: style.steel,
  water: style.water,
  grass: style.grass,
  electric: style.electric,
  psychic: style.psychic,
  ice: style.ice,
  dragon: style.dragon,
  dark: style.dark,
  fairy: style.fairy,
  unknown: style.unknown,
  shadow: style.shadow
}



const Card = ({poke}) => {
  return (
    <div className={style.card} style={{ backgroundImage: `url(images/typesbkgm/${poke.types[0].type.name}.png)` }} >
      <img src={`./images/sprites/${poke.id}.gif`} alt="Img not found" height="190px" className={style.img} />
      <div>
        <h1 className={style.name}>{poke.name}</h1>
        <h1>{poke.types[0].type.name}</h1>
      

      </div>
      
    </div>
  )
}

export default Card
