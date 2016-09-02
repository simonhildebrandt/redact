import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import Navigation from './navigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {teal700} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FontIcon from 'material-ui/FontIcon'
import ContentAdd from 'material-ui/svg-icons/content/add'
import IconMenu from 'material-ui/IconMenu'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
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
      userData: false
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
    this.checkUser()
  }

  chooseModel(name) {
    console.log('model chosen ' + name)
  }

  render () {
    if (!this.loggedIn()) {
      return <a href="/login?redirect_to=/admin">Login</a>
    }

    return <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Navigation configData={this.state.config} userData={this.state.userData} chooseModel={this.chooseModel} />
        <div className="app-body">
          {this.dataTable()}
          <FloatingActionButton style={ {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          } }><ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    </MuiThemeProvider>
  }

  getTableHeight() {
    return '100%'
  }

  dataTable () {
    return <Table height={this.getTableHeight()} multiSelectable={true} fixedHeader={true} fixedFooter={true}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn>John Smith</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>2</TableRowColumn>
        <TableRowColumn>Randal White</TableRowColumn>
        <TableRowColumn>Unemployed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>3</TableRowColumn>
        <TableRowColumn>Stephanie Sanders</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>4</TableRowColumn>
        <TableRowColumn>Steve Brown</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableRowColumn>ID</TableRowColumn>
        <TableRowColumn>Name</TableRowColumn>
        <TableRowColumn>Status</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
          Super Footer
        </TableRowColumn>
      </TableRow>
    </TableFooter>
  </Table>
  }
}

$(() => {
  let target = $('#container')
  ReactDOM.render(<App config_path={target.data('config-path')} />, target.get(0))
})
