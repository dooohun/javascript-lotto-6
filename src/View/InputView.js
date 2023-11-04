import { Console } from '@woowacourse/mission-utils';

class InputView {
  static async requestPurchaseAmount() {
    const purchaseAmount = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
    this.validatePurchaseAmount(purchaseAmount);
    return purchaseAmount;
  }

  static validatePurchaseAmount(purchaseAmount) {
    if (isNaN(purchaseAmount)) {
      throw new Error('[ERROR] 구입금액은 숫자로 입력해야 합니다.');
    }
    if (Number(purchaseAmount) <= 0) {
      throw new Error('[ERROR] 구입금액은 양수여야 합니다.');
    }
    if (Number(purchaseAmount) % 1000 !== 0) {
      throw new Error('[ERROR] 구입금액은 1000원으로 나누어 떨어져야 합니다.');
    }
  }

  static async requestWinningNumbers() {
    const winningNumbers = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
    this.validateWinningNumbers(winningNumbers);
    return winningNumbers.split(',').map(Number);
  }

  static validateWinningNumbers(winningNumbers) {
    const numbers = winningNumbers.split(',');
    const areAllNumbers = numbers.every(number => !isNaN(number));
    if (!areAllNumbers) {
      throw new Error('[ERROR] 당첨 번호는 숫자여야 합니다.');
    }

    if (numbers.length !== 6) {
      throw new Error('[ERROR] 당첨 번호는 6개여야 합니다.');
    }

    const isValidRangeofNumbers = numbers.map(Number).filter((number) => number >= 1 && number <= 45);
    if (isValidRangeofNumbers.length !== numbers.length) {
      throw new Error('[ERROR] 당첨 번호는 1부터 45 범위 내이어야 합니다.');
    }
    
    const set = new Set(numbers);
    if (numbers.length !== set.size) {
      throw new Error('[ERROR] 중복된 숫자를 입력하면 안됩니다.');
    }
  }

  static async requestBonusNumber() {
    const bonusNumber = await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
    return bonusNumber;
  }
}

export default InputView;
