import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('구입 금액 입력 테스트', () => {
  test('숫자가 아닌 값 입력 테스트', async () => {
    const logSpy = getLogSpy();

    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    mockQuestions(['8000k', '1000', '1,2,3,4,5,6', '7']);

    const app = new App();
    try {
      await app.play();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
  });

  test('음수 입력 처리 테스트', async () => {
    const logSpy = getLogSpy();

    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    mockQuestions(['-8000', '1000', '1,2,3,4,5,6', '7']);

    const app = new App();
    try {
      await app.play();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
  });

  test('1000단위가 아닌 숫자 입력 테스트', async () => {
    const logSpy = getLogSpy();

    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    mockQuestions(['8008', '1000', '1,2,3,4,5,6', '7']);

    const app = new App();
    try {
      await app.play();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
  });
})