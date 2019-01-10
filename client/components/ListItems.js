import React from 'react'
import {Link} from 'react-router-dom'

const ListItems = props => {
  const {game} = props
  return (
    <div className="game">
      <Link to={`/game/${game.id}`}>
        <img src={game.imageUrl} />
      </Link>
      <Link to={`/game/${game.id}`}>
        <h3>{game.name}</h3>
      </Link>
      {/* change this to decimal!!! */}
      <p>CHANGE ME TO DECIMAL{game.price}</p>
    </div>
  )
}

export default ListItems
