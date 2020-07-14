import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Toolbar } from "@material-ui/core";

class ReviewSuccess extends Component {
  render() {
    const { success } = this.props;
    return (
      <Dialog fullWidth open={true} maxWidth="sm">
        <Toolbar
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#3F51B5",
            marginBottom: 16,
          }}
        >
          <h2 style={{ color: "#FFFFFF" }}>Review successfully saved</h2>
        </Toolbar>
        <DialogContent>
          <DialogContentText>
            {`IPFS hash: `}
            <a
              target="_blank"
              href={`https://ipfs.io/ipfs/${success}?filename=${success}`}
            >
              {success}
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClose}
            color="primary"
            variant="contained"
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ReviewSuccess;
