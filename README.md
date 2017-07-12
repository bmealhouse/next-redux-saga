# next-redux-saga

[![Build Status](https://travis-ci.org/bmealhouse/next-redux-saga.svg?branch=master)](https://travis-ci.org/bmealhouse/next-redux-saga)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> redux-saga HOC for [Next.js](https://github.com/zeit/next.js/)

## Installation

```sh
yarn add next-redux-saga
```

## Usage

`next-redux-saga` uses the redux store created by [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper).  Please refer to their documentation for more information.

The working example below is based off [pages/index.js](https://github.com/bmealhouse/next-redux-saga/blob/master/pages/index.js).

> **Try it out:**
>
> 1. Clone this repository
> 2. Install dependencies: `yarn`
> 3. Start the project: `yarn start`
> 4. Visit [http://localhost:3000](http://localhost:3000)

**root-reducer.js**

```js
function rootReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_REDUX_PROP':
      return {...state, redux: action.data}
    case 'GET_REDUX_SAGA_PROP_SUCCESS':
      return {...state, reduxSaga: action.data}
    default:
      return state
  }
}
```

**root-saga.js**

```js
import {delay} from 'redux-saga'
import {all, call, put, takeEvery} from 'redux-saga/effects'

function helloSaga() {
  console.log('Hello Saga!')
}

function* getReduxSagaPropSaga() {
  yield call(delay, 500)
  yield put({
    type: 'GET_REDUX_SAGA_PROP_SUCCESS',
    data: 'Hello redux-saga!'
  })
}

function* rootSaga() {
  yield all([
    call(helloSaga),
    takeEvery('GET_REDUX_SAGA_PROP', getReduxSagaPropSaga)
  ])
}
```

**configure-store.js**

```js
import createSagaMiddleware from 'redux-saga'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  // NOTE: you must attach `sagaTask` to the store
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}
```

**example-page.js**

```js
import React, {Component} from 'react'
import {string} from 'prop-types'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

class ExamplePage extends Component {
  static propTypes = {
    static: string,
    redux: string,
    reduxSaga: string
  }

  static async getInitialProps({store}) {
    store.dispatch({type: 'GET_REDUX_PROP', data: 'Hello redux!'})
    store.dispatch({type: 'GET_REDUX_SAGA_PROP'})
    return {static: 'Hello static!'}
  }

  render() {
    return (
      <ul>
        <li>prop from getInitialProps: {this.props.static}</li>
        <li>prop from redux: {this.props.redux}</li>
        <li>prop from redux-saga: {this.props.reduxSaga}</li>
      </ul>
    )
  }
}

export default withRedux(configureStore, state => state)(
  withReduxSaga(ExamplePage)
)
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/3741255?v=3" width="100px;"/><br /><sub>Brent Mealhouse</sub>](https://twitter.com/bmealhouse)<br />[💻](https://github.com/bmealhouse/next-redux-saga/commits?author=bmealhouse "Code") [📖](https://github.com/bmealhouse/next-redux-saga/commits?author=bmealhouse "Documentation") [⚠️](https://github.com/bmealhouse/next-redux-saga/commits?author=bmealhouse "Tests") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Install the dependecies: `yarn`
3. Link the package to the global module directory: `yarn link`
4. Run `yarn test -- --watch` and start making your changes
5. You can use `yarn link next-redux-saga` to test your changes in an actual project

## LICENSE

MIT
