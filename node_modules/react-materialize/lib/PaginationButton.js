'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationButton = function (_React$Component) {
  _inherits(PaginationButton, _React$Component);

  function PaginationButton() {
    _classCallCheck(this, PaginationButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PaginationButton).apply(this, arguments));
  }

  _createClass(PaginationButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var active = _props.active;
      var disabled = _props.disabled;
      var children = _props.children;
      var href = _props.href;
      var className = _props.className;
      var onSelect = _props.onSelect;

      var props = _objectWithoutProperties(_props, ['active', 'disabled', 'children', 'href', 'className', 'onSelect']);

      var classes = {
        'waves-effect': true,
        disabled: disabled,
        active: active
      };
      return _react2.default.createElement(
        'li',
        _extends({ className: (0, _classnames2.default)(classes, className) }, props, { onClick: onSelect }),
        _react2.default.createElement(
          'a',
          { href: href },
          children
        )
      );
    }
  }]);

  return PaginationButton;
}(_react2.default.Component);

PaginationButton.propTypes = {
  active: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  href: _react2.default.PropTypes.string,
  onSelect: _react2.default.PropTypes.func
};

PaginationButton.defaultProps = {
  active: false,
  disabled: false,
  href: '#!'
};

exports.default = PaginationButton;