import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import UserNavBar from './UserNavBar'

const Navbar = props => {
  return (
    <nav id="nav-top">
      <div id="ico">
        <Link to="/">
          {/* <img src="imgs/placeholderLogo.png" className="nav-logo" alt="logo" /> */}
          <h1 className="stat-font" style={{margin: '0'}}>
            ({'\u00A0'} Pluto Games {'\u00A0'}
            {'\u00A0'}
            {'\u00A0'}
            {'\u00A0'}
            {'\u00A0'}
            {'\u00A0'} )
          </h1>
        </Link>
      </div>
      <div id="nav">
        <ul>
          <Link to="/">
            <li>Show All</li>
          </Link>
          <Link to="/board">
            <li>Board</li>
          </Link>
          <Link to="/card">
            <li>Card</li>
          </Link>
        </ul>
      </div>
      <div id="nav-right">
        {props.isLoggedIn ? (
          <UserNavBar firstName={props.user.firstName} />
        ) : (
          <Link to="/login">
            <span className="nav-login">Login</span>
          </Link>
        )}
        <i className="fas fa-shopping-cart" />
      </div>
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
