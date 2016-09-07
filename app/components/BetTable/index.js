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
    this.tableTextChange = this.tableTextChange.bind(this);
  }

  tableTextChange(data, rowIndex, betType, field) {
    this.props.textChange(data, rowIndex, betType, field);
  }

  render() {
    const { data } = this.props;
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
                <CellTextField defaultValue={data.commission.w.toString()} width="100%" label="WIN Commission Rate" />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField defaultValue={data.commission.p.toString()} width="100%" label="PLACE Commission Rate" />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField defaultValue={data.commission.e.toString()} width="100%" label="EXACT Commission Rate" />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField defaultValue={data.commission.q.toString()} width="100%" label="QUINELLA Commission Rate" />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            stripedRows={false}
          >
            {data.rowData ?
              data.rowData.map((item, index) => (
                <TableRow key={index}>
                  <TableRowColumn>
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="w" field="horse" defaultValue={item.w.horse[0]} width="50%" label="Horse Num" />
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="w" field="amount" defaultValue={item.w.amount.toString()} width="50%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="p" field="horse" defaultValue={item.p.horse[0]} width="50%" label="Horse Num" />
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="p" field="amount" defaultValue={item.p.amount.toString()} width="50%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="e" field="horse" defaultValue={item.e.horse[0]} width="33%" label="Horse Num" />
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="e" field="horse" defaultValue={item.e.horse[1]} width="33%" label="Horse Num" />
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="e" field="amount" defaultValue={item.e.amount.toString()} width="33%" label="Amount" />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="q" field="horse" defaultValue={item.q.horse[0]} width="33%" label="Horse Num" />
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="q" field="horse" defaultValue={item.q.horse[1]} width="33%" label="Horse Num" />
                    <CellTextField cellTextChange={this.tableTextChange} rowIndex={index} betType="q" field="amount" defaultValue={item.q.amount.toString()} width="33%" label="Amount" />
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

BetTable.propTypes = {
  data: React.PropTypes.object,
};

export default BetTable;
