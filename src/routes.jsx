import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import store from './store'

import { AppContainer } from './containers'
import { BlogContainer } from './containers/blog'

import { REQUEST_ARTICLE_SUMMARY, REQUEST_MUSIC } from './constants/actionTypes'
import { fetchArticleIfNeeded } from './ducks/article'

const renderRoutes = history => (
  <Router history={history}>
    <Route
      path="/"
      component={AppContainer}
      onEnter={() => store.dispatch({ type: REQUEST_MUSIC })}
    >
      <IndexRedirect to="/note-blog" />
      <Route
        path="note-blog"
        component={BlogContainer}
        onEnter={() => store.dispatch({ type: REQUEST_ARTICLE_SUMMARY })}
      >
        <IndexRoute
          getComponent={({ routes, params, location }, callback) => {
            require.ensure([], (require) => {
              callback(null, require('./containers/blog').BlogHomeContainer)
            }, 'BlogHomeContainer')
          }}
        />
        <Route
          path=":category/:id/"
          getComponent={({ routes, params, location }, callback) => {
            require.ensure([], (require) => {
              callback(null, require('./containers/blog').BlogContentContainer)
            }, 'BlogContentContainer')
          }}
          onEnter={({ params }) => store.dispatch(fetchArticleIfNeeded(params.category, params.id))}
        />
      </Route>
      <Route
        path="app-list"
        getComponent={({ routes, params, location }, callback) => {
          require.ensure([], (require) => {
            callback(null, require('./containers/pages').AppListPage)
          }, 'AppListPage')
        }}
      />
      <Route
        path="photo"
        getComponent={({ routes, params, location }, callback) => {
          require.ensure([], (require) => {
            callback(null, require('./containers/pages').PhotoPage)
          }, 'PhotoPage')
        }}
      />
      <Route
        path="*"
        getComponent={({ routes, params, location }, callback) => {
          require.ensure([], (require) => {
            callback(null, require('./containers/pages').NotFoundPage)
          }, 'NotFoundPage')
        }}
        onEnter={() => alert('This page has not ready yet!')}
      />
    </Route>
  </Router>
)

export default renderRoutes