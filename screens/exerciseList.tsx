import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';

import { loadDayName } from '../storage/days';
import { loadExerciseName } from '../storage/exercises';
import { getStyle } from '../utils/styles';
import ListItem from '../components/listItem';
import { screenProps } from '../utils/types';
import Button from '../components/button';

const ExerciseList: React.FC<screenProps> = (props: screenProps) => {
    const [exerciseList, setExerciseList] = useState<number[]>([]);
    useEffect(() => {
        (async () => {
            if (props.getProps().day) {
                props.setHeaderRight(
                    <Button
                        title={'Settings'}
                        onPress={() => {
                            props.newProps({
                                day: props.getProps().day!,
                            });
                            props.newPage('DaySettings');
                        }}
                    />
                )
                props.setTitle(await loadDayName(props.getProps().day!));
            } else {
                props.setHeaderRight(undefined);
                props.setTitle('All exercises');
            }
        })();
        props.getProps().loadExercises!().then((result) => setExerciseList(result));
    }, []);
    return (
        <FlatList
            style={[getStyle(), {flex: 1},]}
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
                <ListItem text={"Add new exercise"} onPress={
                    async (): Promise<void> => {
                        props.getProps().saveNewExercise!().then(async (): Promise<void> => {
                            props.getProps().loadExercises!().then((result) => setExerciseList(result))
                        });
                    }
                }/>
            }
        />
    );
}

export default ExerciseList;