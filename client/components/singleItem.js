import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSingleItem, fetchRelatedItems} from '../store/item'
import {fetchToggle} from '../store/sideBarToggle'
import ListItems from './ListItems'
import AddToCart from './AddToCart'

class SingleItem extends Component {
  componentDidMount() {
    // console.log(this.props.match.params.id, 'props from single item');
    this.props.fetchSingleItem(this.props.match.params.id)
    this.props.fetchRelatedItems(this.props.match.params.id)
    this.props.fetchToggle(false)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchSingleItem(this.props.match.params.id)
      this.props.fetchRelatedItems(this.props.match.params.id)
    }
  }

  componentWillUnmount() {
    this.props.fetchToggle(true)
  }

  render() {
    const {selectedItem, relatedItems} = this.props
    return (
      <React.Fragment>
        {this.props.selectedItem.name && (
          <div id="singleItemContainer">
            <div id="singleItemImg">
              <img src={selectedItem.imageUrl} />
            </div>
            <div id="singleItemInfo">
              <h1>{selectedItem.name}</h1>
              <h3>${(selectedItem.price / 100).toFixed(2)}</h3>
              <p>{selectedItem.description}</p>
              {/* need to add quantity component here */}
              <AddToCart item={this.props.selectedItem} />
            </div>
          </div>
        )}

        {relatedItems.length > 0 ? (
          <div>
            <h3>Related items</h3>
            <div id="singleRelatedContainer">
              {relatedItems.map(game => (
                <ListItems key={game.id} game={game} />
              ))}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  selectedItem: state.item.selectedItem,
  relatedItems: state.item.relatedItems
})

const mapDispatchToProps = dispatch => ({
  fetchSingleItem: id => dispatch(fetchSingleItem(id)),
  fetchRelatedItems: id => dispatch(fetchRelatedItems(id)),
  fetchToggle: state => dispatch(fetchToggle(state))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleItem)
)
