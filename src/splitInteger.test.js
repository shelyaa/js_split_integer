'use strict';

const splitInteger = require('./splitInteger');

function assertProperties(result, value, numberOfParts) {
  expect(result).toHaveLength(numberOfParts);

  expect(result.every(Number.isInteger)).toBe(true);

  expect(result.reduce((a, b) => a + b, 0)).toBe(value);

  expect(result).toEqual(result.slice().sort((a, b) => a - b));

  expect(Math.max(...result) - Math.min(...result)).toBeLessThanOrEqual(1);
}

test(`should split a number into equal parts
  if a value is divisible by a numberOfParts`, () => {
  const result = splitInteger(6, 2);

  expect(result).toEqual([3, 3]);
});

test(`should return a part equals to a value
  when splitting into 1 part`, () => {
  const result = splitInteger(8, 1);

  expect(result).toEqual([8]);
});

test('should sort parts ascending if they are not equal', () => {
  const result = splitInteger(17, 4);

  expect(result).toEqual([4, 4, 4, 5]);
});

test('should add zeros if value < numberOfParts', () => {
  const result = splitInteger(2, 4);

  expect(result).toEqual([0, 0, 1, 1]);
});

test('should split 32 into 6 parts as in the example', () => {
  const value = 32;
  const numberOfParts = 6;
  const result = splitInteger(value, numberOfParts);

  expect(result).toEqual([5, 5, 5, 5, 6, 6]);
  assertProperties(result, value, numberOfParts);
});
