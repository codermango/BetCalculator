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

/*
 Now the rule calculation is seperate
 you can define other rule calculation as well
 */
function calcWinDividend(parsedData, parsedResult, restAmount, ruleType) {
  let amount = 0;
  for (const bet of parsedData) {
    if (isHorseEqual(bet[ruleType].horse, parsedResult.slice(0, 1))) {
      amount += Number(bet[ruleType].amount);
    }
  }
  const dividend = amount === 0 ? 0 : Number((restAmount / amount).toFixed(2));
  return dividend;
}

function calcPlaceDividend(parsedData, parsedResult, restAmount, ruleType) {
  const amount = [0, 0, 0];
  for (const bet of parsedData) {
    for (let i = 0; i < parsedResult.length; i++) {
      if (isHorseEqual(bet[ruleType].horse, parsedResult.slice(i, i + 1))) {
        amount[i] += Number(bet[ruleType].amount);
      }
    }
  }
  const dividend = amount.map(x => (x === 0 ? 0 : Number((restAmount / 3 / x)).toFixed(2)));
  return dividend;
}

function calcExactDividend(parsedData, parsedResult, restAmount, ruleType) {
  let amount = 0;
  for (const bet of parsedData) {
    if (isHorseEqual(bet[ruleType].horse, parsedResult.slice(0, 2))) {
      amount += Number(bet[ruleType].amount);
    }
  }
  const dividend = amount === 0 ? 0 : Number((restAmount / amount).toFixed(2));
  return dividend;
}

function calcQuinellaDividend(parsedData, parsedResult, restAmount, ruleType) {
  let amount = 0;
  for (const bet of parsedData) {
    if (isHorseEqual(bet[ruleType].horse, parsedResult.slice(0, 2))
      || isHorseEqual(bet[ruleType].horse, parsedResult.slice(0, 2).reverse())) {
      amount += Number(bet[ruleType].amount);
    }
  }
  const dividend = amount === 0 ? 0 : Number((restAmount / amount).toFixed(2));
  return dividend;
}

function calculator(parsedData, parsedResult, commission, ruleType, ruleCalculator) {
  const totalAmount = parsedData.reduce((x, y) => x + Number(y[ruleType].amount), 0);
  const restAmount = totalAmount * (1 - Number(commission));
  const dividend = ruleCalculator(parsedData, parsedResult, restAmount, ruleType);
  return dividend;
}

// const calculator = (data, result, wCommission = 0.15, pCommission = 0.12, eCommission = 0.18, qCommission = 0.18) => {
//   const parsedData = parseBets(data);
//   const parsedResult = parseResult(result);
//
//   const wDividend = calculation(parsedData, parsedResult, wCommission, 'w', calcWinDividend);
//   const pDividend = calculation(parsedData, parsedResult, pCommission, 'p', calcPlaceDividend);
//   const eDividend = calculation(parsedData, parsedResult, eCommission, 'e', calcExactDividend);
//   const qDividend = calculation(parsedData, parsedResult, qCommission, 'q', calcQuinellaDividend);
//
//   console.log(wDividend);
//   console.log(pDividend);
//   console.log(eDividend);
//   console.log(qDividend);
//   console.log(parsedData);
//   console.log(parsedResult);
// };

// calculator(betsData, betsResult);

module.exports = {
  calculator,
  calcWinDividend,
  calcPlaceDividend,
  calcExactDividend,
  calcQuinellaDividend,
};
