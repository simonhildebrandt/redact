'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Overlay2 = require('./Overlay');

var _Overlay3 = _interopRequireDefault(_Overlay2);

var _idgen = require('./idgen');

var _idgen2 = _interopRequireDefault(_idgen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OverlayTrigger = function (_Overlay) {
  _inherits(OverlayTrigger, _Overlay);

  function OverlayTrigger(props) {
    _classCallCheck(this, OverlayTrigger);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OverlayTrigger).call(this, props));

    _this.state = { isOverlayShown: false };
    _this.showOverlay = _this.showOverlay.bind(_this);
    _this.renderOverlay = _this.renderOverlay.bind(_this);
    _this.overlayID = 'overlay_' + (0, _idgen2.default)();
    return _this;
  }

  _createClass(OverlayTrigger, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var overlay = _props.overlay;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['overlay', 'children']);

      var child = _react2.default.Children.only(children);
      return _react2.default.cloneElement(child, { onClick: this.showOverlay });
    }
  }, {
    key: 'renderOverlay',
    value: function renderOverlay() {
      return _react2.default.cloneElement(this.props.overlay, { onRequestHide: this.toggle, id: this.overlayID });
    }
  }, {
    key: 'showOverlay',
    value: function showOverlay() {
      $('#' + this.overlayID).openModal();
    }
  }]);

  return OverlayTrigger;
}(_Overlay3.default);

OverlayTrigger.propTypes = {
  /**
   *
   */
  overlay: _react2.default.PropTypes.node
};

exports.default = OverlayTrigger;