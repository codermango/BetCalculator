/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import BetTable from 'components/BetTable';
import ResultSection from 'components/ResultSection';

import styles from './styles.css';
import { fetchData } from './actions';
import { selectBetData } from './selectors';


export class HomePage extends React.Component {
  componentDidMount() {
    if (!this.props.betData.get('data')) {
      this.props.fetchBetData();
    }
  }

  render() {
    const { betData } = this.props;
    console.log(betData);
    return (
      <div className={styles.homePage}>
        <div className={styles.betTable}>
          <BetTable />
        </div>
        <div className={styles.resultSection}>
          <ResultSection />
        </div>

      </div>
    );
  }
}

HomePage.propTypes = {
  betData: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  fetchBetData: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    fetchBetData: () => dispatch(fetchData()),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  betData: selectBetData(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
