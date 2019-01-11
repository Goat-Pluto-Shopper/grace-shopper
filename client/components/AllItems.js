import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllItems} from '../store/item'
import {Link} from 'react-router-dom'
import ListItems from './ListItems'
// material ui imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

class AllItems extends Component {
  async componentDidMount() {
    await this.props.fetchAllItems()
  }

  render() {
    const allGames = this.props.allItems

    return (
      <Grid container spacing={24}>
        {allGames.map(game => {
          return (
            <Grid item xs={12} sm={4} key={game.id}>
              <ListItems game={game} />
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  allItems: state.item.allItems
})

const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => dispatch(fetchAllItems())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllItems)
)
