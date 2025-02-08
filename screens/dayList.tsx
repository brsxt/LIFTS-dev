import { FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';

import { loadDayList, saveNewDay, loadDayName, loadDayExerciseList } from '../storage/days';
import { loadExerciseList, saveNewExercise } from '../storage/exercises';
import { addDayExercise } from '../storage/both';
import { getStyle } from '../utils/styles';
import ListItem from '../components/listItem';
import { screenProps } from '../utils/types';

const DayList: React.FC<screenProps> = (props: screenProps) => {
    const [dayList, setDayList] = useState<number[]>([]);
    useEffect((): void => {
        props.setHeaderRight(
            <Button
                title={'Profile'}
                onPress={() => {
                    props.newProps({});
                    props.newPage('Profile');
                }}
            />
        )
        loadDayList().then((result: number[]): void => { setDayList(result) });
    }, []);
    return (
        <FlatList
            style={[getStyle(), {flex: 1},]}
            data={dayList}
            ListHeaderComponent={
                <ListItem
                    text={"All exercises"}
                    onPress={(): void => {
                        props.newProps({
                            loadExercises: loadExerciseList,
                            saveNewExercise: saveNewExercise
                        });
                        props.newPage('ExerciseList');
                    }}
                />
            }
            renderItem={({item}) => {
                return (
                    <ListItem
                        getText={async (): Promise<string> => await loadDayName(item)}
                        onPress={(): void => {
                            props.newProps({
                                day: item,
                                loadExercises: async (): Promise<number[]> => await loadDayExerciseList(item),
                                saveNewExercise: async (): Promise<number> => {
                                    return await saveNewExercise().then(async (exercise: number): Promise<number> => {
                                        await addDayExercise(item, exercise)
                                        return exercise;
                                    })
                                },
                            });
                            props.newPage('ExerciseList');
                        }}
                    />
                )
            }}
            ListFooterComponent={
                <ListItem
                    text={"Add new workout"}
                    onPress={
                        async (): Promise<void> => await saveNewDay().then((): void => {
                            loadDayList().then((result: number[]): void => {
                                setDayList(result) 
                            })
                        })
                    }
                />
            }
        />
    );
}

export default DayList;