import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  LogInForm,
  SignUpForm,
  AllItems,
  NotFound,
  SingleItem,
  UserProfile,
  Cart,
  CheckoutForm
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={AllItems} />
        <Route path="/login" component={LogInForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/board" component={AllItems} />
        <Route path="/card" component={AllItems} />
        <Route path="/game/:id" component={SingleItem} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={CheckoutForm} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* redirects here after login might need to change that especially if checking out*/}
            <Route path="/profile" component={UserProfile} />
          </Switch>
        )}
        {/* Displays store homepage (all items view) regarless of whether user is logged in. */}
        <Route component={NotFound} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
