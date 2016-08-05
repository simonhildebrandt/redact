$ = require 'jquery'
M = require 'react-materialize'
React = require 'react'
ReactDom = require 'react-dom'
F = require './factories.coffee'

Navbar = React.createFactory(M.Navbar)

App = React.createClass
  displayName: 'App'
  render: ->
    Navbar {}

$ ->
  ReactDom.render React.createElement(App), $('#container').get(0)
