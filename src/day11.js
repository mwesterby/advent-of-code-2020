const fs = require("fs");

const seatingArrangementFromFile = fs.readFileSync("../inputs/day11.txt", "utf-8").split('\n');

let processedSeats = [];
seatingArrangementFromFile.forEach(row => {
    const splitRow = row.split('');
    processedSeats.push(splitRow);
});

function partOne() {
    const finalArangement = seats(processedSeats);

    let occupiedSeats = 0;
    for (let i = 0; i < finalArangement.length; i++) {
        for (let j = 0; j < finalArangement[i].length; j++) {
            if(finalArangement[i][j] == '#') {
                occupiedSeats = occupiedSeats + 1;
            }
        }
    }

    return occupiedSeats;
}


function initaliseSeats(seats) {
    let newArrangement = [];
    for (let i = 0; i < seats.length; i++) {
        newArrangement.push([]);
        for (let j = 0; j < seats[i].length; j++) {
            newArrangement[i].push(seats[i][j]);   
        }
        
    }
    return newArrangement;
}


function seats(currentArrangement) {


    let newArrangement = initaliseSeats(currentArrangement);

    for (let i = 0; i < currentArrangement.length; i++) {
        let row = currentArrangement[i];
        for (var j = 0; j < row.length; j++) {

            if (getCharacterAt(i, j, currentArrangement) == 'L') {
                if(adjacentSeatsOccupied(i, j, currentArrangement) == 0) {
                    newArrangement[i][j] = '#';
                }
            }
            if (getCharacterAt(i, j, currentArrangement) == '#') {
                if(adjacentSeatsOccupied(i, j, currentArrangement) >= 4) {
                    newArrangement[i][j] = 'L';
                }
            }

          }
    }
    const isFinalState = compareArrays(currentArrangement, newArrangement)
    if (!isFinalState) {
        return seats(newArrangement);
    }
    return newArrangement;
}

