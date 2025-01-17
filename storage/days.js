import { load, save, del, addToObject, removeFromObject, addToList } from './_helpers';

const days = () => 'days';
const loadDays = async () => await load(days(), {});
const saveDays = async (val) => await save(days(), val);

const loadNextDayIndex = async () => {
    let key = 'nextDayIndex';
    let val = await load(key, 1);
    await save(key, val+1);
    return val
}

const dayName = (key) => `day_${key}_name`;
const loadDayName = async (key) => await load(dayName(key), 'New day');
const saveDayName = async (key, val) => await save(dayName(key), val);

const saveNewDay = async () =>
    await addToObject(await loadNextDayIndex(), loadDays, saveDays);

const dayExercises = (key) => `day_${key}_exercises`;
const loadDayExercises = async (key) => await load(dayExercises(key), {});
const saveDayExercises = async (key, val) => await save(dayExercises(key), val);

export { loadDays, saveNewDay, loadDayName, saveDayName, loadDayExercises, saveDayExercises };