'use strict';

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

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider() {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var indicators = _props.indicators;
      var interval = _props.interval;
      var transition = _props.transition;

      $('.slider').slider({
        full_width: this.props.fullscreen,
        indicators: indicators,
        interval: interval,
        transition: transition
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var fullscreen = _props2.fullscreen;
      var children = _props2.children;
      var className = _props2.className;

      var props = _objectWithoutProperties(_props2, ['fullscreen', 'children', 'className']);

      var classes = {
        fullscreen: fullscreen,
        slider: true
      };
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(classes, className) },
        _react2.default.createElement(
          'ul',
          { className: 'slides' },
          children
        )
      );
    }
  }]);

  return Slider;
}(_react2.default.Component);

Slider.propTypes = {
  /**
  *
  */
  fullscreen: _react2.default.PropTypes.bool,
  /**
  * Set to false to hide slide indicators
  * @default true
  */
  indicators: _react2.default.PropTypes.bool,
  /**
  * The interval between transitions in ms
  * @default 6000
  */
  interval: _react2.default.PropTypes.number,
  /**
  * The duration of the transation animation in ms
  * @default 500
  */
  transition: _react2.default.PropTypes.number
};

Slider.defaultProps = {
  fullscreen: false,
  indicators: true,
  interval: 6000
};

exports.default = Slider;