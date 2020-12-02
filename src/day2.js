const fs = require("fs");

const passwords = fs.readFileSync("./inputs/day2.txt", "utf-8").split('\n');

function partOne() {
    let validPasswordCount = 0;
    passwords.forEach(password => {   
        const data = password.split(/[\s]/);
        
        const range = data[0].split('-')
        const lowerBoundry = range[0];
        const upperBoundry = range[1];
    
        const requiredCharacter = data[1].replace(':', '');
        const passwordUsed = data[2];
    
        const requiredCharacterCount = [...passwordUsed].filter(c => c === requiredCharacter).length;
        
        if(requiredCharacterCount >= lowerBoundry && requiredCharacterCount <= upperBoundry) {
            validPasswordCount++;
        }
    });
    return validPasswordCount;
}

function partTwo() {
    let validPasswordCount = 0;
    passwords.forEach(password => {   
        const data = password.split(/[\s]/);
        
        const range = data[0].split('-')
        const firstPosition = (range[0] - 1);
        const secondPosition = (range[1] - 1);
    
        const requiredCharacter = data[1].replace(':', '');
        const passwordUsed = data[2];
    
        const firstCharacter = passwordUsed.charAt(firstPosition);
        const secondCharacter = passwordUsed.charAt(secondPosition);
        
        if(firstCharacter !== secondCharacter) {
            if(firstCharacter == requiredCharacter || secondCharacter == requiredCharacter) {
                validPasswordCount++
            }
        }

    });
    return validPasswordCount;
}

module.exports = {
    partOne,
    partTwo,
};
