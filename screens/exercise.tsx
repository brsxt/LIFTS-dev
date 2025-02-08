import { View } from 'react-native';
import { useState, useEffect } from 'react';

import { round } from '../utils/utils';
import ListItem from '../components/listItem';
import Track from '../pages/track';
import WeightList from '../pages/weightList';
import RepList from '../pages/repList';
import { loadExerciseHistory, loadExerciseName, loadExerciseType } from '../storage/exercises';
import { loadBodyWeight } from '../storage/profile';
import { screenProps, set } from '../utils/types';
import { getStyle } from '../utils/styles';
import Button from '../components/button';

const Exercise: React.FC<screenProps> = (props: screenProps) => {
    const [tab, setTab] = useState<number>(0);
    const [weight, setWeight] = useState<string>(String(0));
    const [reps, setReps] = useState<string>(String(0));
    const [extra, setExtra] = useState<number>(0);
    useEffect(() => {
        (async (): Promise<void> => {
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
            let type: string = await loadExerciseType(props.getProps().exercise!);
            let extra: number = 0;
            if (type == 'body') {
                extra = await loadBodyWeight();
                setExtra(extra);
            }
            let history: set[] = await loadExerciseHistory(props.getProps().exercise!);
            if (history.length > 0) {
                setWeight(String(round(history[history.length-1].weight - extra)));
                setReps(String(history[history.length-1].reps));
            }
            let name: string = await loadExerciseName(props.getProps().exercise!);
            props.setTitle(name);
        })();
    }, [])
    const tabs = [
        <Track
            key='T'
            exercise={props.getProps().exercise!}
            weight={weight}
            changeWeight={setWeight}
            reps={reps}
            changeReps={setReps}
            extra={extra}
            screenProps={props}
        />,
        <RepList key='R' exercise={props.getProps().exercise!}/>,
        <WeightList key='W' exercise={props.getProps().exercise!}/>
    ];
    const names = ['Track', 'Best', 'Next'];
    return (
        <View
            style={[getStyle(), {flex: 1},]}
        >
            <View style={[getStyle(), {flexDirection: 'row'}]}>
                {tabs.map((_, index) =>
                    <ListItem
                        text={names[index]}
                        onPress={() => setTab(index)}
                        key={index}
                        selected={tab == index}
                    />
                )}
            </View>
            {tabs[tab]}
        </View>
    );
}

export default Exercise;