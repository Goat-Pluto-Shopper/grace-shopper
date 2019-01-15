import React from 'react'
import {Link} from 'react-router-dom'
// material ui imports
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  imgPadding: {
    maxwidth: 100,
    // overflow: 'hidden',
    padding: 1
  }
})

const ListItems = props => {
  const {game} = props
  const {classes} = props

  return (
    <div className="game">
      <Link to={`/game/${game.id}`}>
        <Card>
          <CardActionArea>
            <CardMedia
              className={classes.imgPadding}
              component="img"
              alt={game.name}
              height="500"
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
                ${(game.price / 100).toFixed(2)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  )
}

export default withStyles(styles)(ListItems)

// export default ListItems
