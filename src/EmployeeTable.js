import React, { Component } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
import CustomToolbar from "./components/CustomToolbar";
import CustomTableHead from "./components/CustomTableHead";
import DeleteModal from "./components/DeleteModal";
import AddEmployeeModal from "./components/AddEmployeeModal"

const titles = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "address", numeric: true, disablePadding: false, label: "Adress" },
  { id: "phone", numeric: true, disablePadding: false, label: "Phone" },
  { id: "actions", numeric: true, disablePadding: false, label: "Actions" }
];

let counter = 0;
function createData(name, email, address, phone, actions) {
  counter += 1;
  return { id: counter, name, email, address, phone, actions };
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class EmployeeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      page: 0,
      rowsPerPage: 5,
      usermock: [],
      openAddEmployee: false,
      openDellEmployee: false
    };
  }
  componentDidMount () {
    axios.get("http://127.0.0.1:5500/usermock.json").then(res => {
      this.setState({
        usermock: res.data.map((n, i) => {
          let nameUpper =
            res.data[i].name.substr(0, 1).toUpperCase() +
            res.data[i].name.substr(1);
          return createData(
            nameUpper,
            res.data[i].email,
            res.data[i].address,
            res.data[i].phone
          );
        })
      });
    });
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.usermock.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  DelbuttonClick = () => {
    this.setState({openDellEmployee: true})
  };
  AddbuttonClick = () => {
    this.setState({openAddEmployee: true})
  };
  deleteModalCloseFunc = ()=>{this.setState({openDellEmployee:false})}
  addEmployeeModelCloseFunc = () => {this.setState({openAddEmployee: false})}
  render() {
    const {
      usermock,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page
    } = this.state;
    const { classes } = this.props;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, usermock.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <CustomToolbar
          DelbuttonClick={this.DelbuttonClick}
          AddbuttonClick={this.AddbuttonClick}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <CustomTableHead
              sortlabelid="name"
              rows={titles}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={usermock.length}
            />
            <TableBody>
              {stableSort(usermock, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, i) => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={n.id}
                      style={
                        i % 2 === 0
                          ? { backgroundColor: "#fcfcfc" }
                          : { backgroundColor: "#fffff" }
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onClick={event => this.handleClick(event, n.id)}
                          classes={{root: classes.radio, checked: classes.checked}}
                        />
                      </TableCell>
                      <TableCell
                        className={classes.bodytext}
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {n.name}
                      </TableCell>
                      <TableCell className={classes.bodytext} numeric>
                        {n.email}
                      </TableCell>
                      <TableCell className={classes.bodytext} numeric>
                        {n.address}
                      </TableCell>
                      <TableCell className={classes.bodytext} numeric>
                        {n.phone}
                      </TableCell>
                      <TableCell className={classes.bodytext} numeric>
                        <Button
                          style={{
                            display: "inline-block",
                            padding: 10,
                            minHeight: 10,
                            minWidth: 10
                          }}
                        >
                          <FontAwesomeIcon color="#ffc72b" icon="pen" />
                        </Button>
                        <Button
                          style={{
                            display: "inline-block",
                            padding: 10,
                            minHeight: 10,
                            minWidth: 10
                          }}
                          onClick={this.DelbuttonClick}
                        >
                          <FontAwesomeIcon color="#f55649" icon="trash-alt" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usermock.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <DeleteModal open={this.state.openDellEmployee} deleteModalClose={this.deleteModalCloseFunc}/>
        <AddEmployeeModal open={this.state.openAddEmployee} addEmployeClose={this.addEmployeeModelCloseFunc}/>
      </Paper>
    );
  }
}
const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  bodytext: { color: "#435d7d", fontFamily: 'Lato', },
  radio: {
    '&$checked': {
      color: '#03A9F4'
    }
  },
  checked: {}
});
export default withStyles(styles)(EmployeeTable);
