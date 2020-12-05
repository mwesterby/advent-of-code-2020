const fs = require("fs");

const boardingPasses = fs.readFileSync("../inputs/day5.txt", "utf-8").split('\n');

function getSeatIds() {
    let seatIds = [];

    boardingPasses.forEach(boardingPass => {
        let minRow = 0;
        let maxRow = 127;

        let minColumn = 0;
        let maxColumn = 7;

        let rowsToRemove = 64;
        let columnsToRemove = 4;
        
        for (let i = 0; i < boardingPass.length; i++) {
            switch(boardingPass.charAt(i)) {
                case 'F':
                    maxRow = maxRow - rowsToRemove;
                    rowsToRemove = rowsToRemove / 2;
                    break;
                case 'B':
                    minRow = minRow + rowsToRemove
                    rowsToRemove = rowsToRemove / 2;
                    break;
                case 'L':
                    maxColumn = maxColumn - columnsToRemove;
                    columnsToRemove = columnsToRemove / 2;
                    break;
                case 'R':
                    minColumn = minColumn + columnsToRemove;
                    columnsToRemove = columnsToRemove / 2;
                    break;
            }
        }
        const seatId = ((minRow * 8) + minColumn);
        seatIds.push(seatId);
    });

    return seatIds;
    
}

function partOne() {
    const seatIds = getSeatIds();
    return Math.max(...seatIds);
}

console.log(partOne());

function partTwo() {
    const seatIds = getSeatIds();
    const sortedSeats = seatIds.sort(function(a, b) {
        return a - b;
      });

    for (let i = 1; i < sortedSeats.length; i++) {
        if (sortedSeats[i + 1] !== sortedSeats[i] + 1) {
            return sortedSeats[i] + 1;
        }
    }
}

console.log(partTwo());
