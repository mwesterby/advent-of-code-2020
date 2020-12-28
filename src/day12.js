const fs = require("fs");

const navigationInstructions = fs.readFileSync("../inputs/day12.txt", "utf-8").split('\n');

function partOne() {

    const directions = ['N', 'E', 'S', 'W'];
    let currentDirection = 'E';
    let x = 0;
    let y = 0;

    for (let i = 0; i < navigationInstructions.length; i++) {
        
        let action = navigationInstructions[i].charAt(0);
        const value = navigationInstructions[i].slice(1);

        if (action == 'R' || action == 'L') {
            let directionsToTurn = parseInt(value) / 90;
            const currentndex = directions.indexOf(currentDirection)
            let newDirectionIndex = ((directionsToTurn + currentndex) % 4);
            if(action == 'L') {
                let tempIndex = (currentndex - directionsToTurn);
                if (tempIndex < 0) {
                    tempIndex = 4 + tempIndex;
                }
                newDirectionIndex = tempIndex;
            }

            currentDirection = directions[newDirectionIndex];
        }


        if (action == 'F') {
            action = currentDirection;
        }

        switch (action) {
            case 'N':
                y = y + parseInt(value);
                break;
            case 'E':
                x = x + parseInt(value);
                break;
            case 'S':
                y = y - parseInt(value);
                break;
            case 'W':
                x = x - parseInt(value);
                break;
            default:
                break;
        }

    }
    
    return (Math.abs(x) + Math.abs(y));
}

console.log('Part One: ' + partOne());

function partTwo() {
    let shipX = 0;
    let shipY = 0;
    let wayPointX = 10;
    let wayPointY = 1;

    for (let i = 0; i < navigationInstructions.length; i++) {
        let action = navigationInstructions[i].charAt(0);
        const value = navigationInstructions[i].slice(1);

        if (action == 'R' || action == 'L') {
            let directionsToTurn = parseInt(value) / 90;

            let turns = directionsToTurn % 4;

            if (action == 'L') {
                turns = 4 - turns;
            }

            for (let i = 0; i < turns; i++) {
                let tempX = 0;
                let tempY = 0;
                if(wayPointX < 0) {
                    tempY = Math.abs(wayPointX);
                } else {
                    tempY = -Math.abs(wayPointX)
                }

                if(wayPointY < 0) {
                    tempX = -Math.abs(wayPointY);
                } else {
                    tempX = Math.abs(wayPointY)
                }     
                
                wayPointX = tempX;
                wayPointY = tempY;
            }

        }

        switch (action) {
            case 'N':
                wayPointY = wayPointY + parseInt(value);
                break;
            case 'E':
                wayPointX = wayPointX + parseInt(value);
                break;
            case 'S':
                wayPointY = wayPointY - parseInt(value);
                break;
            case 'W':
                wayPointX = wayPointX - parseInt(value);
                break;
            case 'F':
                shipX = shipX + (wayPointX * parseInt(value));
                shipY = shipY + (wayPointY * parseInt(value));
                break;
            default:
                break;
        }

    }

    
    return (Math.abs(shipX) + Math.abs(shipY));
}

console.log('Part Two: ' + partTwo());