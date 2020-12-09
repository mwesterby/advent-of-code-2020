const fs = require("fs");

const numbers = fs.readFileSync("../inputs/day9.txt", "utf-8").split('\n');

function partOne(preambleLength) {

    let startOfWindow = 0;
    let endOfWindow = preambleLength;

    for (let i = preambleLength; i < numbers.length; i++) {
        const sliceToSample = numbers.slice(startOfWindow, endOfWindow);
        if (!isValid(numbers[i], sliceToSample)) {
            return numbers[i];
        }

        startOfWindow++;
        endOfWindow++;
        if (endOfWindow == numbers.length) {
            return;
        }
    }


}

function isValid(target, numbersToSearch) {
    let seen = [];
    for (let i = 0; i < numbersToSearch.length; i++) {
        if (seen.includes(target - numbersToSearch[i])) {
            return true;
        } else {
            seen.push(parseInt(numbersToSearch[i]));
        }   
    }
    return false;
}

console.log(partOne(25));


function findContiguousSet(invalidNumber) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] == invalidNumber) {
            continue;
        }

        let contiguousSum = 0;
        for (let j = i; j < numbers.length; j++) {
            contiguousSum = contiguousSum + parseInt(numbers[j]);
            if (contiguousSum == invalidNumber) {
                const range = numbers.slice(i, j + 1);
                const min = Math.min(...range);
                const max = Math.max(...range);
                return parseInt(min) + parseInt(max);
            } else if (contiguousSum > invalidNumber) {
                break;
            }
            
        }
        
    }
}

function partTwo() {
    const invalidNumber = partOne(25);
    const encryptionWeakness = findContiguousSet(invalidNumber)
    return encryptionWeakness;
}

console.log(partTwo());

