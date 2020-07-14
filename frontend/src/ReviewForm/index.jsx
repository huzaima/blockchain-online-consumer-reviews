import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Toolbar } from "@material-ui/core";

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  submit = () => {
    const { review } = this.state;
    if (review) {
      this.props.onSubmit(review);
    }
  };

  render() {
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
          <h2 style={{ color: "#FFFFFF" }}>Write a review</h2>
        </Toolbar>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            variant="outlined"
            label="Type here..."
            multiline={true}
            rows={6}
            onChange={this.handleChange("review")}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClose}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ReviewForm;
