import { loadBodyWeight } from '../storage/profile';
import { loadExerciseDelta, loadExerciseType } from '../storage/exercises';
import { hashSet } from './types';

let MAX_REPS = 20;

let TABLE = [100, 97, 94.5, 91.5, 88.5, 86, 83, 80.5, 77.5, 74.5, 73, 71, 69.5, 68, 66.5, 65, 64, 62.5, 61, 60]

function calcWeight(w: number, x: number, y: number): number {
    if (x < 1 || y < 1) return 0;
    return w * TABLE[y-1] / TABLE[x-1];
}

function calcReps(m: number, w: number, n: number): number {
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
    return res;
}

const roundDownDelta = (weight: number, delta: number): number => Math.floor(weight/delta)*delta;

const roundWeightDown = async (exercise: number, weight: number): Promise<number> => {
    let delta = await loadExerciseDelta(exercise);
    if (await loadExerciseType(exercise) == 'body') {
        let bodyWeight = await loadBodyWeight();
        let diff = weight - bodyWeight;
        return bodyWeight + roundDownDelta(diff, delta);
    }
    return roundDownDelta(weight, delta);
}

const lowerWeight = async (exercise: number, weight: number): Promise<number> => {
    let delta = await loadExerciseDelta(exercise)
    return weight - delta;
}

const displayWeight = async (exercise: number, weight: number): Promise<string> => {
    if (await loadExerciseType(exercise) == 'body') {
        let bodyWeight = await loadBodyWeight();
        let diff = weight - bodyWeight;
        if (diff == 0)
            return String(weight);
        let sign: string;
        if (diff < 0)
            sign = '-';
        else
            sign = '+';
        return `${bodyWeight} ${sign} ${round(Math.abs(diff))}`;
    }
    return String(round(weight));
}

const ACCURACY = 1000;

const round = (value: number): number => Math.round(ACCURACY*value)/ACCURACY;

function hashSetAdd(val: any, set: hashSet): void {
    set[val] = 0;
}

function hashSetRemove(val: any, set: hashSet): void {
    delete set[val];
}

function hashSetToggle(val: any, set: hashSet): number {
    let res: number = 0;
    if (val in set) {
        hashSetRemove(val, set);
        res -= 1;
    } else {
        hashSetAdd(val, set);
        res += 1;
    }
    return res;
}

function titleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

function isNumber(s: string): boolean {
    return s.match(/^\d*\.?\d*$/) != null;
}

export { calcWeight, calcReps, roundWeightDown, MAX_REPS, lowerWeight, displayWeight, round, hashSetAdd, hashSetRemove, hashSetToggle, titleCase, isNumber };