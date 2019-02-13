# next-redux-saga

[![Build Status](https://travis-ci.org/bmealhouse/next-redux-saga.svg?branch=master)](https://travis-ci.org/bmealhouse/next-redux-saga)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg)](#contributors)

> redux-saga HOC for [Next.js](https://github.com/zeit/next.js/)

> **Attention:** Synchronous HOC is no longer supported since version 4.0.0!

## Installation

```sh
yarn add next-redux-saga
```

## Getting Started

Check out the official [Next.js example](https://github.com/zeit/next.js/tree/canary/examples/with-redux-saga) or clone this repository and run the local example.

### Try the local example

1. Clone this repository
1. Install dependencies: `yarn`
1. Start the project: `yarn start`
1. Open [http://localhost:3000](http://localhost:3000)

## Usage

`next-redux-saga` uses the redux store created by [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper). Please refer to their documentation for more information.

### Configure Store

```js
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware()

function configureStore(preloadedState) {

  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass`preloadedState`
   * when creating the store.
   */

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware)
  )

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store.
   *
   *   `sagaTask` is used to await the rootSaga task before sending results to the client
   *
   */

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
```

### Configure Custom App Component

```js
import React from 'react'
import {Provider} from 'react-redux'
import App, {Container} from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import configureStore from './configure-store'

class ExampleApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render() {
    const {Component, pageProps, store} = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(configureStore)(withReduxSaga(ExampleApp))
```

### Connect Page Components

```js
import React, {Component} from 'react'
import {connect} from 'react-redux'

class ExamplePage extends Component {
  static async getInitialProps({store}) {
    store.dispatch({type: 'SOME_ASYNC_ACTION_REQUEST'})
    return {staticData: 'Hello world!'}
  }

  render() {
    return <div>{this.props.staticData}</div>
  }
}

export default connect(state => state)(ExamplePage)
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/bmealhouse"><img src="https://avatars3.githubusercontent.com/u/3741255?v=4" width="100px;" alt="Brent Mealhouse"/><br /><sub><b>Brent Mealhouse</b></sub></a><br /><a href="https://github.com/bmealhouse/next-redux-saga/commits?author=bmealhouse" title="Code">💻</a> <a href="https://github.com/bmealhouse/next-redux-saga/commits?author=bmealhouse" title="Tests">⚠️</a> <a href="https://github.com/bmealhouse/next-redux-saga/commits?author=bmealhouse" title="Documentation">📖</a> <a href="#maintenance-bmealhouse" title="Maintenance">🚧</a> <a href="#question-bmealhouse" title="Answering Questions">💬</a></td><td align="center"><a href="https://bbortt.github.io"><img src="https://avatars0.githubusercontent.com/u/12272901?v=4" width="100px;" alt="Timon Borter"/><br /><sub><b>Timon Borter</b></sub></a><br /><a href="https://github.com/bmealhouse/next-redux-saga/commits?author=bbortt" title="Code">💻</a> <a href="https://github.com/bmealhouse/next-redux-saga/commits?author=bbortt" title="Tests">⚠️</a> <a href="https://github.com/bmealhouse/next-redux-saga/commits?author=bbortt" title="Documentation">📖</a> <a href="#maintenance-bbortt" title="Maintenance">🚧</a> <a href="#question-bbortt" title="Answering Questions">💬</a></td><td align="center"><a href="https://abzanov.com"><img src="https://avatars3.githubusercontent.com/u/5141037?v=4" width="100px;" alt="Artem Abzanov"/><br /><sub><b>Artem Abzanov</b></sub></a><br /><a href="https://github.com/bmealhouse/next-redux-saga/commits?author=JerryCauser" title="Code">💻</a> <a href="https://github.com/bmealhouse/next-redux-saga/commits?author=JerryCauser" title="Tests">⚠️</a> <a href="https://github.com/bmealhouse/next-redux-saga/commits?author=JerryCauser" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/RobbinHabermehl"><img src="https://avatars1.githubusercontent.com/u/1640272?v=4" width="100px;" alt="Robbin Habermehl"/><br /><sub><b>Robbin Habermehl</b></sub></a><br /><a href="https://github.com/bmealhouse/next-redux-saga/commits?author=RobbinHabermehl" title="Code">💻</a> <a href="https://github.com/bmealhouse/next-redux-saga/commits?author=RobbinHabermehl" title="Tests">⚠️</a> <a href="https://github.com/bmealhouse/next-redux-saga/commits?author=RobbinHabermehl" title="Documentation">📖</a></td></tr></table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
1. Install the dependecies: `yarn`
1. Link the package to the global module directory: `yarn link`
1. Run `yarn test --watch` and start making your changes
1. You can use `yarn link next-redux-saga` to test your changes in an actual project

## LICENSE

This project is licensed under the terms of MIT license. See the [license file](https://github.com/bmealhouse/next-redux-saga/blob/master/LICENSE) for more information.
