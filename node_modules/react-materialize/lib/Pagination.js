'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _PaginationButton = require('./PaginationButton');

var _PaginationButton2 = _interopRequireDefault(_PaginationButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).call(this, props));

    _this.state = { activePage: _this.props.activePage };
    _this.renderButtons = _this.renderButtons.bind(_this);
    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(Pagination, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        { className: (0, _classnames2.default)('pagination', this.props.className) },
        ' ',
        this.renderButtons(),
        ' '
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick(i) {
      var _this2 = this;

      return function () {
        _this2.setState({ activePage: i });
        if (typeof _this2.props.onSelect === 'function') _this2.props.onSelect(i);
      };
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons() {
      var _props = this.props;
      var items = _props.items;
      var maxButtons = _props.maxButtons;
      var onSelect = _props.onSelect;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['items', 'maxButtons', 'onSelect', 'children']);

      var activePage = this.state.activePage;
      if (typeof chidlren !== 'undefined') return children;
      if (typeof maxButtons === 'undefined') maxButtons = items;
      maxButtons = Math.min(maxButtons, items);
      var buttons = [];
      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
      var startPage = Math.max(hiddenPagesBefore, 1);
      var endPage = Math.min(items, startPage + maxButtons - 1);
      buttons.push(_react2.default.createElement(
        _PaginationButton2.default,
        { key: 0, disabled: startPage == 1, onSelect: this._onClick(activePage - 1) },
        _react2.default.createElement(
          _Icon2.default,
          null,
          'chevron_left'
        )
      ));
      for (var i = startPage; i <= endPage; i++) {
        buttons.push(_react2.default.createElement(
          _PaginationButton2.default,
          { key: i, onSelect: this._onClick(i), active: i == this.state.activePage },
          i
        ));
      }
      buttons.push(_react2.default.createElement(
        _PaginationButton2.default,
        { key: items + 1, disabled: endPage == items, onSelect: this._onClick(activePage + 1) },
        _react2.default.createElement(
          _Icon2.default,
          null,
          'chevron_right'
        )
      ));
      return buttons;
    }
  }]);

  return Pagination;
}(_react2.default.Component);

Pagination.propTypes = {
  activePage: _react2.default.PropTypes.number,
  items: _react2.default.PropTypes.number.isRequired,
  maxButtons: _react2.default.PropTypes.number,
  onSelect: _react2.default.PropTypes.func
};

Pagination.defaultProps = {
  activePage: 1,
  items: 10
};

exports.default = Pagination;