import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchToggle} from '../store/sideBarToggle'

class UserProfile extends Component {
  async componentDidMount() {
    await this.props.fetchToggle(false)
  }

  componentWillUnmount() {
    this.props.fetchToggle(true)
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <div>
          <h1>PROFILE</h1>
          <div>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
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
  fetchToggle: state => dispatch(fetchToggle(state))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
)
