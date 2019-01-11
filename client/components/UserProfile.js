import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchToggle} from '../store/sideBarToggle'
import {getPastItems} from '../store/orderHistory'

class UserProfile extends Component {
  async componentDidMount() {
    await this.props.fetchToggle(false)
    await this.props.getPastItems(this.props.user.id)
  }

  componentWillUnmount() {
    this.props.fetchToggle(true)
  }

  render() {
    const {user} = this.props
    console.log(this.props)
    return (
      <div>
        <div>
          <h1>PROFILE</h1>
          <div>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <h3>{user.email}</h3>
          </div>
        </div>
        <div>past ordered items</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchToggle: state => dispatch(fetchToggle(state)),
  getPastItems: userId => dispatch(getPastItems(userId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
)
