/**
*
* CellTextField
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';

import styles from './styles.css';

class CellTextField extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static defaultProps = {
    label: 'test',
    width: '50%',
    defaultValue: '',
  };

  static propTypes = {
    label: React.PropTypes.string,
    width: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      floatingLabelFocusColor: 'rgb(0, 188, 212)',
    };
    this.textChange = this.textChange.bind(this);
  }

  textChange(e, value) {
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
    }

    // console.log(arguments);
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
          onChange={this.textChange}
        />
      </div>
    );
  }
}

export default CellTextField;
