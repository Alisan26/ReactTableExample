import React from "react";
import classNames from 'classnames';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const CustomToolbar = props => {
    const { numSelected, DelbuttonClick, AddbuttonClick, classes } = props;
  return (
    <Toolbar className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0,
    })}>
      <div className={classes.title}>
      {numSelected > 0 ? (
        <Typography className={classes.managetext} variant="subtitle1">
          {numSelected} selected
        </Typography>
        ) : (
        <div className={classes.textcontainer}>
        <Typography variant="h6" className={classes.managetext}>
          Manage{"\u00A0"}
        </Typography>
        <Typography variant="h6" className={classes.employetext}>
          Employees
        </Typography>
        </div>
        )}
      </div>
      <div style={{display: "flex"}}>
        <Button onClick={DelbuttonClick} className={classes.Delbutton}>
          <FontAwesomeIcon
            variant="text"
            color="primary"
            className={classes.icons}
            icon="minus-circle"
          />
          Delete
        </Button>
        <Button onClick={AddbuttonClick} className={classes.Addbutton}>
          <FontAwesomeIcon className={classes.icons} icon="plus-circle" />
          Add New Employee
        </Button>
      </div>
    </Toolbar>
  );
};
const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    justifyContent: "space-between",
    backgroundColor: "#435d7d",
  },
  highlight:
    theme.palette.type === 'dark'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    employetext: {
      color: "white",
      fontWeight: "900",
      fontFamily: 'Lato',
    },
    managetext: {
      color: "white",
      fontFamily: 'Lato',
    },
    textcontainer: {
      display: "flex",
    },
    Addbutton: {
      color: "white",
      fontWeight: "600",
      backgroundColor: "#5cb85c",
      borderRadius: 2,
      textTransform: "none",
      fontFamily: 'Lato',
    },
    Delbutton: {
      color: "white",
      fontWeight: "600",
      backgroundColor: "#d9534f",
      borderRadius: 2,
      marginRight: 10,
      textTransform: "none",
      fontFamily: 'Lato',
    },
    icons: {
      marginRight: 7
    }
  });
  export default withStyles(styles)(CustomToolbar);
