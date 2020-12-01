const fs = require("fs");

const expenseReport = fs.readFileSync("./inputs/day1.txt", "utf-8").split('\n').map(Number);

function partOne(target) {
    let seen = [];
    let answer = -1;
    expenseReport.forEach(entry => {
        if(seen.includes(target - entry)) {
            answer = entry * (target - entry);
            return;
        }
        seen.push(entry);
    });
    return answer;
}

function partTwo(target) {
    let answer = -1;
    expenseReport.forEach(entry => {
        const result = partOne(target - entry);
        if (result != -1) {
            answer = result * entry;
        }
    });
    return answer;
}

module.exports = {
    partOne,
    partTwo,
};
