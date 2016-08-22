import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {teal700} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar'
import Popover from 'material-ui/Popover'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FontIcon from 'material-ui/FontIcon'
import ExpandIcon from 'material-ui/svg-icons/navigation/expand-more'
import ContentAdd from 'material-ui/svg-icons/content/add'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'

import InjectTap from 'react-tap-event-plugin'
InjectTap()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal700
  }
})

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      config: null,
      userLoggedIn: false,
      userMenuOpen: false,
      drawerOpen: false
    }

    this.getConfig()
  }

  checkUser() {
    $.get()
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

  openUserMenu(event) {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      userMenuOpen: true,
      anchorEl: event.currentTarget,
    })
  }

  openSideDrawer(event) {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      drawerOpen: true
    })
  }

  handleLogout() {
    event.preventDefault()
    console.log('logging out')
    this.closeUserMenu()
  }

  closeUserMenu(){
    this.setState({
      userMenuOpen: false
    })
  }

  render () {
    return <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar
          title='Redact'
          iconElementLeft={this.sideDrawer()}
          iconElementRight={this.userMenu()} />
        <Popover
          open={this.state.userMenuOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.closeUserMenu()}
        >
          <Menu>
            <MenuItem
              primaryText="Sign out"
              onTouchTap={() => this.handleLogout()}
            />
          </Menu>
        </Popover>
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={(open) => this.setState({drawerOpen: open})}
        >
        <List>
          <Subheader>Models</Subheader>
          <ListItem primaryText="Inbox" />
          <ListItem primaryText="Starred" />
          <ListItem primaryText="Sent mail" />
          <ListItem primaryText="Drafts" />
          <ListItem primaryText="Inbox" />
        </List>
    <Divider />
        </Drawer>
        {this.dataTable()}
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={0} style={{ bottom: 20, position: 'fixed' }}>
            <BottomNavigationItem icon={<ExpandIcon />} label="Recents" />
          </BottomNavigation>
        </Paper>
      <FloatingActionButton style={style}><ContentAdd /></FloatingActionButton>
    </div>
  </MuiThemeProvider>
  }

  sideDrawer () {
    return <IconButton onTouchTap={(event) => this.openSideDrawer(event)}><MenuIcon /></IconButton>
  }

  dataTable () {
    return <Table multiSelectable={true}>
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
  </Table>
  }

  userMenu () {
    return <FlatButton
      onTouchTap={(event) => this.openUserMenu(event)}
      label="Simon"
      labelPosition="before"
      primary={true}
      icon={<ExpandIcon />}
    />
  }
}

$(() => {
  let target = $('#container')
  ReactDOM.render(<App config_path={target.data('config-path')} />, target.get(0))
})
