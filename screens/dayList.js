import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';

import { loadDays, saveNewDay, loadDayName, loadDayExercises } from '../storage/days';
import { loadExercises, saveNewExercise } from '../storage/exercises';
import { addDayExercise } from '../storage/both';
import { getColour } from '../utils/utils';
import ListItem from '../components/listItem';

const DayList = (props) => {
    const [dayList, setDayList] = useState([]);
    useEffect(() => {
        props.setHeaderRight(undefined);
        loadDays().then((result) => {setDayList(Object.keys(result))});
    }, []);
    return (
        <FlatList
            style={[{backgroundColor: getColour(), flex: 1},]}
            data={dayList}
            ListHeaderComponent={
                <ListItem
                    text={"All exercises"}
                    onPress={() => {
                        props.newProps({
                            loadExercises: loadExercises,
                            saveNewExercise: saveNewExercise
                        });
                        props.newPage('ExerciseList');
                    }}
                />
            }
            renderItem={({item}) => {
                return (
                    <ListItem
                        getText={() => loadDayName(item)}
                        onPress={() => {
                            props.newProps({
                                day: item,
                                loadExercises: async () => await loadDayExercises(item),
                                saveNewExercise: async () => await saveNewExercise().then((exercise) => {addDayExercise(item, exercise)})
                            });
                            props.newPage('ExerciseList');
                        }}
                    />
                )
            }}
            ListFooterComponent={
                <ListItem
                    text={"Add new workout"}
                    onPress={async () => await saveNewDay().then(() => loadDays().then((result) => setDayList(Object.keys(result))))}
                />
            }
        />
    );
}

export default DayList;