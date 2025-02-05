import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';

import { loadDayName, loadDayExercises } from '../storage/days';
import { loadExercises, saveNewExercise, loadExerciseName } from '../storage/exercises';
import { addDayExercise } from '../storage/both';
import { getColour } from '../utils/utils';
import ListItem from '../components/listItem';

const ExerciseList = (props) => {
    let localLoadExercises = loadExercises;
    let localSaveNewExercise = saveNewExercise;
    if (props.getProps().day) {
        localLoadExercises = async () => await loadDayExercises(props.getProps().day),
        localSaveNewExercise = async () => await saveNewExercise().then((exercise) => addDayExercise(props.getProps().day, exercise))
    }
    const [exerciseList, setExerciseList] = useState([]);
    useEffect(() => {
        props.setHeaderRight(undefined);
        localLoadExercises().then((result) => setExerciseList(Object.keys(result)));
        if (props.getProps().day) loadDayName(props.getProps().day);
    }, []);
    return (
        <FlatList
            style={[{backgroundColor: getColour(), flex: 1},]}
            data={exerciseList}
            renderItem={({item}) => {
                return (
                    <ListItem
                        getText={() => loadExerciseName(item)}
                        onPress={() => {
                            props.newProps({
                                exercise: item
                            });
                            props.newPage('Exercise');
                        }}
                    />
                )
            }}
            ListFooterComponent={
                <ListItem text={"Add new exercise"} onPress={() => {
                    localSaveNewExercise().then(() => localLoadExercises().then((result) => setExerciseList(Object.keys(result))));
                }}/>
            }
        />
    );
}

export default ExerciseList;