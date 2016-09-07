/**
*
* CellTextField
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';

import { textChange } from 'containers/HomePage/actions';

import styles from './styles.css';

class CellTextField extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static defaultProps = {
    label: 'test',
    width: '50%',
    defaultValue: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      floatingLabelFocusColor: 'rgb(0, 188, 212)',
    };
    this.textFieldChange = this.textFieldChange.bind(this);
  }

  textFieldChange(e, value) {
    if (Number.isNaN(Number(value.trim()))) {
      this.setState({
        label: 'Please input number!',
        floatingLabelFocusColor: 'red',
      });
    } else {
      this.setState({
        label: this.props.label,
        floatingLabelFocusColor: 'rgb(0, 188, 212)',
      });

      if (this.props.hasOwnProperty('rowIndex')) {
        this.props.cellTextChange(value, this.props.rowIndex, this.props.betType, this.props.field);
      } else {
        this.props.cellCommissionChange(value, this.props.betType);
      }
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
  betType: React.PropTypes.string,
  field: React.PropTypes.string,
};

export default CellTextField;
