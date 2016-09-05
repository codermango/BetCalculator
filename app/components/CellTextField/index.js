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
  };

  static propTypes = {
    label: React.PropTypes.string,
    width: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      floatingLabelFocusColor: 'rgb(0, 188, 212)',
    };
  }

  checkInput = (e) => {
    const textValue = Number(e.target.value.trim());
    if (Number.isNaN(textValue)) {
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
  };

  render() {
    const { width } = this.props;
    return (
      <div className={styles.cellTextField} style={{ width: width }}>
        <TextField
          floatingLabelText={this.state.label}
          style={{
            fontSize: '0.8vw',
            width: '80%',
          }}
          floatingLabelFocusStyle={{
            color: this.state.floatingLabelFocusColor
          }}
          inputStyle={{
            margin: '0',
            padding: '20px 0 0 0',
          }}
          onChange={(e) => this.checkInput(e)}
        />
      </div>
    );
  }
}

export default CellTextField;
