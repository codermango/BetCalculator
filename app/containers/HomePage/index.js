/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createStructuredSelector } from 'reselect';

import BetTable from 'components/BetTable';

import styles from './styles.css';
import { fetchData, textChange, commissionChange, resultChange, calculateDividends } from './actions';
import { selectBetData } from './selectors';


export class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.betTableTextChange = this.betTableTextChange.bind(this);
    this.betTableCommissionChange = this.betTableCommissionChange.bind(this);
    this.betTableResultChange = this.betTableResultChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.betData.get('data')) {
      this.props.fetchBetData();
    }
  }

  betTableTextChange(data, rowIndex, betType, field) {
    this.props.textChange(data, rowIndex, betType, field);
  }

  betTableCommissionChange(data, betType) {
    this.props.commissionChange(data, betType);
  }

  betTableResultChange(data, index) {
    this.props.resultChange(data, index);
  }

  render() {
    const { betData } = this.props;
    return (
      <div className={styles.homePage}>

        <div className={styles.betTable}>
          {betData.get('data') ?
            <BetTable
              textChange={this.betTableTextChange}
              commissionChange={this.betTableCommissionChange}
              resultChange={this.betTableResultChange}
              data={betData.get('data')}
            />
            :
            ''
          }
        </div>

        <div className={styles.button}>
          <RaisedButton label="Calculate" onClick={this.props.calculateDividends} />
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
    textChange: (data, rowIndex, betType, field) => dispatch(textChange(data, rowIndex, betType, field)),
    commissionChange: (data, betType) => dispatch(commissionChange(data, betType)),
    resultChange: (data, index) => dispatch(resultChange(data, index)),
    calculateDividends: () => dispatch(calculateDividends()),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  betData: selectBetData(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
