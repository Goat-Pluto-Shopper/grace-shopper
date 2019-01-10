import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/item'

class SingleItem extends Component {
  componentDidMount() {
    // console.log(this.props.match.params.id, 'props from single item');
    this.props.fetchSingleItem(this.props.match.params.id)
  }

  render() {
    const {selectedItem} = this.props
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
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  selectedItem: state.item.selectedItem
})

const mapDispatchToProps = dispatch => ({
  fetchSingleItem: id => dispatch(fetchSingleItem(id))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleItem)
)
