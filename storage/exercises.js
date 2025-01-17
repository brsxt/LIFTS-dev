import { load, save, del, addToObject, removeFromObject, addToList, saveNew } from './_helpers';

const exercises = () => 'exercises';
const loadExercises = async () => await load(exercises(), {});
const saveExercises = async (val) => await save(exercises(), val);

const loadNextExerciseIndex = async () => {
    let key = 'nextExerciseIndex';
    let val = await load(key, 0);
    await save(key, val+1);
    return val
}

const saveNewExercise = async () =>
    await addToObject(await loadNextExerciseIndex(), loadExercises, saveExercises);

const exerciseName = (key) => `exercise_${key}_name`;
const loadExerciseName = async (key) => await load(exerciseName(key), 'New exercise');
const saveExerciseName = async (key, val) => await save(exerciseName(key), val);

const exerciseHistory = (key) => `exercise_${key}_history`;
const loadExerciseHistory = async (key) => await load(exerciseHistory(key), []);
const saveExerciseHistory = async (key, val) => await save(exerciseHistory(key), val);
const appendExerciseHistory = async (key, time, weight, reps) =>
    await addToList({time: time, weight: weight, reps: reps}, async () => await loadExerciseHistory(key), async (val) => await saveExerciseHistory(key, val))

const exerciseDays = (key) => `exercise_${key}_days`;
const loadExerciseDays = async (key) => await load(exerciseDays(key), {});
const saveExerciseDays = async (key, val) => await save(exerciseDays(key), val);

const exerciseMinRepRec = (key) => `exercise_${key}_minRepRec`;
const loadExerciseMinRepRec = async (key) => await load(exerciseMinRepRec(key), 1);
const saveExerciseMinRepRec = async (key, val) => await save(exerciseMinRepRec(key), val);

const exerciseMaxRepRec = (key) => `exercise_${key}_maxRepRec`;
const loadExerciseMaxRepRec = async (key) => await load(exerciseMaxRepRec(key), 20);
const saveExerciseMaxRepRec = async (key, val) => await save(exerciseMaxRepRec(key), val);

const exerciseType = (key) => `exercise_${key}_type`;
const loadExerciseType = async (key) => await load(exerciseType(key), 'delta'); // delta custom body
const saveExerciseType = async (key, val) => await save(exerciseType(key), val);

const exerciseDelta = (key) => `exercise_${key}_delta`;
const loadExerciseDelta = async (key) => await load(exerciseDelta(key), 1);
const saveExerciseDelta = async (key, val) => await save(exerciseDelta(key), val);

const exerciseCustom = (key) => `exercise_${key}_custom`;
const loadExerciseCustom = async (key) => await load(exerciseCustom(key), []);
const saveExerciseCustom = async (key, val) => await save(exerciseCustom(key), val);

const loadExerciseWeights = async (key) => {
    return 0
}

export { loadExercises, saveExercises, saveNewExercise, loadExerciseName, saveExerciseName, loadExerciseHistory, saveExerciseHistory, appendExerciseHistory, loadExerciseDays, saveExerciseDays, loadExerciseMinRepRec, saveExerciseMinRepRec, loadExerciseMaxRepRec, saveExerciseMaxRepRec, loadExerciseType, saveExerciseType, loadExerciseDelta, saveExerciseDelta, loadExerciseCustom, saveExerciseCustom, loadExerciseWeights };