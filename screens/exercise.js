import { View, Button, BackHandler } from 'react-native';
import { useState, useEffect } from 'react';

import { getColour } from '../utils/utils';
import ListItem from '../components/listItem';
import Track from '../pages/track';
import WeightList from '../pages/weightList';
import RepList from '../pages/repList';
import { loadExerciseHistory } from '../storage/exercises';

const Exercise = (props) => {
    const [tab, setTab] = useState(0);
    const [weight, changeWeight] = useState(0);
    const [reps, changeReps] = useState(0);
    useEffect(() => {
        const backAction = () => {

        };
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
    
        // return () => backHandler.remove();
        props.setHeaderRight(
            <Button
                title={'Settings'}
            />
        )
        loadExerciseHistory(props.getProps().exercise).then((history) => {
            if (history.length == 0)
                return;
            changeWeight(Number(history[history.length-1].weight));
            changeReps(parseInt(history[history.length-1].reps));
        });
    }, [])
    const tabs = [
        <Track key='Track' exercise={props.getProps().exercise} weight={weight} changeWeight={changeWeight} reps={reps} changeReps={changeReps}/>,
        <RepList key='RepList' exercise={props.getProps().exercise}/>,
        <WeightList key='WeightList' exercise={props.getProps().exercise}/>
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