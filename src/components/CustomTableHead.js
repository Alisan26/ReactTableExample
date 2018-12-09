import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

class CustomTableHead extends React.Component {
  constructor(props) {
    super(props);
    this.rows = props.rows;
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;
    const { classes } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" className={classes.head}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              classes={{root: classes.radio, checked: classes.checked}}
            />
          </TableCell>
          {this.rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                {row.id === this.props.sortlabelid && (
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                      className={classes.text}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                )}
                {row.id !== this.props.sortlabelid && (
                  <TableSortLabel className={classes.text}>
                    {row.label}
                  </TableSortLabel>
                )}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const styles = theme => ({
  text: { color: "#435d7d", fontWeight: "900", fontFamily: 'Lato', },
  radio: {
    '&$checked': {
      color: '#03A9F4'
    },
  },
  checked: {},
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0
  }
});

export default withStyles(styles)(CustomTableHead);
