import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllItems} from '../store/item'

class AllItems extends Component {
  componentDidMount() {}

  render() {
    return <div>all games view</div>
  }
}

const mapStateToProps = state => ({
  allItems: state.allItems
})

const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => dispatch(fetchAllItems())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllItems)
)
