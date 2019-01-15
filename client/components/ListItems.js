import React from 'react'
import {Link} from 'react-router-dom'
// material ui imports
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const ListItems = props => {
  const {game} = props

  return (
    <div className="game">
      <Link to={`/game/${game.id}`}>
        <Card className="card">
          <CardActionArea>
            <CardMedia
              className="cardMedia"
              component="img"
              alt={game.name}
              height="450"
              maxwidth="345"
              image={game.imageUrl}
              p="2"
              title={game.name}
            />

            <CardContent className="cardContent">
              <h2>{game.name}</h2>
              <p>${(game.price / 100).toFixed(2)}</p>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  )
}

export default ListItems
