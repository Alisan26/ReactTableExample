import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const AddEmployeeModal = props => {
  const { classes, open, addEmployeClose } = props;

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <div className={classes.headercontainer}>
            <Typography
              variant="h6"
              id="modal-title"
              style={{ color: "#435d7d", fontFamily: "Lato" }}
            >
              Add Employee
            </Typography>
            <Button
              style={{
                display: "inline-block",
                padding: 10,
                minHeight: 10,
                minWidth: 10
              }}
              onClick={addEmployeClose}
            >
              <FontAwesomeIcon color="#d7d7d7" icon="times" />
            </Button>
          </div>
          <Divider className={classes.divider} light />
          <div className={classes.subtitle}>
            <Typography
              className={classes.typography}
              variant="subtitle1"
              id="simple-modal-description"
            >
              Name
            </Typography>
            <TextField
              id="outlined-name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Typography
              className={classes.typography}
              variant="subtitle1"
              id="simple-modal-description"
            >
              Email
            </Typography>
            <TextField
              id="outlined-email-input"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Typography
              className={classes.typography}
              variant="subtitle1"
              id="simple-modal-description"
            >
              Adress
            </Typography>
            <TextField
              id="outlined-textarea"
              multiline
              className={classes.multitextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Typography
              className={classes.typography}
              variant="subtitle2"
              id="simple-modal-description"
            >
              Phone
            </Typography>
            <TextField
              id="outlined-number"
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className={classes.subtitle2}>
            <Button className={classes.cancelButton} onClick={addEmployeClose}>
              Cancel
            </Button>
            <Button className={classes.AddButton}>Add</Button>
          </div>
          <SimpleModalWrapped />
        </div>
      </Modal>
    </div>
  );
};
const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  headercontainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.unit * 4,
    height: 5
  },
  subtitle: {
    padding: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 2
  },
  subtitle2: {
    display: "flex",
    padding: theme.spacing.unit * 2,
    backgroundColor: "#ECF0F1",
    justifyContent: "flex-end"
  },
  cancelButton: {
    backgroundColor: "white",
    color: "#333333",
    borderRadius: 2,
    borderColor: "#CCCCCC",
    fontFamily: "Lato",
    textTransform: "none"
  },
  AddButton: {
    backgroundColor: "#5CB85C",
    color: "white",
    marginLeft: 8,
    borderRadius: 2,
    borderColor: "#CCCCCC",
    fontFamily: "Lato",
    textTransform: "none",
    width: 20
  },
  textField: {
    marginLeft: 0,
    marginRight: theme.spacing.unit * 4,
    height: 40
  },
  multitextField: {
    marginLeft: 0,
    marginRight: theme.spacing.unit * 4
  },
  typography: {
    color: "#566787",
    fontFamily: "Lato",
    marginBottom: -theme.spacing.unit * 1
  }
});
AddEmployeeModal.defaultProps = {
  open: false
};
const SimpleModalWrapped = withStyles(styles)(AddEmployeeModal);

export default SimpleModalWrapped;
