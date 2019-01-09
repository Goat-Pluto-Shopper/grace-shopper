import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllItems} from '../store/item'

class AllItems extends Component {
  async componentDidMount() {
    await this.props.fetchAllItems()
  }

  render() {
    const allGames = this.props.allItems

    return (
      <div>
        {allGames.map(game => {
          return (
            <div className="game" key={game.id}>
              <img src={game.imageUrl} />
              <h3>{game.name}</h3>
              {/* change this to decimal!!! */}
              <p>CHANGE ME TO DECIMAL{game.price}</p>
            </div>
          )
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
