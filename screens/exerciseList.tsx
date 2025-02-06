import { FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';

import { loadDayName } from '../storage/days';
import { loadExerciseName } from '../storage/exercises';
import { getColour } from '../utils/utils';
import ListItem from '../components/listItem';
import { screenProps } from '../utils/types';

const ExerciseList: React.FC<screenProps> = (props: screenProps) => {
    const [exerciseList, setExerciseList] = useState<number[]>([]);
    useEffect(() => {
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
        } else {
            props.setHeaderRight(undefined);
        }
        props.getProps().loadExercises!().then((result) => setExerciseList(result));
        if (props.getProps().day) loadDayName(props.getProps().day!);
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