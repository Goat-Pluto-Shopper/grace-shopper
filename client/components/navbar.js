import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import UserNavBar from './UserNavBar'

const cartNum = cart =>
  cart.reduce((total, items) => items.cartQuantity + total, 0)

const Navbar = props => {
  return (
    <nav id="nav-top">
      <div id="ico">
        <Link to="/">
          <h1 className="stat-font" style={{margin: '0'}}>
            Pluto Games
          </h1>
        </Link>
      </div>
      <div id="nav">
        <ul id="nav-categories">
          <Link to="/">
            <li>All GAMES</li>
          </Link>
          •
          <Link to="/board">
            <li>Board Games</li>
          </Link>
          •
          <Link to="/card">
            <li>Card Games</li>
          </Link>
        </ul>
      </div>
      <div id="nav-right">
        {props.isLoggedIn ? (
          <UserNavBar firstName={props.user.firstName} />
        ) : (
          <div className="dropdown">
            <span className="nav-login user-nav dropbtn">
              <Link to="/login">Login</Link>
            </span>
            <div className="dropdown-content">
              <div>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        )}
        <Link to="/cart" className="user-nav">
          <i className="fas fa-shopping-cart" />
          &nbsp;
          {cartNum(props.cart) > 0 && cartNum(props.cart)}
        </Link>
      </div>
    </nav>
  )
}

{
  /* <React.Fragment>
              <Link to="/login">
                <span className="nav-login">Login</span>
              </Link>
            </React.Fragment> */
}

{
  /* <div className="dropdown">
  <span className="nav-login user-nav dropbtn"><Link to="/login">Login</Link></span>
  <div className="dropdown-content">
    <div>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
</div> */
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart
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
