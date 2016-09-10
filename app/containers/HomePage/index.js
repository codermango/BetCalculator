/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton, Dialog, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createStructuredSelector } from 'reselect';

import BetTable from 'components/BetTable';

import styles from './styles.css';
import {
  fetchData,
  amountChange,
  horseChange,
  commissionChange,
  resultChange,
  calculateDividends,
  addRow,
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
    };
    this.betTableAmountChange = this.betTableAmountChange.bind(this);
    this.betTableHorseChange = this.betTableHorseChange.bind(this);
    this.betTableCommissionChange = this.betTableCommissionChange.bind(this);
    this.betTableResultChange = this.betTableResultChange.bind(this);
    this.calculateClick = this.calculateClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addButtonClick = this.addButtonClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.betData.get('data')) {
      this.props.fetchBetData();
    }
  }

  betTableAmountChange(data, rowIndex, betType) {
    this.props.amountChange(data, rowIndex, betType);
  }

  betTableHorseChange(data, rowIndex, betType, horseIndex) {
    this.props.horseChange(data, rowIndex, betType, horseIndex);
  }

  betTableCommissionChange(data, betType) {
    this.props.commissionChange(data, betType);
  }

  betTableResultChange(data, index) {
    this.props.resultChange(data, index);
  }

  calculateClick() {
    this.props.calculateDividends();
    this.setState({ showResult: true });
  }

  handleClose() {
    this.setState({ showResult: false });
  }

  addButtonClick() {
    this.props.addRow();
  }

  render() {
    const { betData, dividendsData } = this.props;
    let showMsg = '';
    if (!this.props.isInputValid.get('data')) {
      showMsg = (
        <div>There is something wrong with input, please check!</div>
      );
    } else if (betData.get('data')) {
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
              amountChange={this.betTableAmountChange}
              horseChange={this.betTableHorseChange}
              commissionChange={this.betTableCommissionChange}
              resultChange={this.betTableResultChange}
              data={betData.get('data')}
            />
            :
            ''
          }
        </div>

        <div className={styles.button}>
          <div className={styles.buttonSection}>
            <FloatingActionButton onClick={this.addButtonClick}>
              <ContentAdd />
            </FloatingActionButton>
            <FloatingActionButton>
              <ContentRemove />
            </FloatingActionButton>
          </div>
          <div>
            <RaisedButton label="Calculate" onClick={this.calculateClick} />
          </div>
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
  isInputValid: React.PropTypes.object,
  fetchBetData: React.PropTypes.func,
  amountChange: React.PropTypes.func,
  horseChange: React.PropTypes.func,
  commissionChange: React.PropTypes.func,
  resultChange: React.PropTypes.func,
  calculateDividends: React.PropTypes.func,
  addRow: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    fetchBetData: () => dispatch(fetchData()),
    amountChange: (data, rowIndex, betType) => dispatch(amountChange(data, rowIndex, betType)),
    horseChange: (data, rowIndex, betType, horseIndex) => dispatch(horseChange(data, rowIndex, betType, horseIndex)),
    commissionChange: (data, betType) => dispatch(commissionChange(data, betType)),
    resultChange: (data, index) => dispatch(resultChange(data, index)),
    calculateDividends: () => dispatch(calculateDividends()),
    addRow: () => dispatch(addRow()),
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
