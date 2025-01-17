import { View, FlatList, Pressable, Button } from 'react-native';
import { useEffect, useState } from 'react';

import { loadExerciseHistory, appendExerciseHistory } from '../storage/exercises';
import { getColour } from '../utils/utils';
import InputNum from '../components/inputNum';
import Row from '../components/row';

const Track = (props) => {
    const [data, setData] = useState([]);
    const loadData = () => {
        loadExerciseHistory(props.exercise).then((history) => {
            let data = [];
            for (let i in history) {
                item = history[i];
                data.unshift([item.time, item.reps, item.weight]);
            }
            setData(data);
        });
    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <View style={[{backgroundColor: getColour(), flex: 1}]}>
            <InputNum
                value={props.weight}
                changeValue={props.changeWeight}
                title={'weight'}
            />
            <InputNum
                value={props.reps}
                changeValue={props.changeReps}
                title={'reps'}
            />
            <Button
                title="Submit"
                onPress={() =>
                    appendExerciseHistory(props.exercise, Date.now(), props.weight, props.reps).then(() => loadData())
                }
            />
            <FlatList
                data={data}
                ListHeaderComponent={
                    <Row data={['date', 'reps', 'weight']}/>
                }
                renderItem={({index, item}) => {
                    item = [...item]
                    item[0] = (new Date(item[0])).toLocaleDateString()
                    return (
                        <Pressable
                            key={index}
                        >
                            <Row data={item}/>
                        </Pressable>
                    )
                }}
            />
        </View>
    );
}

export default Track;