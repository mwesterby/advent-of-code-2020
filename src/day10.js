const fs = require("fs");

const outputJoltages = fs.readFileSync("../inputs/day10.txt", "utf-8").split('\n').map(Number);

function partOne() {

    const sortedJoltages = outputJoltages.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });

    let oneJoltDifferences = 0;
    let twoJoltDifferences = 0;
    let threeJoltDifferences = 0;

    let previousAdaptor = 0;

    for (let i = 0; i < sortedJoltages.length; i++) {
        const joltageDifference = sortedJoltages[i] - previousAdaptor;
        switch (joltageDifference) {
            case 1:
                oneJoltDifferences++;
                break;
            case 2:
                twoJoltDifferences++;
                break;
            case 3:
                threeJoltDifferences++
                break;
        }
        previousAdaptor = sortedJoltages[i];
    }

    threeJoltDifferences = threeJoltDifferences + 1;

    return oneJoltDifferences * threeJoltDifferences;
}

console.log(partOne());

function partTwo() {
    const sortedJoltages = outputJoltages.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });

    const validRoutes = findValidRoutes(sortedJoltages, 0, 0);
    return validRoutes;
}

function findValidRoutes(joltages, startingPosition, previous) {
    let validRoutes = 0;
    let previousAdaptor = previous;

    if(startingPosition >= joltages.length) {
        return 1;
    }

    for (let i = startingPosition; i < joltages.length; i++) {
        const first = isValid(previousAdaptor, parseInt(joltages[i]));
        const second = isValid(previousAdaptor, parseInt(joltages[i + 1]));
        const third = isValid(previousAdaptor, parseInt(joltages[i + 2]));

        if (first) {
            if (i == joltages.length - 1) {
                validRoutes = validRoutes + 1;
            }
        }

        if (second) {
            validRoutes = validRoutes + findValidRoutes(joltages, (i + 2), joltages[i + 1]);
        }

        if (third) {
            validRoutes = validRoutes + findValidRoutes(joltages, i + 3, joltages[i + 2]);
        }
        previousAdaptor = joltages[i];
    }
    return validRoutes;
}

function isValid(previousAdaptor, adaptorToSample) {
    if ((parseInt(adaptorToSample)) > (parseInt(previousAdaptor)) &&  (parseInt(adaptorToSample) <= (parseInt(previousAdaptor) + 3))) {
        return true;
    }
    return false;
}

console.log(partTwo());
