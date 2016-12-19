import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {teal700} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import Paper from 'material-ui/Paper'

import Navigation from './navigation'
import DataTable from './data_table'
import Models from './models'
import Navigo from 'navigo'

import listenTo from 'element-resize-detector'

import InjectTap from 'react-tap-event-plugin'
InjectTap()


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal700
  }
})

class App extends React.Component {

  constructor(props) {
    super(props)

    this.config = null
    this.userData = null

    this.state = {
      configured: false,
      model: null
    }

    this.router = new Navigo(null, true)

    this.getConfig()
  }

  getChildContext() {
    return {
      config: this.state.config
    }
  }

  loggedIn() {
    return this.userData
  }

  checkUser() {
    $.get(this.config.user_path)
    .done((data) => {
      this.setState({userData: data})
      this.setState({configured: true})
    })
    .fail(() => {
      // redirect to login
    })
  }

  getConfig() {
    $.get(this.props.config_path)
    .done((data) => {
      this.configApp(data)
    })
  }

  configApp(data) {
    this.config = data
    this.models = new Models(this.config.models)
    this.router.resolve()
    this.checkUser()
  }

  chooseModel(name) {
    this.router.navigate(this.findModel(name).root)
  }

  models() {
    return this.config.models || []
  }

  title() {
    if (this.state.model) {
      return "Redact > " + this.state.model.label
    } else {
      return 'Redact'
    }
  }

  render () {
    if(!this.state.configured) {
      return <div>Loading configuration</div>
    }
    if(!this.state.userData) {
      return <div>Loading user data</div>
    }
    return <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Navigation
          title={this.title()}
          configData={this.config}
          userData={this.state.userData}
          chooseModel={name => this.chooseModel(name)}
        />
        <div className="app-body">
          {this.currentContent()}
        </div>
      </div>
    </MuiThemeProvider>
  }

  currentContent() {
    if (this.state.model) {
      return <DataTable model={this.state.model} />
    } else {
      return <div>Select a model</div>
    }
  }
}

App.childContextTypes = {
  config: React.PropTypes.object,
}



$(() => {
  let target = $('#container')
  ReactDOM.render(<App config_path={target.data('config-path')} />, target.get(0))
})
