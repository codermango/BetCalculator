/**
*
* CellTextField
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';

import styles from './styles.css';

class CellTextField extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      floatingLabelFocusColor: 'rgb(0, 188, 212)',
    };
    this.textFieldChange = this.textFieldChange.bind(this);
  }

  textFieldChange(e, value) {
    const input = value.trim();
    if (Number.isNaN(Number(input))) {
      this.setState({
        label: 'Please input number!',
        floatingLabelFocusColor: 'red',
      });
    } else {
      this.setState({
        label: this.props.label,
        floatingLabelFocusColor: 'rgb(0, 188, 212)',
      });
    }

    if ({}.hasOwnProperty.call(this.props, 'rowIndex')) {
      this.props.cellTextChange(input, this.props.rowIndex, this.props.betType, this.props.field);
    } else if ({}.hasOwnProperty.call(this.props, 'index')) {
      this.props.cellResultChange(input, this.props.index);
    } else {
      this.props.cellCommissionChange(input, this.props.betType);
    }
    // console.log(this.props.cellTextChange(value));
  }

  render() {
    const { width, defaultValue } = this.props;
    return (
      <div className={styles.cellTextField} style={{ width }}>
        <TextField
          defaultValue={defaultValue}
          floatingLabelText={this.state.label}
          style={{
            fontSize: '0.8vw',
            width: '80%',
          }}
          floatingLabelFocusStyle={{
            color: this.state.floatingLabelFocusColor,
          }}
          inputStyle={{
            margin: '0',
            padding: '20px 0 0 0',
          }}
          onChange={this.textFieldChange}
        />
      </div>
    );
  }
}

CellTextField.propTypes = {
  label: React.PropTypes.string,
  width: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  rowIndex: React.PropTypes.number,
  index: React.PropTypes.number,
  betType: React.PropTypes.string,
  field: React.PropTypes.string,
  cellTextChange: React.PropTypes.func,
  cellResultChange: React.PropTypes.func,
  cellCommissionChange: React.PropTypes.func,
};

export default CellTextField;
