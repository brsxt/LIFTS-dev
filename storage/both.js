import { loadDayExercises, saveDayExercises } from './days';
import { loadExerciseDays, saveExerciseDays } from './exercises';

const deleteExercise = async (key) => {
    await del(exerciseName(key));
    await del(exerciseHistory(key));
    
    for (const day in await loadExerciseDays(key))
        await removeFromObject(key, async () => await loadDayExercises(day), async (val) => await saveDayExercises(day, val));
    await removeFromObject(key, loadExercises, saveExercises)
    await del(exerciseDays(key));
    
    await del(exerciseDelta(key));
    await del(exerciseMinRepRec(key));
    await del(exerciseMaxRepRec(key));
}

const deleteDay = async (key) => {
    await del(dayName(key));
    
    for (const exercise in await loadDayExercises(key))
        await removeFromObject(key, async () => await loadExerciseDays(exercise), async (days) => await saveExerciseDays(exercise, days));
    await removeFromObject(key, loadDays, saveDays);
    await del(dayExercises(key));
}

const addDayExercise = async (day, exercise) => {
    await addToObject(day, async () => await loadExerciseDays(exercise), async (days) => await saveExerciseDays(exercise, days));
    await addToObject(exercise, async () => await loadDayExercises(day), async (exercises) => await saveDayExercises(day, exercises));
}

const deleteDayExercise = async (day, exercise) => {
    await removeFromObject(day, async () => await loadExerciseDays(exercise), async (days) => await saveExerciseDays(exercise, days));
    await removeFromObject(exercise, async () => await loadDayExercises(day), async (exercises) => await saveDayExercises(day, exercises));
}

export { deleteDay, addDayExercise, deleteDayExercise, deleteExercise };