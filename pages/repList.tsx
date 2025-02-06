import { FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import { loadExerciseHistory } from '../storage/exercises';
import { calcWeight, roundWeightDown, MAX_REPS } from '../utils/utils';
import Row from '../components/row';
import { pageProps } from '../utils/types';

const RepList: React.FC<pageProps> = (props: pageProps) => {
    const [data, setData] = useState<number[][]>([]);
    useEffect(() => {
        loadExerciseHistory(props.exercise).then((history) => {
            let maxes: Record<number, number> = {};
            for (let {reps, weight} of history)
                if (reps > 1)
                    maxes[reps] = Math.max(maxes[reps] || 0, weight);
            let oneRM = Math.max(...Object.entries(maxes).map(([r, w]): number => calcWeight(w, Number(r), 1)));
            let data = []
            let weight = 0;
            let est: number, rec: number;
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