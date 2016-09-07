/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
// import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { createStructuredSelector } from 'reselect';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CellTextField from 'components/CellTextField';


import styles from './styles.css';


export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowIndex: [0],
    };
  }

  addRow = () => {
    const rowIndex = this.state.rowIndex.slice();
    rowIndex.push(this.state.rowIndex[this.state.rowIndex.length - 1] + 1);
    this.setState({ rowIndex });
  };

  removeRow = () => {
    const rowIndex = this.state.rowIndex.slice();
    rowIndex.pop();
    if (rowIndex.length > 0) {
      this.setState({ rowIndex });
    }
  };

  render() {
    // console.log(this.state.rowIndex);
    return (
      <div className={styles.homePage}>
        <div className={styles.betTable}>

          <Table fixedHeader selectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn
                  colSpan="4"
                  style={{
                    textAlign: 'center',
                    fontSize: '16px',
                  }}
                >
                  Please input bets
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>
                  <CellTextField width="100%" label="WIN Commission Rate" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <CellTextField width="100%" label="PLACE Commission Rate" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <CellTextField width="100%" label="EXACT Commission Rate" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <CellTextField width="100%" label="QUINELLA Commission Rate" />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              stripedRows={false}
            >
              {this.state.rowIndex.map((index) => (
                <TableRow
                  key={index}
                >
                  <TableRowColumn>
                    <CellTextField width="50%" label="Horse Num" />
                    <CellTextField width="50%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField width="50%" label="Horse Num" />
                    <CellTextField width="50%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField width="33%" label="Horse Num" />
                    <CellTextField width="33%" label="Horse Num" />
                    <CellTextField width="33%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField width="33%" label="Horse Num" />
                    <CellTextField width="33%" label="Horse Num" />
                    <CellTextField width="33%" label="Amount" />
                  </TableRowColumn>
                </TableRow>
              ))}

            </TableBody>
          </Table>

        </div>
        <div className={styles.resultSection} key="mark">
          <CellTextField width="100%" label="First horse number" />
          <CellTextField width="100%" label="Second horse number" />
          <CellTextField width="100%" label="Third horse number" />
        </div>
        <div className={styles.rowChangeButton}>
          <FloatingActionButton onClick={this.addRow}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton onClick={this.removeRow}>
            <ContentRemove />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,

};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({

});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
