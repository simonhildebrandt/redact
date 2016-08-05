'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toast = function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast(props) {
    _classCallCheck(this, Toast);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toast).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(Toast, [{
    key: 'render',
    value: function render() {
      var classes = {
        toast: true,
        rounded: this.props.rounded
      };
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['className', 'children']);

      return _react2.default.createElement(
        _Button2.default,
        { onClick: this.onClick, className: (0, _classnames2.default)(classes) },
        children
      );
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      Materialize.toast(this.props.toast, 1000);
    }
  }]);

  return Toast;
}(_react2.default.Component);

Toast.propTypes = {
  toast: _react2.default.PropTypes.string.isRequired,
  rounded: _react2.default.PropTypes.bool
};

exports.default = Toast;