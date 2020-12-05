const fs = require("fs");

const batchFile = fs.readFileSync("../inputs/day4.txt", "utf-8").split('\n');

function partOne() {

    let validPassports = 0;
    let passportData = new Map();

    function reset() {
        passportData['byr'] = '';
        passportData['iyr'] = '';
        passportData['eyr'] = '';
        passportData['hgt'] = '';
        passportData['hcl'] = '';
        passportData['ecl'] = '';
        passportData['pid'] = '';
        passportData['cid'] = '';
    }
    reset();

    batchFile.forEach(line => {
        if (!line) {
            reset();
        } else {
            const lineData = line.split(/[\s]/);
            lineData.forEach(data => {
                const keyValuePair = data.split(/[:]/);
                passportData[keyValuePair[0]] = keyValuePair[1]
            });
            
        }

        if(passportData['byr'] != '' &&
        passportData['iyr'] != '' &&
        passportData['eyr'] != '' &&
        passportData['hgt'] != '' &&
        passportData['hcl'] != '' &&
        passportData['ecl'] != '' &&
        passportData['pid'] != '') {
            validPassports = validPassports + 1;
            reset();
        }

        
    });
    return validPassports;
}

console.log(partOne());

function partTwo() {

    let validPassports = 0;
    let passportData = new Map();

    function reset() {
        passportData['byr'] = '';
        passportData['iyr'] = '';
        passportData['eyr'] = '';
        passportData['hgt'] = '';
        passportData['hcl'] = '';
        passportData['ecl'] = '';
        passportData['pid'] = '';
        passportData['cid'] = '';
    }
    reset();

    batchFile.forEach(line => {
        if (!line) {
            // Reset
            reset();
        } else {
            const lineData = line.split(/[\s]/);
            lineData.forEach(data => {
                const keyValuePair = data.split(/[:]/);
                passportData[keyValuePair[0]] = keyValuePair[1]
            });
            
        }

        if(passportData['byr'] != '' &&
        passportData['iyr'] != '' &&
        passportData['eyr'] != '' &&
        passportData['hgt'] != '' &&
        passportData['hcl'] != '' &&
        passportData['ecl'] != '' &&
        passportData['pid'] != '') {
            
            if (validatePassport(passportData)) {
                validPassports = validPassports + 1;
            }
            reset();
        }

        
    });
    return validPassports;
}

function validateYear(year, min, max, length) {
    if(year >= min && year <= max && year.toString().length === length) {
        return true;
    }
    return false;
}

function validateHeight(heightAndUnits) {
    const hgtCmMin = 150;
    const hgtCmMax = 193;
    const hgtInMin = 59;
    const hgtInMax = 79;

    const regex = /[0-9]*/;
    const height = heightAndUnits.match(regex)

    if(heightAndUnits.endsWith('cm')) {
        if(height[0] >= hgtCmMin && height[0] <= hgtCmMax) {
            return true;
        }
    } else if(heightAndUnits.endsWith('in')) {
        if(height[0] >= hgtInMin && height[0] <= hgtInMax) {
            return true;
        }
    }

    return false;
}


function validateHairColor(hairColor) {
    const hcl = /^#[0-9a-f]{6}$/;
    if(hairColor.match(hcl)) {
        return true;
    }
    return false;
}

function validateEyeColor(eyeColor) {
    if (eyeColor == 'amb' || 
    eyeColor == 'blu' || 
    eyeColor == 'brn' ||
    eyeColor == 'gry' ||
    eyeColor == 'grn' ||
    eyeColor == 'hzl' ||
    eyeColor == 'oth') {
        return true;
    }
    return false;
}

function validatePassportId(passportId) {
    const pid = /^[0-9]{9}$/;
    if(passportId.match(pid)) {
        return true;
    }
    return false;
}


function validatePassport(passportData) {
    const byrMin = 1920;
    const byrMax = 2002;
    const byrLen = 4;
    const byr = validateYear(passportData['byr'], byrMin, byrMax, byrLen);

    const iyrMin = 2010;
    const iyrMax = 2020;
    const iyrLen = 4;
    const iyr = validateYear(passportData['iyr'], iyrMin, iyrMax, iyrLen);

    const eyrMin = 2020;
    const eyrMax = 2030;
    const eyrLen = 4;
    const eyr = validateYear(passportData['eyr'], eyrMin, eyrMax, eyrLen);

    const hgt = validateHeight(passportData['hgt']);

    const hcl = validateHairColor(passportData['hcl']);

    const ecl = validateEyeColor(passportData['ecl']);

    const pid = validatePassportId(passportData['pid']);


    if(byr && iyr && eyr && hgt && hcl && ecl && pid) {
        return true;
    }
    return false;

    
}

console.log(partTwo());