const assert = require('assert');
const { 
    partOne,
    partTwo
} = require('../src/day1');

describe('Day 1', function() {
    describe('Part 1', function() {
      it('should find the two entries that sum to 2020 and then multiply those two numbers together', async function() {
            const actual = partOne(2020);
            const expected = 73371;
            assert.strictEqual(actual, expected);
      });
    });
    describe('Part 2', function() {
        it('should find the three entries that sum to 2020 and then multiply those two numbers together', async function() {
            const actual = partTwo(2020);
            const expected = 127642310;
            assert.strictEqual(actual, expected);
        });
      });
  });