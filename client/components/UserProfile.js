import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchToggle} from '../store/sideBarToggle'
import {getOrderHistory} from '../store/orderHistory'
import Grid from '@material-ui/core/Grid'
import ListItems from './ListItems'

class UserProfile extends Component {
  componentDidMount() {
    this.props.fetchToggle(false)
    this.props.getOrderHistory(this.props.user.id)
  }

  componentWillUnmount() {
    this.props.fetchToggle(true)
  }

  render() {
    const {user, items} = this.props
    return (
      <div className="profileContainer">
        {user === undefined ? null : (
          <div className="profileElement">
            <h1 id="profile">Profile</h1>
            <div>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <h3>{user.email}</h3>
            </div>
          </div>
        )}
        <div className="profileElement">
          <h1>Order History</h1>
          {items[0] === undefined ? null : (
            <Grid container spacing={24}>
              {items.map(item => {
                return (
                  <Grid item xs={12} sm={4} key={item.id}>
                    <ListItems game={item} />
                  </Grid>
                )
              })}
            </Grid>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  items: state.orderHistory.recentItems
})

const mapDispatchToProps = dispatch => ({
  fetchToggle: state => dispatch(fetchToggle(state)),
  getOrderHistory: userId => dispatch(getOrderHistory(userId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
)
