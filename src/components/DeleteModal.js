import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
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

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  headercontainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.unit * 4,
    height: 5,
  },
  subtitle: {
    padding: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 2,
  },
  subtitle2: {
    display: 'flex',
    padding: theme.spacing.unit * 2,
    backgroundColor: '#ECF0F1',
    justifyContent: 'flex-end',
  },
  cancelButton: {
      backgroundColor: 'white',
      color: '#333333',
      borderRadius: 2,
      borderColor: '#CCCCCC',
      fontFamily: 'Lato',
      textTransform: "none",
  },
  DeleteButton: {
    backgroundColor: '#D9534F',
    color: 'white',
    marginLeft: 8,
    borderRadius: 2,
    borderColor: '#CCCCCC',
    fontFamily: 'Lato',
    textTransform: "none",
}
});

const DeleteModal = props => {
  const { classes, open, deleteModalClose } = props;

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <div className={classes.headercontainer}>
            <Typography variant="h6" id="modal-title" style={{color:"#435d7d", fontFamily: 'Lato',}}>
              Delete Employee
            </Typography>
            <Button
              style={{
                display: "inline-block",
                padding: 10,
                minHeight: 10,
                minWidth: 10
              }}
              onClick={deleteModalClose}
            >
              <FontAwesomeIcon color="#d7d7d7" icon="times" />
            </Button>
          </div>
          <Divider className={classes.divider} light/>
          <div className={classes.subtitle}>
          <Typography style={{color: "#566787", fontFamily: 'Lato',}} variant="subtitle1" id="simple-modal-description">
            Are you sure you want to delete these Records?
          </Typography>
          <Typography style={{color: "#8A6D47", marginTop: 10,fontFamily: 'Lato',}} variant="subtitle2" id="simple-modal-description">
            This action cannot be undone.
          </Typography>
          </div>
          <div className={classes.subtitle2}>
         <Button className={classes.cancelButton} onClick={deleteModalClose}>
             Cancel
         </Button>
         <Button className={classes.DeleteButton}>
             Delete
         </Button>
          </div>
          <SimpleModalWrapped />
        </div>
      </Modal>
    </div>
  );
};
DeleteModal.defaultProps = {
    open: false,
  };
const SimpleModalWrapped = withStyles(styles)(DeleteModal);

export default SimpleModalWrapped;
