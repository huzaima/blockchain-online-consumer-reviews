import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import axios from "axios";

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount = async () => {
    const response = await axios.get(
      "https://my-json-server.typicode.com/jubs16/Products/Products"
    );
    const { data } = response;
    this.setState({ data });
  };
  render() {
    return (
      <React.Fragment>
        <Box component={Paper}>
          <Toolbar
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#3F51B5",
            }}
          >
            <h2 style={{ color: "#FFFFFF" }}>Products to review</h2>
          </Toolbar>
          <TableContainer style={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((row) => (
                  <TableRow
                    key={row.name}
                    onClick={() => this.props.onClick(row)}
                  >
                    <TableCell>
                      <img
                        src={row.imgUrl}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </React.Fragment>
    );
  }
}

export default ReviewList;
