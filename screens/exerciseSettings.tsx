import { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';

import { loadExerciseType, loadExerciseName, loadExerciseMinRepRec, loadExerciseMaxRepRec, saveExerciseName, loadExerciseDelta, saveExerciseMinRepRec, saveExerciseMaxRepRec, saveExerciseType, saveExerciseDelta, TYPES } from '../storage/exercises';
import { deleteExercise } from '../storage/both';
import { MAX_REPS } from '../utils/utils';
import Selector from '../components/selector';
import InputNum from '../components/inputNum';
import { screenProps } from '../utils/types';
import Button from '../components/button';
import { getStyle } from '../utils/styles';

const ExerciseSettings: React.FC<screenProps> = (props: screenProps) => {
    const [name, setName] = useState('');
    const [minRepRec, setMinRepRec] = useState(0);
    const [maxRepRec, setMaxRepRec] = useState(MAX_REPS);
    const [type, setType] = useState(0);
    const [delta, setDelta] = useState(0);
    useEffect(() => {
        props.setHeaderRight(
            <Button
                title={'Delete'}
                onPress={() => {
                    props.newProps({
                        delete: async () => { await deleteExercise(props.getProps().exercise!) },
                        getName: async () => await loadExerciseName(props.getProps().exercise!),
                        backDistance: 3,
                    });
                    props.newPage('Delete');
                }}
            />
        )
        loadExerciseName(props.getProps().exercise!).then(result => {setName(result)});
        loadExerciseMinRepRec(props.getProps().exercise!).then(result => {setMinRepRec(result);});
        loadExerciseMaxRepRec(props.getProps().exercise!).then(result => {setMaxRepRec(result);});
        loadExerciseType(props.getProps().exercise!).then(result => {
            setType(TYPES.indexOf(result));
        });
        loadExerciseDelta(props.getProps().exercise!).then(result => {setDelta(result);});
    }, []);
    return (
        <View style={[getStyle(), {flex: 1}]}>
            <TextInput style={getStyle()} value={name} onChangeText={setName}/>
            <InputNum
                value={minRepRec}
                changeValue={setMinRepRec}
                title={'Minimum rep recommendation'}
                min={1}
                max={maxRepRec}
                delta={1}
            />
            <InputNum
                value={maxRepRec}
                changeValue={setMaxRepRec}
                title={'Maximum rep recommendation'}
                min={minRepRec}
                max={MAX_REPS}
                delta={1}
            />
            <Selector
                data={TYPES}
                selected={type}
                setSelected={setType}
            />
            {(TYPES[type] == 'delta' || TYPES[type] == 'body') &&
                <InputNum
                    value={delta}
                    changeValue={setDelta}
                    title={'Delta'}
                    min={0}
                    delta={0.25}
                />
            }
            <Button
                title="Save"
                onPress={async () => {
                    await saveExerciseName(props.getProps().exercise!, name)
                    await saveExerciseMinRepRec(props.getProps().exercise!, minRepRec);
                    await saveExerciseMaxRepRec(props.getProps().exercise!, maxRepRec);
                    await saveExerciseType(props.getProps().exercise!, TYPES[type]);
                    if (TYPES[type] == 'delta' || TYPES[type] == 'body')
                        await saveExerciseDelta(props.getProps().exercise!, delta);
                    props.goBack();
                }}
            />
        </View>
    );
}

export default ExerciseSettings;