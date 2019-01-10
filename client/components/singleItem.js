import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSingleItem, fetchRelatedItems} from '../store/item'
import ListItems from './ListItems'

class SingleItem extends Component {
  componentDidMount() {
    // console.log(this.props.match.params.id, 'props from single item');
    this.props.fetchSingleItem(this.props.match.params.id)
    this.props.fetchRelatedItems(this.props.match.params.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchSingleItem(this.props.match.params.id)
      this.props.fetchRelatedItems(this.props.match.params.id)
    }
  }

  render() {
    const {selectedItem, relatedItems} = this.props
    return (
      <React.Fragment>
        {this.props.selectedItem.name && (
          <React.Fragment>
            <div>
              <img src={selectedItem.imageUrl} />
            </div>
            <div>
              <h1>{selectedItem.name}</h1>
              <h3>${selectedItem.price}</h3>
              <p>{selectedItem.description}</p>
              {/* need to add quantity component here */}
            </div>
          </React.Fragment>
        )}

        <div>
          <h3>Related items</h3>
          <div>
            {relatedItems.length > 0 &&
              relatedItems.map(game => <ListItems key={game.id} game={game} />)}
          </div>
        </div>
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
  fetchRelatedItems: id => dispatch(fetchRelatedItems(id))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleItem)
)
