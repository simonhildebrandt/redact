"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavItem = function (_React$Component) {
  _inherits(NavItem, _React$Component);

  function NavItem() {
    _classCallCheck(this, NavItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NavItem).apply(this, arguments));
  }

  _createClass(NavItem, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var divider = _props.divider;
      var href = _props.href;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ["divider", "href", "children"]);

      if (divider) {
        return _react2.default.createElement("li", { className: "divider" });
      } else {
        return _react2.default.createElement(
          "li",
          props,
          _react2.default.createElement(
            "a",
            { href: href },
            children
          )
        );
      }
    }
  }]);

  return NavItem;
}(_react2.default.Component);

NavItem.propTypes = {
  href: _react2.default.PropTypes.string,
  divider: _react2.default.PropTypes.bool
};

exports.default = NavItem;