import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllItems} from '../store/item'
import {Link} from 'react-router-dom'
import ListItems from './ListItems'

class AllItems extends Component {
  async componentDidMount() {
    await this.props.fetchAllItems()
  }

  render() {
    let allGames = this.props.allItems
    if (this.props.match.path === '/board') {
      allGames = allGames.filter(x => x.category === 'board')
    }
    if (this.props.match.path === '/card') {
      allGames = allGames.filter(x => x.category === 'card')
    }
    console.log(allGames.length, 'length')
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
  fetchAllItems: () => dispatch(fetchAllItems())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllItems)
)
