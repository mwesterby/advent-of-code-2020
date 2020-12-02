const assert = require('assert');
const { 
    partOne,
    partTwo
} = require('../src/day2');

describe('Day 2', function() {
    describe('Part 1', function() {
      it('should find the count passwords containing the required character, whose occurance is within the supplied range', async function() {
            const actual = partOne();
            const expected = 519;
            assert.strictEqual(actual, expected);
      });
    });
    describe('Part 2', function() {
        it('should find the count of passwords contianing the required character at one of the provided positions', async function() {
            const actual = partTwo();
            const expected = 708;
            assert.strictEqual(actual, expected);
        });
      });
  });