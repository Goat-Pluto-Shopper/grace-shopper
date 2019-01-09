import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = props => {
  const white = '#fff'
  return (
    // <nav id="nav-top">
    //   <svg width="30" height="30" id="icoOpen">
    //     <path d="M0,5 30,5" stroke={white} strokeWidth="5" />
    //     <path d="M0,14 30,14" stroke={white} strokeWidth="5" />
    //     <path d="M0,23 30,23" stroke={white} strokeWidth="5" />
    //   </svg>
    // </nav>
    <nav id="nav-top">
      <div id="ico">
        <Link to="/">
          <img src="imgs/placeholderLogo.png" className="nav-logo" alt="logo" />
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
        <Link to="/login">
          <span className="nav-login">
            {props.isLoggedIn ? props.user.firstName : 'Login'}
          </span>
        </Link>
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
