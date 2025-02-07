import { View, FlatList, Pressable, Button } from 'react-native';
import { useEffect, useState } from 'react';

import { loadExerciseHistory, appendExerciseHistory, loadExerciseDelta } from '../storage/exercises';
import { getColour, round } from '../utils/utils';
import InputNum from '../components/inputNum';
import Row from '../components/row';
import { pageProps } from '../utils/types';

const Track: React.FC<pageProps> = (props: pageProps) => {
    const [data, setData] = useState<(number|string)[][]>([]);
    const [delta, setDelta] = useState<number>(1);
    let weightText = 'weight';
    if (props.extra != 0) {
        weightText = 'extra weight';
    }
    const loadData = async () => {
        loadExerciseHistory(props.exercise).then((history) => {
            let data = [];
            for (let i in history) {
                let item = history[i];
                data.unshift([item.time, item.reps, round(item.weight)]);
            }
            setData(data);
        });
        loadExerciseDelta(props.exercise).then((delta) => { setDelta(delta); });
    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <View style={[{backgroundColor: getColour(), flex: 1}]}>
            <InputNum
                value={props.weight!}
                changeValue={props.changeWeight!}
                title={weightText}
                delta={delta}
            />
            <InputNum
                value={props.reps!}
                changeValue={props.changeReps!}
                title={'reps'}
                delta={1}
            />
            <Button
                title="Submit"
                onPress={() =>
                    appendExerciseHistory(props.exercise, Date.now(), props.weight! + props.extra!, props.reps! ).then(loadData)
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