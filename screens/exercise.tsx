import { View, Button } from 'react-native';
import { useState, useEffect } from 'react';

import { getColour } from '../utils/utils';
import ListItem from '../components/listItem';
import Track from '../pages/track';
import WeightList from '../pages/weightList';
import RepList from '../pages/repList';
import { loadExerciseHistory, loadExerciseName } from '../storage/exercises';
import { screenProps } from '../utils/types';

const Exercise: React.FC<screenProps> = (props: screenProps) => {
    const [tab, setTab] = useState<number>(0);
    const [weight, changeWeight] = useState<number>(0);
    const [reps, changeReps] = useState<number>(0);
    useEffect(() => {
        props.setHeaderRight(
            <Button
                title={'Settings'}
                onPress={() => {
                    props.newProps({
                        exercise: props.getProps().exercise,
                    });
                    props.newPage('ExerciseSettings');
                }}
            />
        )
        loadExerciseHistory(props.getProps().exercise!).then((history) => {
            if (history.length == 0)
                return;
            changeWeight(history[history.length-1].weight);
            changeReps(history[history.length-1].reps);
        });
        loadExerciseName(props.getProps().exercise!).then((name) => {
            props.setTitle(name);
        });
    }, [])
    const tabs = [
        <Track key='T' exercise={props.getProps().exercise!} weight={weight} changeWeight={changeWeight} reps={reps} changeReps={changeReps}/>,
        <RepList key='R' exercise={props.getProps().exercise!}/>,
        <WeightList key='W' exercise={props.getProps().exercise!}/>
    ];
    const names = ['Track', 'Best', 'Next'];
    return (
        <View
            style={[{backgroundColor: getColour(), flex: 1},]}
        >
            <View style={[{backgroundColor: getColour()}, {flexDirection: 'row'}]}>
                {tabs.map((_, index) =>
                    <ListItem
                        text={names[index]}
                        onPress={() => setTab(index)}
                        key={index}
                    />
                )}
            </View>
            {tabs[tab]}
        </View>
    );
}

export default Exercise;