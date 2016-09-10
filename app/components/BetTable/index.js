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
    this.tableAmountChange = this.tableAmountChange.bind(this);
    this.tableCommissionChange = this.tableCommissionChange.bind(this);
    this.tableResultChange = this.tableResultChange.bind(this);
    this.tableHorseChange = this.tableHorseChange.bind(this);
  }

  tableAmountChange(data, rowIndex, betType) {
    this.props.amountChange(data, rowIndex, betType);
  }

  tableHorseChange(data, rowIndex, betType, horseIndex) {
    this.props.horseChange(data, rowIndex, betType, horseIndex);
  }

  tableCommissionChange(data, betType) {
    this.props.commissionChange(data, betType);
  }

  tableResultChange(data, index) {
    this.props.resultChange(data, index);
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
                <CellTextField
                  cellCommissionChange={this.tableCommissionChange}
                  betType="w"
                  defaultValue={data.commission.w.toString()}
                  width="100%"
                  label="WIN Commission Rate"
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField
                  cellCommissionChange={this.tableCommissionChange}
                  betType="p"
                  defaultValue={data.commission.p.toString()}
                  width="100%"
                  label="PLACE Commission Rate"
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField
                  cellCommissionChange={this.tableCommissionChange}
                  betType="e"
                  defaultValue={data.commission.e.toString()}
                  width="100%"
                  label="EXACT Commission Rate"
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <CellTextField
                  cellCommissionChange={this.tableCommissionChange}
                  betType="q"
                  defaultValue={data.commission.q.toString()}
                  width="100%"
                  label="QUINELLA Commission Rate"
                />
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
                    <CellTextField
                      cellHorseChange={this.tableHorseChange}
                      rowIndex={index}
                      betType="w"
                      horseIndex={0}
                      defaultValue={item.w.horse[0]}
                      width="50%"
                      label="Horse Num"
                    />
                    <CellTextField
                      cellAmountChange={this.tableAmountChange}
                      rowIndex={index} betType="w"
                      defaultValue={item.w.amount.toString()}
                      width="50%"
                      label="Amount"
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField
                      cellHorseChange={this.tableHorseChange}
                      rowIndex={index}
                      betType="p"
                      horseIndex={0}
                      defaultValue={item.p.horse[0]}
                      width="50%"
                      label="Horse Num"
                    />
                    <CellTextField
                      cellAmountChange={this.tableAmountChange}
                      rowIndex={index}
                      betType="p"
                      defaultValue={item.p.amount.toString()}
                      width="50%"
                      label="Amount"
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField
                      cellHorseChange={this.tableHorseChange}
                      rowIndex={index}
                      betType="e"
                      horseIndex={0}
                      defaultValue={item.e.horse[0]}
                      width="33%"
                      label="Horse Num"
                    />
                    <CellTextField
                      cellHorseChange={this.tableHorseChange}
                      rowIndex={index}
                      betType="e"
                      horseIndex={1}
                      defaultValue={item.e.horse[1]}
                      width="33%"
                      label="Horse Num"
                    />
                    <CellTextField
                      cellAmountChange={this.tableAmountChange}
                      rowIndex={index}
                      betType="e"
                      defaultValue={item.e.amount.toString()}
                      width="33%"
                      label="Amount"
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <CellTextField
                      cellHorseChange={this.tableHorseChange}
                      rowIndex={index}
                      betType="q"
                      horseIndex={0}
                      defaultValue={item.q.horse[0]}
                      width="33%"
                      label="Horse Num"
                    />
                    <CellTextField
                      cellHorseChange={this.tableHorseChange}
                      rowIndex={index}
                      betType="q"
                      horseIndex={1}
                      defaultValue={item.q.horse[1]}
                      width="33%"
                      label="Horse Num"
                    />
                    <CellTextField
                      cellAmountChange={this.tableAmountChange}
                      rowIndex={index}
                      betType="q"
                      defaultValue={item.q.amount.toString()}
                      width="33%"
                      label="Amount"
                    />
                  </TableRowColumn>
                </TableRow>
              ))
              :
              ''
            }
          </TableBody>
        </Table>

        <div className={styles.resultSection}>
          <CellTextField
            cellResultChange={this.tableResultChange}
            index={0}
            defaultValue={data.resultData[0].toString()}
            width="100%"
            label="First horse number"
          />
          <CellTextField
            cellResultChange={this.tableResultChange}
            index={1}
            defaultValue={data.resultData[1].toString()}
            width="100%"
            label="Second horse number"
          />
          <CellTextField
            cellResultChange={this.tableResultChange}
            index={2}
            defaultValue={data.resultData[2].toString()}
            width="100%"
            label="Third horse number"
          />
        </div>
      </div>
    );
  }
}

BetTable.propTypes = {
  data: React.PropTypes.object,
  amountChange: React.PropTypes.func,
  horseChange: React.PropTypes.func,
  commissionChange: React.PropTypes.func,
  resultChange: React.PropTypes.func,
};

export default BetTable;
