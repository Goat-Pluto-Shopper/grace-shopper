import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllItems} from '../store/item'
import {Link} from 'react-router-dom'
import ListItems from './ListItems'

class AllItems extends Component {
  async componentDidMount() {
    if (this.props.match.path === '/board') {
      await this.props.fetchAllItems({category: 'board'})
    } else if (this.props.match.path === '/card') {
      await this.props.fetchAllItems({category: 'card'})
    } else {
      await this.props.fetchAllItems()
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.path !== this.props.match.path) {
      if (this.props.match.path === '/board') {
        await this.props.fetchAllItems({category: 'board'})
      } else if (this.props.match.path === '/card') {
        await this.props.fetchAllItems({category: 'card'})
      } else {
        await this.props.fetchAllItems()
      }
    }
  }

  render() {
    let allGames = this.props.allItems
    console.log(allGames.length, 'all games length')
    return (
      <div>
        {allGames.map(game => {
          return <ListItems game={game} key={game.id} />
        })}
      </div>
    )
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
