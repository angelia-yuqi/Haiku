import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './AppContainer.less'
import Header from '../components/Header/Header'
import { fetchMusicList } from '../redux/actions'

@connect(
  (state) => ({
    ...state,
    pathname: state.routing.locationBeforeTransitions.pathname
  })
)
export default class AppContainer extends Component {
  static propTypes = {
    musicList: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.dispatch(fetchMusicList())
  }

  render() {
    const { musicList, pathname, dispatch } = this.props
    return (
      <div className="main-app">
        <Header {...{ musicList, pathname, dispatch }}/>
        {this.props.children}
      </div>
    )
  }
}
