$ = require 'jquery'
React = require 'react'
ReactDom = require 'react-dom'
F = require './factories.coffee'
T = require 'material-ui'

InjectTap = require 'react-tap-event-plugin'

InjectTap()

[AppBar, Theme, IconMenu, IconButton, MoreVertIcon] = [
  React.createFactory(T.AppBar),
  React.createFactory(T.MuiThemeProvider),
  React.createFactory(T.IconMenu),
  React.createFactory(T.IconButton),
  React.createFactory(T.MoreVertIcon)
]

App = React.createClass
  displayName: 'App'

  render: ->
    Theme {},
      AppBar { title: 'Redact' , iconElementRight: @iconMenu() }

  iconMenu: ->
    IconMenu { iconButtonElement: @iconButton() }

  iconButton: ->
     IconButton {}

    #, targetOrigin={{horizontal: 'right', vertical: 'top'}}
    #  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  #     <MenuItem primaryText="Refresh" />
  #     <MenuItem primaryText="Help" />
  #     <MenuItem primaryText="Sign out" />
  #   </IconMenu>
  # }

$ ->
  ReactDom.render React.createElement(App), $('#container').get(0)
