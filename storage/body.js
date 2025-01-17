import { load, save } from './_helpers';

const bodyWeight = (key) => 'bodyweight';
const loadBodyWeight = async (key) => await load(bodyWeight(key), 100);
const saveBodyWeight = async (key, val) => await save(bodyWeight(key), val);