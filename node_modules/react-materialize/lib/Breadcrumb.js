'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Col = require('./Col');

var _Col2 = _interopRequireDefault(_Col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Breadcrumb = function Breadcrumb(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'nav',
    { className: 'row' },
    _react2.default.createElement(
      'div',
      { className: 'nav-wrapper' },
      _react2.default.createElement(
        _Col2.default,
        { s: 12 },
        renderChildren(children)
      )
    )
  );
};

var renderChildren = function renderChildren(children) {
  return _react2.default.Children.map(children, function (item) {
    return _react2.default.cloneElement(item, { className: 'breadcrumb' });
  });
};

Breadcrumb.propTypes = {
  children: _react2.default.PropTypes.node,
  cols: _react2.default.PropTypes.number
};

exports.default = Breadcrumb;