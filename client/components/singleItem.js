import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/item'

class SingleItem extends Component {
  componentDidMount() {}

  render() {
    return <div>single game view</div>
  }
}

const mapStateToProps = state => ({
  selectedItem: state.selectedItem
})

const mapDispatchToProps = dispatch => ({
  fetchSingleItem: () => dispatch(fetchSingleItem())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleItem)
)
