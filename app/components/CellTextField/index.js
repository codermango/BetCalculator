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
  };

  render() {
    const { width, label } = this.props;
    return (
      <div className={styles.cellTextField} style={{ width: width }}>
        <TextField
          floatingLabelText={label}
          style={{
            fontSize: '0.8vw',
            width: '80%',
          }}
          inputStyle={{
            margin: '0',
            padding: '20px 0 0 0',
          }}
        />
      </div>
    );
  }
}

export default CellTextField;
