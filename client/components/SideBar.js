import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchAllItems} from '../store/item'
import queryString from 'query-string'

class SideBar extends React.Component {
  constructor() {
    super()
    this.state = {
      category: [],
      ageRange: [],
      tags: []
    }
    this.onChangeCheck = this.onChangeCheck.bind(this)
  }

  async onChangeCheck(e) {
    const options = this.state[e.target.name]
    let index
    if (e.target.checked) {
      options.push(e.target.value)
    } else {
      index = options.indexOf(e.target.value)
      options.splice(index, 1)
    }
    await this.setState({[e.target.name]: options})
    const query = queryString.stringify(this.state)
    this.props.history.push({
      pathname: '/',
      search: query
    })
  }

  render() {
    return (
      <div id="sidebar">
        <form>
          <label htmlFor="ageRange">
            <h3>Age Range :</h3>
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="ageRange"
              value="4-7"
            />4-7
            <span className="checkmark" />
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="ageRange"
              value="7-12"
            />7-12
            <span className="checkmark" />
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="ageRange"
              value="12+"
            />12+
            <span className="checkmark" />
          </label>
          <label htmlFor="tags">
            <h3>Category :</h3>
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="category"
              value="board"
            />board
            <span className="checkmark" />
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="category"
              value="card"
            />card
            <span className="checkmark" />
          </label>
          <label htmlFor="tags">
            <h3>Tags :</h3>
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="tags"
              value="party games"
            />party
            <span className="checkmark" />
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="tags"
              value="group games"
            />group
            <span className="checkmark" />
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="tags"
              value="family games"
            />family
            <span className="checkmark" />
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="tags"
              value="educational"
            />educational
            <span className="checkmark" />
          </label>
          <label className="sidebar-check">
            <input
              onChange={this.onChangeCheck}
              type="checkbox"
              name="tags"
              value="guessing games"
            />guessing
            <span className="checkmark" />
          </label>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllItems: query => dispatch(fetchAllItems(query))
})

export default withRouter(connect(null, mapDispatchToProps)(SideBar))
