import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOrderHistory} from '../store/orderHistory'

class UserProfile extends Component {
  componentDidMount() {
    this.props.getOrderHistory()
  }

  render() {
    const {user, items} = this.props
    return (
      <div className="profileContainer">
        {user === undefined ? null : (
          <div className="profileLeft">
            <h1 id="profile">Profile</h1>
            <div>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <h3>{user.email}</h3>
            </div>
          </div>
        )}
        <div className="profileRight">
          <h1>Order History</h1>
          {items[0] === undefined ? null : (
            <div>
              {items.map(item => {
                return (
                  <div key={item.id} className="orderItem">
                    <div className="orderItemLeft">
                      <img src={item.imageUrl} />
                    </div>
                    <div className="orderItemRight" />
                    <div className="orderPrice">
                      ${(item.price / 100).toFixed(2)}
                    </div>
                    <br />
                  </div>
                )
              })}
            </div>
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
  getOrderHistory: () => dispatch(getOrderHistory())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
)
