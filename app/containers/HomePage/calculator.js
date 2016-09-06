/**
 * Created by mark on 9/6/16.
 */
"use strict";
const data = [
  ['W:1:3', 'P:1:31', 'E:1,2:13', 'Q:1,2:19'],
  ['W:2:4', 'P:2:89', 'E:2,3:98', 'Q:2,3:77'],
  ['W:3:5', 'P:3:28', 'E:1,3:82', 'Q:1,3:26'],
  ['W:4:5', 'P:4:72', 'E:3,2:27', 'Q:2,4:63'],
  ['W:1:16', 'P:1:40', 'E:1,2:5', 'Q:1,2:66'],
  ['W:2:8', 'P:2:16', 'E:2,3:61', 'Q:2,3:82'],
  ['W:3:22', 'P:3:82', 'E:1,3:28', 'Q:1,3:90'],
  ['W:4:57', 'P:4:52', 'E:3,2:25', 'Q:2,4:48'],
  ['W:1:42', 'P:1:18', 'E:1,2:81', 'Q:1,2:18'],
  ['W:2:98', 'P:2:74', 'E:2,3:47', 'Q:2,3:93'],
  ['W:3:63', 'P:3:39', 'E:1,3:93', 'Q:1,3:62'],
  ['W:4:15', 'P:4:105', 'E:3,2:51', 'Q:2,4:25'],
];

const result = 'R:2:3:1';

const isHorseEqual = (a, b) => (JSON.stringify(a) === JSON.stringify(b));

const parseOneBet = (bets) => {
  const parsedBet = {};
  for(let bet of bets) {
    const item = bet.split(':');
    parsedBet[item[0]] = {horseNum: item[1].split(','), amount: Number(item[2])};
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

const parseResult = (result) => {
  return result.split(':').slice(1);
};


const ruleCalculator = (data, result, ruleType, commission) => {

  // console.log(data);
  const totalAmount = data.reduce((x, y) => x + y[ruleType].amount, 0);
  const restAmount = totalAmount * (1 - commission);
  console.log(restAmount);

  let dividend = null;

  switch (ruleType) {
    case 'W':
      let wAmount = 0;
      for(const bet of data) {
        if(isHorseEqual(bet[ruleType].horseNum, result.slice(0, 1))) {
          wAmount += bet[ruleType].amount;
        }
      }
      dividend = Number((restAmount / wAmount).toFixed(2));
      break;

    case 'P':
      let pAmount = [0, 0, 0];
      for(const bet of data) {
        for(let i=0; i<result.length; i++) {
          if(isHorseEqual(bet[ruleType].horseNum, result.slice(i, i+1))) {
            pAmount[i] += bet[ruleType].amount;
          }
        }
      }
      dividend = pAmount.map(x => Number((restAmount / 3 / x).toFixed(2)));
      break;

    case 'E':
      let eAmount = 0;
      for(const bet of data) {
        if(isHorseEqual(bet[ruleType].horseNum, result.slice(0, 2))) {
          eAmount += bet[ruleType].amount;
        }
      }
      dividend = Number((restAmount / eAmount).toFixed(2));
      break;

    case 'Q':
      let qAmount = 0;
      for(const bet of data) {
        if(isHorseEqual(bet[ruleType].horseNum, result.slice(0, 2))
            || isHorseEqual(bet[ruleType].horseNum, result.slice(0, 2).reverse())) {
          qAmount += bet[ruleType].amount;
        }
      }
      dividend = Number((restAmount / qAmount).toFixed(2));
      break;
  }
  return dividend;
};


const calculator = (data, result, wCommission=0.15, pCommission=0.12, eCommission=0.18, qCommission=0.18) => {
  const parsedData = parseBets(data);
  const parsedResult = parseResult(result);
  const wDividend = ruleCalculator(parsedData, parsedResult, 'W', wCommission);
  const pDividend = ruleCalculator(parsedData, parsedResult, 'P', pCommission);
  const eDividend = ruleCalculator(parsedData, parsedResult, 'E', eCommission);
  const qDividend = ruleCalculator(parsedData, parsedResult, 'Q', qCommission);
  console.log(wDividend);
  console.log(pDividend);
  console.log(eDividend);
  console.log(qDividend);
};


calculator(data, result);
