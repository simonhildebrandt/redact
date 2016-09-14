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

    this.state = {
      config: null,
      userData: false,
      model: null //, model: 'books'
    }

    this.getConfig()
  }

  loggedIn() {
    return this.state.userData;
  }

  checkUser() {
    $.get(this.state.config.user_path)
    .done((data) => {
      this.setState({userData: data})
    })
    .fail(() => {
      // Show link to login
    })
  }

  getConfig() {
    $.get(this.props.config_path)
    .done((data) => {
      this.configApp(data)
    })
  }

  configApp(data) {
    this.setState({config: data})
    if (this.models().length > 0) {
      this.setState({model: this.models()[0]})
    }
    this.checkUser()
  }

  chooseModel(name) {
    this.setState({model: this.findModel(name)})
  }

  models() {
    return this.state.config.models || []
  }

  findModel(name) {
    return this.models().find((m) => { return m.name == name })
  }

  title() {
    if (this.state.model) {
      return "Redact > " + this.state.model.label
    } else {
      return 'Redact'
    }
  }

  render () {
    if (!this.loggedIn()) {
      return <a href="/login?redirect_to=/admin">Login</a>
    }

    return <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Navigation
          title={this.title()}
          configData={this.state.config}
          userData={this.state.userData}
          chooseModel={(name) => this.chooseModel(name)}
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

$(() => {
  let target = $('#container')
  ReactDOM.render(<App config_path={target.data('config-path')} />, target.get(0))
})