function compareArrays(oldArrangement, newArrangement) {
    for (let i = 0; i < oldArrangement.length; i++) {
        for (let j = 0; j < oldArrangement[i].length; j++) {
            if (oldArrangement[i][j] !== newArrangement[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function adjacentSeatsOccupied(row, column, seatingArrangement) {
    let adjcentSeats = [];

    const up = getCharacterAt(row - 1, column, seatingArrangement);
    const down = getCharacterAt(row + 1, column, seatingArrangement);
    const left = getCharacterAt(row, column - 1, seatingArrangement);
    const right = getCharacterAt(row, column + 1, seatingArrangement);
    const diagonalUpLeft = getCharacterAt(row - 1, column - 1, seatingArrangement);
    const diagonalUpRight = getCharacterAt(row - 1, column + 1, seatingArrangement);
    const diagonalDownLeft = getCharacterAt(row + 1, column - 1, seatingArrangement);
    const diagonalDownRight = getCharacterAt(row + 1, column + 1, seatingArrangement);

    adjcentSeats.push(up, down, left, right, diagonalUpLeft, diagonalUpRight, diagonalDownLeft, diagonalDownRight);
    
    let occupiedAdjcentSeats = 0;

    adjcentSeats.forEach(character => {
        if (character == '#') {
            occupiedAdjcentSeats = occupiedAdjcentSeats + 1;
        }
    })

    return occupiedAdjcentSeats;
}

function getCharacterAt(row, column, seatingArrangement) {
    if (row < 0 || column < 0) {
        return -1;
    }
    if (row >= seatingArrangement.length || column > seatingArrangement[0].length) {
        return -1;
    }
    return seatingArrangement[row][column];
}

console.log('Part One: ' + partOne());


function canSeeUp(currentX, currentY, seatingArrangment) {
    for (let i = currentX - 1; i > -1; i--) {
        if (seatingArrangment[i][currentY] == 'L') {
            return 'L';
        }
        if (seatingArrangment[i][currentY] == '#') {
            return '#';
        }
    }
    return '.';
}

function canSeeDown(currentX, currentY, seatingArrangment) {
    for (let i = currentX + 1; i < seatingArrangment.length; i++) {
        if (seatingArrangment[i][currentY] == 'L') {
            return 'L';
        }
        if (seatingArrangment[i][currentY] == '#') {
            return '#';
        }
    }
    return '.';
}

function canSeeRight(currentX, currentY, seatingArrangment) {
    const row = seatingArrangment[currentX];

    for (let i = currentY + 1; i < row.length; i++) {
        if (seatingArrangment[currentX][i] == 'L') {
            return 'L';
        }
        if (seatingArrangment[currentX][i] == '#') {
            return '#';
        }
    }
    return '.';
}

function canSeeLeft(currentX, currentY, seatingArrangment) {
    const row = seatingArrangment[currentX];

    for (let i = currentY - 1; i > -1; i--) {
        if (seatingArrangment[currentX][i] == 'L') {
            return 'L';
        }
        if (seatingArrangment[currentX][i] == '#') {
            return '#';
        }
    }
    return '.';
}

function canSeeUpLeft(currentX, currentY, seatingArrangment) {
    for (let i = currentX - 1; i > -1; i--) {
        if (seatingArrangment[i][currentY - 1] == 'L') {
            return 'L';
        }
        if (seatingArrangment[i][currentY - 1] == '#') {
            return '#';
        }
        currentY = currentY - 1;
    }
    return '.';
}

function canSeeDownLeft(currentX, currentY, seatingArrangment) {
    for (let i = currentX + 1; i < seatingArrangment.length; i++) {
        if (seatingArrangment[i][currentY - 1] == 'L') {
            return 'L';
        }
        if (seatingArrangment[i][currentY - 1] == '#') {
            return '#';
        }
        currentY = currentY - 1;
    }
    return '.';
}

function canSeeUpRight(currentX, currentY, seatingArrangment) {
    for (let i = currentX - 1; i > -1; i--) {
        if (seatingArrangment[i][currentY + 1] == 'L') {
            return 'L';
        }
        if (seatingArrangment[i][currentY + 1] == '#') {
            return '#';
        }
        currentY = currentY + 1;
    }
    return '.';
}

function canSeeDownRight(currentX, currentY, seatingArrangment) {
    for (let i = currentX + 1; i < seatingArrangment.length; i++) {
        if (seatingArrangment[i][currentY + 1] == 'L') {
            return 'L';
        }
        if (seatingArrangment[i][currentY + 1] == '#') {
            return '#';
        }
        currentY = currentY + 1;
    }
    return '.';
}

function adjacentSeatsOccupiedPartTwo(row, column, seatingArrangement) {
    let adjcentSeats = [];

    const up = canSeeUp(row, column, seatingArrangement);
    const down = canSeeDown(row, column, seatingArrangement);
    const left = canSeeLeft(row, column, seatingArrangement);
    const right = canSeeRight(row, column, seatingArrangement);
    const diagonalUpLeft = canSeeUpLeft(row, column, seatingArrangement);
    const diagonalUpRight = canSeeUpRight(row, column, seatingArrangement);
    const diagonalDownLeft = canSeeDownLeft(row, column, seatingArrangement);
    const diagonalDownRight = canSeeDownRight(row, column, seatingArrangement);

    adjcentSeats.push(up, down, left, right, diagonalUpLeft, diagonalUpRight, diagonalDownLeft, diagonalDownRight);
    
    let occupiedAdjcentSeats = 0;

    adjcentSeats.forEach(character => {
        if (character == '#') {
            occupiedAdjcentSeats = occupiedAdjcentSeats + 1;
        }
    })

    return occupiedAdjcentSeats;
}

function seatsPartTwo(currentArrangement) {

    let newArrangement = initaliseSeats(currentArrangement);

    for (let i = 0; i < currentArrangement.length; i++) {
        let row = currentArrangement[i];
        for (var j = 0; j < row.length; j++) {

            if (getCharacterAt(i, j, currentArrangement) == 'L') {
                if(adjacentSeatsOccupiedPartTwo(i, j, currentArrangement) == 0) {
                    newArrangement[i][j] = '#';
                }
            }
            if (getCharacterAt(i, j, currentArrangement) == '#') {
                if(adjacentSeatsOccupiedPartTwo(i, j, currentArrangement) >= 5) {
                    newArrangement[i][j] = 'L';
                }
            }

          }
    }
    const isFinalState = compareArrays(currentArrangement, newArrangement)
    
    if (!isFinalState) {
        return seatsPartTwo(newArrangement);
    }

    return newArrangement;
}

function partTwo() {

    const finalArangement = seatsPartTwo(processedSeats);

    let occupiedSeats = 0;
    for (let i = 0; i < finalArangement.length; i++) {
        for (let j = 0; j < finalArangement[i].length; j++) {
            if(finalArangement[i][j] == '#') {
                occupiedSeats = occupiedSeats + 1;
            }
        }
    }

    return occupiedSeats;
}


console.log('Part Two: ' + partTwo());