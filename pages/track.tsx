import { View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import { loadExerciseHistory, appendExerciseHistory, loadExerciseDelta, saveExerciseHistory } from '../storage/exercises';
import { round } from '../utils/utils';
import InputNum from '../components/inputNum';
import Row from '../components/row';
import { hashSet, pageProps, set } from '../utils/types';
import { hashSetToggle } from '../utils/utils';
import { getStyle } from '../utils/styles';
import Button from '../components/button';
import List from '../components/list';

const Track: React.FC<pageProps> = (props: pageProps) => {
    const [data, setData] = useState<(number|string)[][]>([]);
    const [delta, setDelta] = useState<number>(1);
    const [selected, setSelected] = useState<hashSet>({});
    const [count, setCount] = useState<number>(0);
    const [history, setHistory] = useState<set[]>([]);
    let weightText = 'Weight';
    if (props.extra != 0) {
        weightText = 'Extra weight';
    }
    const loadData = async () => {
        loadExerciseHistory(props.exercise).then((history) => {
            setHistory(history);
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
        <View style={[{flex: 1}, getStyle()]}>
            <InputNum
                value={props.weight!}
                changeValue={props.changeWeight!}
                title={weightText}
                delta={delta}
                decimals={true}
            />
            <InputNum
                value={props.reps!}
                changeValue={props.changeReps!}
                title={'Reps'}
                delta={1}
                decimals={false}
            />
            {count == 1 && 
                <Button
                    title="Edit"
                    onPress={() => {
                        let temp: set[] = [];
                        history.forEach((item, index) => {
                            if (history.length - index - 1 in selected) {
                                temp.push({time: item.time, weight: Number(props.weight)! + props.extra!, reps: Number(props.reps)!});
                            } else {
                                temp.push(item);
                            }
                        });
                        saveExerciseHistory(props.exercise, temp).then(loadData);
                    }}
                />
                ||
                <Button
                    title="Submit"
                    onPress={() =>
                        appendExerciseHistory(props.exercise, Date.now(), Number(props.weight)! + props.extra!, Number(props.reps)! ).then(loadData)
                    }
                />
            }
            <List
                data={data}
                ListHeaderComponent={
                    <Row data={['Date', 'Reps', 'Weight']}/>
                }
                renderItem={({index, item}) => {
                    item = [...item]
                    item[0] = (new Date(item[0])).toLocaleDateString()
                    return (
                        <Pressable
                            key={index}
                            onPress={(): void => {
                                let temp: hashSet = {...selected};
                                setCount(count + hashSetToggle(index, temp));
                                setSelected(temp);
                            }}
                        >
                            <Row data={item} selected={index in selected}/>
                        </Pressable>
                    )
                }}
            />
            {count > 0 &&
                <Button
                    title="Delete"
                    onPress={() => {
                        props.screenProps!.newProps({
                            execute: async () => {
                                let temp: set[] = [];
                                history.forEach((item, index) => {
                                    if (!(history.length - index - 1 in selected))
                                        temp.push(item);
                                });
                                await saveExerciseHistory(props.exercise, temp);
                            },
                            getName: async () => 'these sets',
                            backDistance: 1,
                            action: 'delete',
                        });
                        props.screenProps!.newPage('Confirm');
                    }}
                />
            }
        </View>
    );
}

export default Track;