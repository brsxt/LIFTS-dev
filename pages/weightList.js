import { FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import { loadExerciseHistory } from '../storage/exercises';
import { calcWeight, roundWeightDown, MAX_REPS, lowerWeight, calcReps } from '../utils/utils';
import styles from '../utils/styles';
import Row from '../components/row';

let each_limit = 9;
let total_limit = 15;
let lower_rep_rec = 1;
let upper_rep_rec = 15;

function add(temp, list, w, r) {
    console.log(w, r);
    let rec = Math.floor(r);
    let w_done;
    for (let i = 0; i < 2; i++) {
        rec = Math.min(rec, MAX_REPS);
        if (rec > 0) {
            w_done = temp[rec-1][1];
            // filter for PRs
            if (w > w_done && lower_rep_rec <= rec && rec <= upper_rep_rec) {
                console.log(w, r, rec);
                list[i].push([w, r, rec]);
                break;
            }
        }
        rec += 1;
    }
}

function comp(cx, cy) {
    if (cx < cy)
        return -1;
    if (cx > cy)
        return 1;
    return 0;
}

const WeightList = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        loadExerciseHistory(props.exercise).then((history) => {
            let maxes = {};
            for (let {reps, weight} of history)
                maxes[reps] = Math.max(maxes[reps] || 0, weight);
            let oneRM = Math.max(...Object.entries(maxes).map(([r, w]) => calcWeight(w, r, 1)));
            let temp = []
            let weight = 0;
            for (let reps = MAX_REPS; reps > 0; reps--) {
                weight = Math.max(weight, maxes[reps] || 0);
                temp.unshift([reps, weight]);
            }

            let w = roundWeightDown(props.exercise, oneRM);
            let data = [[], []];
            while (Math.floor(r = calcReps(oneRM, w, MAX_REPS)) <= MAX_REPS && w >= 2.5) {
                add(temp, data, w, r);
                w = lowerWeight(props.exercise, w);
            }
            add(temp, data, w, r);
            console.log(data);
            data[0].sort((x, y) => {
                // EASIEST
                cx = x[0] - calcWeight(oneRM, 1, x[2]);
                cy = y[0] - calcWeight(oneRM, 1, y[2]);
                if ((res = comp(cx, cy)) != 0)
                    return res
                // FURTHEST PR
                cx = temp[x[2]-1][1] - x[0];
                cy = temp[y[2]-1][1] - y[0];
                return comp(cx, cy);
            });
            data[1].sort((x, y) => {
                // EASIEST WEIGHT
                cx = x[0] - calcWeight(oneRM, 1, x[2]);
                cy = y[0] - calcWeight(oneRM, 1, y[2]);
                return comp(cx, cy);
            });
            data = data[0].slice(0, each_limit).concat(data[1].slice(0, each_limit)).slice(0, total_limit);
            setData(data);
        });
    }, []);
    return (
        <FlatList style={[styles.list]}
            data={data}
            ListHeaderComponent={
                <Row data={['weight', 'reps', 'recommended']}/>
            }
            renderItem={({index, item}) => {
                item = [...item];
                if (item[1] < 1) item[1] = '< 1';
                else if (item[1] <= MAX_REPS) item[1] = item[1].toFixed(1);
                else item[1] = `> ${MAX_REPS}`;
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

export default WeightList;