/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { createStructuredSelector } from 'reselect';

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import {
  selectUsername,
} from './selectors';

import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';

import CellTextField from 'components/CellTextField';


import styles from './styles.css';

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];


export class HomePage extends React.Component {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/features'
   */
  openFeaturesPage = () => {
    this.openRoute('/features');
  };

  addRow = () => {
    const rowNum = this.state.rowNum;
    this.setState({ rowNum: rowNum + 1 });
  };

  removeRow = () => {
    const rowNum = this.state.rowNum;
    if (this.state.rowNum > 1) {
      this.setState({ rowNum: rowNum -1 });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      rowNum: 1,
    };
  }

  render() {

    let rows = [];
    for (let i=0; i<this.state.rowNum; i++) {
      rows.push(
        <TableRow key={i}>
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
      );
    }

    return (
      <div className={styles.homePage}>
        <div className={styles.betTable}>
          <Table
            fixedHeader={true}
            fixedFooter={false}
            selectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
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
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover={true}
              stripedRows={false}
            >
              {rows.map( (row) => (row))}
            </TableBody>
          </Table>
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
