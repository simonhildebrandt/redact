'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _idgen = require('./idgen');

var _idgen2 = _interopRequireDefault(_idgen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideNav = function (_React$Component) {
  _inherits(SideNav, _React$Component);

  function SideNav(props) {
    _classCallCheck(this, SideNav);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SideNav).call(this, props));
  }

  _createClass(SideNav, [{
    key: 'render',
    value: function render() {
      var id = 'sidenav_' + (0, _idgen2.default)();
      return _react2.default.createElement(
        'nav',
        null,
        _react2.default.createElement(
          'ul',
          { className: 'right hide-on-med-and-down' },
          this.props.children
        ),
        _react2.default.createElement(
          'ul',
          { id: id, className: 'side-nav' },
          this.props.children
        ),
        _react2.default.createElement(
          'a',
          { href: '#', 'data-activates': id, className: 'button-collapse' },
          _react2.default.createElement(
            _Icon2.default,
            null,
            'view_headline'
          )
        )
      );
    }
  }]);

  return SideNav;
}(_react2.default.Component);

SideNav.propTypes = {
  /**
   * side navigation bar placement
   */
  right: _react2.default.PropTypes.bool,
  left: _react2.default.PropTypes.bool
};

exports.default = SideNav;