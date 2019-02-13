# next-redux-saga
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://travis-ci.org/bmealhouse/next-redux-saga.svg?branch=master)](https://travis-ci.org/bmealhouse/next-redux-saga)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> redux-saga HOC for [Next.js](https://github.com/zeit/next.js/)

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
   * next-redux-saga depends on `runSagaTask` and `sagaTask` being attached to the store.
   *
   *   `runSagaTask` is used to rerun the rootSaga on the client when in sync mode (default)
   *   `sagaTask` is used to await the rootSaga task before sending results to the client
   *
   */

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  // run the rootSaga initially
  store.runSagaTask()
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
| [<img src="https://avatars0.githubusercontent.com/u/12272901?v=4" width="100px;" alt="Timon Borter"/><br /><sub><b>Timon Borter</b></sub>](https://bbortt.github.io)<br />[💻](https://github.com/bmealhouse/next-redux-saga/commits?author=bbortt "Code") [💬](#question-bbortt "Answering Questions") [🚧](#maintenance-bbortt "Maintenance") [⚠️](https://github.com/bmealhouse/next-redux-saga/commits?author=bbortt "Tests") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->
| [![Brent Mealhouse](https://github.com/bmealhouse.png?size=100)](https://github.com/bmealhouse) | [![Artem Abzanov](https://github.com/JerryCauser.png?size=100)](https://github.com/JerryCauser) | [![Robbin Habermehl](https://github.com/RobbinHabermehl.png?size=100)](https://github.com/RobbinHabermehl) |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [Brent Mealhouse](https://github.com/bmealhouse)                                                | [Artem Abzanov](https://github.com/JerryCauser)                                                 | [Robbin Habermehl](https://github.com/RobbinHabermehl)                                                     |

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
1. Install the dependecies: `yarn`
1. Link the package to the global module directory: `yarn link`
1. Run `yarn test --watch` and start making your changes
1. You can use `yarn link next-redux-saga` to test your changes in an actual project

## LICENSE

MIT
