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
        <Card m="1">
          <CardActionArea>
            <CardMedia
              component="img"
              alt={game.name}
              height="300"
              maxwidth="345"
              image={game.imageUrl}
              p="2"
              title={game.name}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {game.name}
              </Typography>
              <Typography component="p">
                {/* change this to decimal!!! */}
                CHANGE ME TO DECIMAL {game.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  )
}

export default ListItems
