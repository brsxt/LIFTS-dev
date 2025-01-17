import { FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import { loadExerciseHistory } from '../storage/exercises';
import { calcWeight, roundWeightDown, MAX_REPS } from '../utils/utils';
import Row from '../components/row';

const RepList = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        loadExerciseHistory(props.exercise).then((history) => {
            let maxes = {};
            for (let {reps, weight} of history)
                maxes[reps] = Math.max(maxes[reps] || 0, weight);
            let oneRM = Math.max(...Object.entries(maxes).map(([r, w]) => calcWeight(w, r, 1)));
            let data = []
            let weight = 0;
            let est, rec;
            for (let reps = MAX_REPS; reps > 0; reps--) {
                weight = Math.max(weight, maxes[reps] || 0);
                est = calcWeight(oneRM, 1, reps);
                rec = roundWeightDown(props.exercise, est);
                if (rec == weight) rec += 2.5;
                data.unshift([reps, weight, est, rec]);
            }
            setData(data);
        });
    }, [])
    return (
        <FlatList
            data={data}
            ListHeaderComponent={
                <Row data={['reps', 'weight', 'estimated', 'recommended']}/>
            }
            renderItem={({index, item}) => {
                return (
                    <Pressable
                        key={index}
                    >
                        <Row data={item}/>
                    </Pressable>
                )
            }}
        />
    );
}

export default RepList;