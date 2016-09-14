import $ from 'jquery'
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import ContentAdd from 'material-ui/svg-icons/content/add'


class DataTable extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      sort: this.primaryField().name,
      page: 0,
      data: null
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model.name != this.props.model.name) {
      this.setData(null)
    }
  }

  componentDidUpdate() {
    if (this.state.data == null) {
      this.getData()
    }
  }

  modelName() {
    return this.props.model.name
  }

  pluralPath() {
    return "/" + this.modelName()
  }

  getData() {
    $.get(this.pluralPath())
    .done((data) => {
      this.setData(data)
    })
  }

  setData(data) {
    this.setState({data: data})
  }

  primaryField() {
    return this.fields()[0] // TODO - ...or field.primary == true
  }

  addSortColumn(column) {
    this.setState({sort: this.state.sort + [column]})
  }

  getTableHeight() {
    return '100%'
  }

  fields() {
    return this.props.model.fields
  }

  headers() {
    return <TableHeader>
      <TableRow>
        { this.fields().map((field) => { return this.header(field) }) }
      </TableRow>
    </TableHeader>
  }

  header(field) {
    return <TableHeaderColumn key={field.id}>{field.label}</TableHeaderColumn>
  }

  rows() {
    if (!this.state.data) { return }
    return <TableBody>
      { this.state.data.map((data) => { return this.row(data) }) }
    </TableBody>
  }

  row(record) {
    return <TableRow>
      { this.fields().map((field) => { return this.column(field, record) } ) }
    </TableRow>
  }

  column(field, record) {
    return <TableRowColumn>{record[field.name]}</TableRowColumn>
  }

  render () {
    return <div>
      <Table height={this.getTableHeight()} multiSelectable={true} fixedHeader={true} fixedFooter={true}>
        {this.headers()}
        { this.rows() }
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
  }
}

module.exports = DataTable
