import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../store'

const UserNavBar = props => {
  return (
    <div className="dropdown">
      <span className="nav-login user-nav dropbtn">{props.firstName}</span>
      <div className="dropdown-content">
        <div>
          <Link to="/profile">Profile</Link>
        </div>
        <div onClick={() => props.logout()}>
          <Link to="#">Log Out</Link>
        </div>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatch)(UserNavBar)
