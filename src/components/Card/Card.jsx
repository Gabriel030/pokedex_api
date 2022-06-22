import React from 'react'

const Card = ({poke}) => {
  return (
    <div>
      <img src={`./images/sprites/${poke.held_items[0].id}`} alt="" />
    </div>
  )
}

export default Card
