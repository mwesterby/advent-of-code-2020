const fs = require("fs");

const map = fs.readFileSync("../inputs/day3.txt", "utf-8").split('\n');


function partOne(right, down) {
    const tree = '#';
    const indexesInRow = map[0].length;
    let treesHit = 0;
    let currentLateralDistance = 0;
    let indexToSample = 0;

    for (let index = 0; index < map.length; index = index + down) {
        const row = map[index];
        if(row.charAt(indexToSample) === tree) {
            treesHit = treesHit + 1;
        }
        currentLateralDistance = currentLateralDistance + right;     
        indexToSample = (currentLateralDistance % indexesInRow);
    }
    return(treesHit);
}

const right = 3;
const down = 1;
console.log(partOne(right, down));


function partTwo() {
    const a = partOne(1, 1);
    const b = partOne(3, 1);
    const c = partOne(5, 1);
    const d = partOne(7, 1);
    const e = partOne(1, 2);

    return (a * b * c * d * e);
}

console.log(partTwo());