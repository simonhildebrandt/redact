'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchForm = function (_React$Component) {
    _inherits(SearchForm, _React$Component);

    function SearchForm() {
        _classCallCheck(this, SearchForm);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SearchForm).apply(this, arguments));
    }

    _createClass(SearchForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                null,
                _react2.default.createElement(
                    'div',
                    { 'class': 'input-field' },
                    _react2.default.createElement('input', { id: 'search', type: 'search', required: true }),
                    _react2.default.createElement(
                        'label',
                        { 'for': 'search' },
                        _react2.default.createElement(
                            _Icon2.default,
                            null,
                            'search'
                        )
                    ),
                    _react2.default.createElement(
                        _Icon2.default,
                        null,
                        'close'
                    )
                )
            );
        }
    }]);

    return SearchForm;
}(_react2.default.Component);

exports.default = SearchForm;