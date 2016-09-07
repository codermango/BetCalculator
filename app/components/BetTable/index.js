/**
*
* BetTable
*
*/

import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import CellTextField from 'components/CellTextField';

import styles from './styles.css';

class BetTable extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      commission: {
        w: 0.15,
        p: 0.12,
        e: 0.18,
        q: 0.18,
      },
      rowData: [
        { w: { horse: ['1'], amount: 3 }, p: { horse: ['1'], amount: 31 }, e: { horse: ['1', '2'], amount: 13 }, q: { horse: ['1', '2'], amount: 19 } },
        { w: { horse: ['2'], amount: 4 }, p: { horse: ['2'], amount: 89 }, e: { horse: ['2', '3'], amount: 98 }, q: { horse: ['2', '3'], amount: 77 } },
        { w: { horse: ['3'], amount: 5 }, p: { horse: ['3'], amount: 28 }, e: { horse: ['1', '3'], amount: 82 }, q: { horse: ['1', '3'], amount: 26 } },
        { w: { horse: ['4'], amount: 5 }, p: { horse: ['4'], amount: 72 }, e: { horse: ['3', '2'], amount: 27 }, q: { horse: ['2', '4'], amount: 63 } },
        { w: { horse: ['1'], amount: 16 }, p: { horse: ['1'], amount: 40 }, e: { horse: ['1', '2'], amount: 5 }, q: { horse: ['1', '2'], amount: 66 } },
        { w: { horse: ['2'], amount: 8 }, p: { horse: ['2'], amount: 16 }, e: { horse: ['2', '3'], amount: 61 }, q: { horse: ['2', '3'], amount: 82 } },
        { w: { horse: ['3'], amount: 22 }, p: { horse: ['3'], amount: 82 }, e: { horse: ['1', '3'], amount: 28 }, q: { horse: ['1', '3'], amount: 90 } },
        { w: { horse: ['4'], amount: 57 }, p: { horse: ['4'], amount: 52 }, e: { horse: ['3', '2'], amount: 25 }, q: { horse: ['2', '4'], amount: 48 } },
        { w: { horse: ['1'], amount: 42 }, p: { horse: ['1'], amount: 18 }, e: { horse: ['1', '2'], amount: 81 }, q: { horse: ['1', '2'], amount: 18 } },
        { w: { horse: ['2'], amount: 98 }, p: { horse: ['2'], amount: 74 }, e: { horse: ['2', '3'], amount: 47 }, q: { horse: ['2', '3'], amount: 93 } },
        { w: { horse: ['3'], amount: 63 }, p: { horse: ['3'], amount: 39 }, e: { horse: ['1', '3'], amount: 93 }, q: { horse: ['1', '3'], amount: 62 } },
        { w: { horse: ['4'], amount: 15 }, p: { horse: ['4'], amount: 105 }, e: { horse: ['3', '2'], amount: 51 }, q: { horse: ['2', '4'], amount: 25 } },
      ],
    };
  }

  render() {
    return (
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
                <CellTextField defaultValue={this.state.commission.w.toString()} width="100%" label="WIN Commission Rate" />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField defaultValue={this.state.commission.p.toString()} width="100%" label="PLACE Commission Rate" />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField defaultValue={this.state.commission.e.toString()} width="100%" label="EXACT Commission Rate" />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField defaultValue={this.state.commission.q.toString()} width="100%" label="QUINELLA Commission Rate" />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            stripedRows={false}
          >
            {this.state.rowData ?
              this.state.rowData.map((item, index) => (
                <TableRow key={index}>
                  <TableRowColumn>
                    <CellTextField defaultValue={item.w.horse[0]} width="50%" label="Horse Num" />
                    <CellTextField defaultValue={item.w.amount.toString()} width="50%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField defaultValue={item.p.horse[0]} width="50%" label="Horse Num" />
                    <CellTextField defaultValue={item.p.amount.toString()} width="50%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField defaultValue={item.e.horse[0]} width="33%" label="Horse Num" />
                    <CellTextField defaultValue={item.e.horse[1]} width="33%" label="Horse Num" />
                    <CellTextField defaultValue={item.e.amount.toString()} width="33%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField defaultValue={item.q.horse[0]} width="33%" label="Horse Num" />
                    <CellTextField defaultValue={item.q.horse[1]} width="33%" label="Horse Num" />
                    <CellTextField defaultValue={item.q.amount.toString()} width="33%" label="Amount" />
                  </TableRowColumn>
                </TableRow>
              ))
              :
              ''
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default BetTable;
