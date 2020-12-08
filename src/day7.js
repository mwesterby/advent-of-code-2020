const fs = require("fs");

const bagRules = fs.readFileSync("../inputs/day7.txt", "utf-8").split('\n');


function mapRules() {
    let rules = new Map();
    bagRules.forEach(rule => {
        const splitRule = rule.split('contain');
        splitRule[1] = splitRule[1].replace('bags', '');
        splitRule[1] = splitRule[1].replace('bag', '');``
        splitRule[1] = splitRule[1].replace('.', '');``
        splitRule[0] = splitRule[0].replace('bags', '');
        splitRule[0] = splitRule[0].replace('bag', '');
        splitRule[0] = splitRule[0].replace('.', '');
        rules.set(splitRule[0].trim(), splitRule[1].trim());
    });
    return rules;
}

function bagsContaining(rules, bagName) {
    let parentBags = new Set();
    rules.forEach((childBags, parentBag) => {
        if (childBags.includes(bagName)) {            
            parentBags.add(parentBag);
            const outerBags = bagsContaining(rules, parentBag);
            outerBags.forEach(outerBag => {
                parentBags.add(outerBag);
            })
        }
    });

    return parentBags;
}


function partOne() {
    const rules = mapRules();
    
    const allBags = bagsContaining(rules, 'shiny gold');
    return allBags.size;

}

console.log(partOne());

function mapRulesNew() {
    let rules = new Map();
    bagRules.forEach(rule => {
        rule = rule.replace(/bags?/g, '');
        const splitRule = rule.split('contain');
        const childBags = splitRule[1].split(',');
        let formattedChildBags = new Map();
        childBags.forEach(childBag => {
            if (!childBag.includes('no other')) {
                const quantity = childBag.charAt(1);
                let bag = childBag.replace(`${quantity} `, '');
                bag = bag.replace('.', '');
                bag = bag.trim();
                formattedChildBags.set(bag, quantity);
            } else {
                formattedChildBags.set('no other', 0);
            }
        });
        rules.set(splitRule[0].trim(), formattedChildBags);
    });
    return rules;
}

function findBags(rules, bag) {
    let totalQuantity = 0;
    rules.forEach((childBags, parentBag) => {
        if(parentBag == bag) {
            childBags.forEach((quantity, childBag) => {
                if(childBag.includes('no other')) {
                    return 0;
                }
                totalQuantity = totalQuantity + parseInt(quantity);
                totalQuantity = totalQuantity + (findBags(rules, childBag) * quantity);
            })
            
        }
    })
    return totalQuantity;
}

function partTwo() {
    const rules = mapRulesNew();
    const bags = findBags(rules, 'shiny gold');
    return bags;
}

console.log(partTwo());