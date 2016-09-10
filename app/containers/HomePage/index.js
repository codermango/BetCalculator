/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton, Dialog } from 'material-ui';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createStructuredSelector } from 'reselect';

import BetTable from 'components/BetTable';

import styles from './styles.css';
import {
  fetchData,
  textChange,
  commissionChange,
  resultChange,
  calculateDividends,
} from './actions';
import {
  selectBetData,
  selectDividends,
  selectIsInputValid,
} from './selectors';


export class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      inputError: false,
    };
    this.betTableTextChange = this.betTableTextChange.bind(this);
    this.betTableCommissionChange = this.betTableCommissionChange.bind(this);
    this.betTableResultChange = this.betTableResultChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  buttonClick() {
    if (this.props.isInputValid.get('data')) {
      this.props.calculateDividends();
      this.setState({ inputError: false });
    } else {
      this.setState({ inputError: true });
    }
    this.setState({ showResult: true });
  }

  handleClose() {
    this.setState({ showResult: false });
  }

  render() {
    const { betData, dividendsData } = this.props;
    let showMsg = '';
    if (this.state.inputError) {
      showMsg = (
        <div>There is something wrong with input, please check!</div>
      );
    } else if (this.state.showResult) {
      showMsg = (
        <div>
          <div>Win - Runner{betData.get('data').resultData[0]} - ${dividendsData.get('w')}</div>
          <div>Place - Runner{betData.get('data').resultData[0]} - ${dividendsData.get('p') ? dividendsData.get('p')[0] : ''}</div>
          <div>Place - Runner{betData.get('data').resultData[1]} - ${dividendsData.get('p') ? dividendsData.get('p')[1] : ''}</div>
          <div>Place - Runner{betData.get('data').resultData[2]} - ${dividendsData.get('p') ? dividendsData.get('p')[2] : ''}</div>
          <div>Exact - Runner{betData.get('data').resultData[0]},{betData.get('data').resultData[1]} - ${dividendsData.get('e')}</div>
          <div>Quinella - Runner{betData.get('data').resultData[0]},{betData.get('data').resultData[1]} - ${dividendsData.get('q')}</div>
        </div>
      );
    }

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
          <RaisedButton label="Calculate" onClick={this.buttonClick} />
        </div>

        {betData.get('data') ?
          <Dialog
            title="Dividends"
            modal={false}
            open={this.state.showResult}
            onRequestClose={this.handleClose}
          >
            {showMsg}
          </Dialog>
          :
          ''
        }

      </div>
    );
  }
}

HomePage.propTypes = {
  betData: React.PropTypes.object,
  dividendsData: React.PropTypes.object,
  isInputValid: React.PropTypes.bool,
  fetchBetData: React.PropTypes.func,
  textChange: React.PropTypes.func,
  commissionChange: React.PropTypes.func,
  resultChange: React.PropTypes.func,
  calculateDividends: React.PropTypes.func,
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
  dividendsData: selectDividends(),
  isInputValid: selectIsInputValid(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
