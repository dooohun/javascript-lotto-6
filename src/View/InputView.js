import { Console } from '@woowacourse/mission-utils';
import {
  BONUS_NUMBER_ERROR_MESSAGE,
  PURCHASE_AMOUNT_ERROR_MESSAGE,
  WINNING_NUMBERS_ERROR_MESSAGE
} from '../Constants/Error.js';
import {
  ENTER_BONUS_NUMBER_PROMPT,
  ENTER_PURCHASE_AMOUNT_PROMPT,
  ENTER_WINNING_NUMBERS_PROMPT
} from '../Constants/Message.js';

class InputView {
  static async requestPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmount = await Console.readLineAsync(ENTER_PURCHASE_AMOUNT_PROMPT);
        this.validatePurchaseAmount(purchaseAmount);
        return Number(purchaseAmount);
      }
      catch (error) {
        Console.print(error);
      }
    }
  }

  static validatePurchaseAmount(purchaseAmount) {
    if (isNaN(purchaseAmount)) {
      throw PURCHASE_AMOUNT_ERROR_MESSAGE.notNumber;
    }
    if (purchaseAmount <= 0) {
      throw PURCHASE_AMOUNT_ERROR_MESSAGE.nonPositive;
    }
    if (purchaseAmount % 1000 !== 0) {
      throw PURCHASE_AMOUNT_ERROR_MESSAGE.notDivisibleBy1000;
    }
  }

  static async requestWinningNumbers() {
    while (true) {
      try {
        const winningNumbers = await Console.readLineAsync(ENTER_WINNING_NUMBERS_PROMPT);
        this.validateWinningNumbers(winningNumbers.split(','));
        return winningNumbers.split(',').map(Number);
      }
      catch (error) {
        Console.print(error);
      }
    }
  }

  static validateWinningNumbers(winningNumbers) {
    const areAllNumbers = winningNumbers.every(number => !isNaN(number));
    if (!areAllNumbers) {
      throw WINNING_NUMBERS_ERROR_MESSAGE.notNumber;
    }
    if (!winningNumbers.every((number) => number >= 1 && number <= 45)) {
      throw WINNING_NUMBERS_ERROR_MESSAGE.notInRange;
    }
    if (winningNumbers.length !== 6) {
      throw WINNING_NUMBERS_ERROR_MESSAGE.notSixNumbers;
    }
    const set = new Set(winningNumbers);
    if (winningNumbers.length !== set.size) {
      throw WINNING_NUMBERS_ERROR_MESSAGE.hasDuplicates;
    }
  }

  static async requestBonusNumber(winningNumbers) {
    while (true) {
      try {
        const bonusNumber = await Console.readLineAsync(ENTER_BONUS_NUMBER_PROMPT);
        this.validateBonusNumber(bonusNumber, winningNumbers)
        return Number(bonusNumber);
      }
      catch (error) {
        Console.print(error);
      }
    }
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw BONUS_NUMBER_ERROR_MESSAGE.notInRange
    }
    if (winningNumbers.includes(Number(bonusNumber))) {
      throw BONUS_NUMBER_ERROR_MESSAGE.hasDuplicates;
    }
    if (isNaN(bonusNumber)) {
      throw BONUS_NUMBER_ERROR_MESSAGE.notNumber;
    }
  }
}

export default InputView;
