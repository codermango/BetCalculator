/**
 * Created by mark on 9/6/16.
 */

const betsData = [
  ['w:1:3', 'p:1:31', 'e:1,2:13', 'q:1,2:19'],
  ['w:2:4', 'p:2:89', 'e:2,3:98', 'q:2,3:77'],
  ['w:3:5', 'p:3:28', 'e:1,3:82', 'q:1,3:26'],
  ['w:4:5', 'p:4:72', 'e:3,2:27', 'q:2,4:63'],
  ['w:1:16', 'p:1:40', 'e:1,2:5', 'q:1,2:66'],
  ['w:2:8', 'p:2:16', 'e:2,3:61', 'q:2,3:82'],
  ['w:3:22', 'p:3:82', 'e:1,3:28', 'q:1,3:90'],
  ['w:4:57', 'p:4:52', 'e:3,2:25', 'q:2,4:48'],
  ['w:1:42', 'p:1:18', 'e:1,2:81', 'q:1,2:18'],
  ['w:2:98', 'p:2:74', 'e:2,3:47', 'q:2,3:93'],
  ['w:3:63', 'p:3:39', 'e:1,3:93', 'q:1,3:62'],
  ['w:4:15', 'p:4:105', 'e:3,2:51', 'q:2,4:25'],
];

const betsResult = 'R:2:3:1';

const isHorseEqual = (a, b) => (JSON.stringify(a) === JSON.stringify(b));

const parseOneBet = (bets) => {
  const parsedBet = {};
  for (const bet of bets) {
    const item = bet.split(':');
    parsedBet[item[0]] = { horse: item[1].split(','), amount: Number(item[2]) };
  }
  return parsedBet;
};

const parseBets = (betsList) => {
  const parsedResult = [];
  for (const item of betsList) {
    const parsedBet = parseOneBet(item);
    parsedResult.push(parsedBet);
  }
  return parsedResult;
};

const parseResult = (r) => (r.split(':').slice(1));

function ruleCalculator(parsedData, parsedResult, ruleType, commission) {
  const totalAmount = parsedData.reduce((x, y) => x + y[ruleType].amount, 0);
  const restAmount = totalAmount * (1 - commission);
  // console.log(restAmount);

  let dividend = null;

  switch (ruleType) {
    case 'w': {
      let wAmount = 0;
      for (const bet of parsedData) {
        if (isHorseEqual(bet[ruleType].horse, parsedResult.slice(0, 1))) {
          wAmount += bet[ruleType].amount;
        }
      }
      dividend = wAmount === 0 ? 0 : Number((restAmount / wAmount).toFixed(2));
      break;
    }
    case 'p': {
      const pAmount = [0, 0, 0];
      for (const bet of parsedData) {
        for (let i = 0; i < parsedResult.length; i++) {
          if (isHorseEqual(bet[ruleType].horse, parsedResult.slice(i, i + 1))) {
            pAmount[i] += bet[ruleType].amount;
          }
        }
      }
      dividend = pAmount.map(x => x === 0 ? 0 : Number((restAmount / 3 / x).toFixed(2)));
      break;
    }
    case 'e': {
      let eAmount = 0;
      for (const bet of parsedData) {
        if (isHorseEqual(bet[ruleType].horse, parsedResult.slice(0, 2))) {
          eAmount += bet[ruleType].amount;
        }
      }
      dividend = eAmount === 0 ? 0 : Number((restAmount / eAmount).toFixed(2));
      break;
    }
    case 'q': {
      let qAmount = 0;
      for (const bet of parsedData) {
        if (isHorseEqual(bet[ruleType].horse, parsedResult.slice(0, 2))
          || isHorseEqual(bet[ruleType].horse, parsedResult.slice(0, 2).reverse())) {
          qAmount += bet[ruleType].amount;
        }
      }
      dividend = qAmount === 0 ? 0 : Number((restAmount / qAmount).toFixed(2));
      break;
    }
    default:
      dividend = false;
  }
  return dividend;
}


const calculator = (data, result, wCommission = 0.15, pCommission = 0.12, eCommission = 0.18, qCommission = 0.18) => {
  const parsedData = parseBets(data);
  const parsedResult = parseResult(result);
  const wDividend = ruleCalculator(parsedData, parsedResult, 'w', wCommission);
  const pDividend = ruleCalculator(parsedData, parsedResult, 'p', pCommission);
  const eDividend = ruleCalculator(parsedData, parsedResult, 'e', eCommission);
  const qDividend = ruleCalculator(parsedData, parsedResult, 'q', qCommission);
  // console.log(wDividend);
  // console.log(pDividend);
  // console.log(eDividend);
  // console.log(qDividend);
  // console.log(parsedData);
  // console.log(parsedResult);
};


// calculator(betsData, betsResult);

// exports.ruleCalculator = ruleCalculator;
module.exports = { ruleCalculator };