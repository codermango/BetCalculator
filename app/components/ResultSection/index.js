/**
*
* ResultSection
*
*/

import React from 'react';

import styles from './styles.css';

import CellTextField from 'components/CellTextField';

class ResultSection extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.resultSection}>
        <CellTextField width="100%" label="First horse number" />
        <CellTextField width="100%" label="Second horse number" />
        <CellTextField width="100%" label="Third horse number" />
      </div>
    );
  }
}

export default ResultSection;
