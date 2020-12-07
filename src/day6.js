const fs = require("fs");

const allAnswers = fs.readFileSync("../inputs/day6.txt", "utf-8").split('\n');

// This could be made shorter
function partOne() {

    let answers = [];
    let currentGroup = 0;
    answers[currentGroup] = [];

    allAnswers.forEach(personsAnswer => {
        if(!personsAnswer) {
            currentGroup = currentGroup + 1;
            answers[currentGroup] = [];
        } else {
            for (let i = 0; i < personsAnswer.length; i++) {
                if (!answers[currentGroup].includes(personsAnswer[i])) {
                    answers[currentGroup].push(personsAnswer[i]);
                }
            }
        }
        
    });

    let totalAnswers = 0
    for (let i = 0; i < answers.length; i++) {
        totalAnswers = totalAnswers + answers[i].length;
    }

    return totalAnswers;
}

console.log(partOne());

function partTwo() {
    let groupAnswers = [];
    let currentGroup = 0;
    groupAnswers[currentGroup] = [];

    allAnswers.forEach(personsAnswer => {
        if(!personsAnswer) {
            currentGroup = currentGroup + 1;
            groupAnswers[currentGroup] = [];
        } else {
            let allPersonAnswers = [];
            for (let i = 0; i < personsAnswer.length; i++) {
                allPersonAnswers.push(personsAnswer[i]);
            }
            groupAnswers[currentGroup].push(allPersonAnswers);
        }
    });

    let totalAnswers = 0;

    groupAnswers.forEach(group => {
        let lettersAnswered = new Map();
        group.forEach(person => {
            person.forEach(answer => {
                if (lettersAnswered[answer] != undefined) {
                    lettersAnswered[answer] = lettersAnswered[answer] + 1;
                } else {
                    lettersAnswered[answer] = 1;
                }
            });
        })
        let allMemebersAnswered = [];
        for (let letter in lettersAnswered) {
            if (lettersAnswered[letter] == group.length) {
                allMemebersAnswered.push(letter);
            }
        }
        totalAnswers = totalAnswers + allMemebersAnswered.length;
    });
    return totalAnswers;
}   

console.log(partTwo());