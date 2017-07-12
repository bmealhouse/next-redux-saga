'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxSaga = require('redux-saga');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withReduxSaga(BaseComponent) {
  var WrappedComponent = function (_Component) {
    (0, _inherits3.default)(WrappedComponent, _Component);

    function WrappedComponent() {
      (0, _classCallCheck3.default)(this, WrappedComponent);
      return (0, _possibleConstructorReturn3.default)(this, (WrappedComponent.__proto__ || (0, _getPrototypeOf2.default)(WrappedComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(WrappedComponent, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(BaseComponent, this.props);
      }
    }], [{
      key: 'getInitialProps',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
          var isServer, store, props;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  isServer = ctx.isServer, store = ctx.store;
                  props = void 0;

                  if (!BaseComponent.getInitialProps) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 5;
                  return BaseComponent.getInitialProps(ctx);

                case 5:
                  props = _context.sent;

                case 6:
                  if (!isServer) {
                    _context.next = 10;
                    break;
                  }

                  store.dispatch(_reduxSaga.END);
                  _context.next = 10;
                  return store.sagaTask.done;

                case 10:
                  return _context.abrupt('return', props);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x) {
          return _ref.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);
    return WrappedComponent;
  }(_react.Component);

  return WrappedComponent;
}

exports.default = withReduxSaga;
