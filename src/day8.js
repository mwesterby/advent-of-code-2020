const fs = require("fs");

const instructions = fs.readFileSync("../inputs/day8.txt", "utf-8").split('\n');

function partOne() {
    let accumulator = 0;
    let linesVisited = [];

    for (let i = 0; i < instructions.length; i++) {
        if (linesVisited.includes(i)) {
            return accumulator;
        }
        linesVisited.push(i);
        const operationAndArgument = instructions[i].split(' ');

        const operation = operationAndArgument[0]
        const argumentSign = operationAndArgument[1].charAt(0);
        const argument = operationAndArgument[1].replace(/\+?\-?/, '');

        switch(operation) {
            case 'nop':
                break;
            case 'acc':
                if (argumentSign == '+') {
                    accumulator = accumulator + parseInt(argument);
                } else {
                    accumulator = accumulator - parseInt(argument);
                }
                break;
            case 'jmp':
                if (argumentSign == '+') {
                    i = i + (parseInt(argument) - 1);
                } else {
                    i = i - (parseInt(argument) + 1);
                }
                break;
        }
        
    }
    return accumulator;
}

console.log('Part One: ' + partOne());

function partTwo() {
    for (let i = 0; i < instructions.length; i++) {
        let instructionsToTry = fs.readFileSync("../inputs/day8.txt", "utf-8").split('\n');
        
        if (!instructions[i].includes('acc')) {
            if (instructions[i].includes('jmp')) {
                instructionsToTry[i] = instructionsToTry[i].replace('jmp', 'nop');
            } else if (instructions[i].includes('nop')) {
                instructionsToTry[i] = instructionsToTry[i].replace('nop', 'jmp');
            }
            try {
                const result = runCode(instructionsToTry);
                return result;
            } catch (err) {

            }
        } 
    }
}


console.log('Part Two: ' + partTwo());

function runCode(newInstructions) {
    let accumulator = 0;
    let linesVisited = [];

    for (let i = 0; i < newInstructions.length; i++) {
        if (linesVisited.includes(i)) {
            throw new Error('Infinite');
        }
        linesVisited.push(i);
        const operationAndArgument = newInstructions[i].split(' ');

        const operation = operationAndArgument[0]
        const argumentSign = operationAndArgument[1].charAt(0);
        const argument = operationAndArgument[1].replace(/\+?\-?/, '');

        switch(operation) {
            case 'nop':
                break;
            case 'acc':
                if (argumentSign == '+') {
                    accumulator = accumulator + parseInt(argument);
                } else {
                    accumulator = accumulator - parseInt(argument);
                }
                break;
            case 'jmp':
                if (argumentSign == '+') {
                    i = i + (parseInt(argument) - 1);
                } else {
                    i = i - (parseInt(argument) + 1);
                }
                break;
        }
    }
    return accumulator;
}