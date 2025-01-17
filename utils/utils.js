let MAX_REPS = 20;

let TABLE = [100, 97, 94.5, 91.5, 88.5, 86, 83, 80.5, 77.5, 74.5, 73, 71, 69.5, 68, 66.5, 65, 64, 62.5, 61, 60]

function calcWeight(w, x, y) {
    return parseFloat(w * TABLE[y-1] / TABLE[x-1]);
}

function calcReps(m, w, n) {
    let p = 100 * w / m;
    let res = n+1;
    if (p > 100) {
        res = 0;
    } else {
        if (TABLE.includes(p)) return TABLE.indexOf(p) + 1;
        for (let i = 1; i < n; i++) {
            if (TABLE[i-1] > p && p > TABLE[i]) {
                res = i + 1 - (p - TABLE[i]) / (TABLE[i-1] - TABLE[i])
                break;
            }
        }
    }
    return parseFloat(res);
}

const roundWeightDown = (exercise, weight) => {
    return Math.floor(weight/2.5)*2.5;
}

const lowerWeight = (exercise, weight) => {
    return weight - 2.5;
}

function getColour() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(8 + Math.random() * 8)];
    }
    return color;
}

export { calcWeight, calcReps, roundWeightDown, getColour, MAX_REPS, lowerWeight };