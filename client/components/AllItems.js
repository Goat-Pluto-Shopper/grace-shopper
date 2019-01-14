import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllItems} from '../store/item'
import {Link} from 'react-router-dom'
import ListItems from './ListItems'
import queryString from 'query-string'
// const querystring = require('querystring');
// const queryString = require('query-string');
// material ui imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import NotFound from './NotFound'
import SideBar from './SideBar'

class AllItems extends Component {
  async componentDidMount() {
    if (this.props.match.path === '/board') {
      await this.props.fetchAllItems(`?category=board`)
    } else if (this.props.match.path === '/card') {
      await this.props.fetchAllItems(`?category=card`)
    } else if (this.props.location.search.length) {
      await this.props.fetchAllItems(this.props.location.search)
    } else {
      await this.props.fetchAllItems()
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.path !== this.props.match.path ||
      prevProps.location.search !== this.props.location.search
    ) {
      if (this.props.match.path === '/board') {
        await this.props.fetchAllItems(`?category=board`)
      } else if (this.props.match.path === '/card') {
        await this.props.fetchAllItems(`?category=card`)
      } else if (this.props.location.search.length) {
        await this.props.fetchAllItems(this.props.location.search)
      } else {
        await this.props.fetchAllItems()
      }
    }
  }

  render() {
    // console.log(this.props, 'props');
    let allGames = this.props.allItems
    if (allGames.length === 0) {
      return (
        <React.Fragment>
          <SideBar />
          <NotFound />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <SideBar />
          <Grid container spacing={24}>
            {allGames.map(game => {
              return (
                <Grid item xs={12} sm={4} key={game.id}>
                  <ListItems game={game} />
                </Grid>
              )
            })}
          </Grid>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => ({
  allItems: state.item.allItems
})

const mapDispatchToProps = dispatch => ({
  fetchAllItems: query => dispatch(fetchAllItems(query))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllItems)
)
