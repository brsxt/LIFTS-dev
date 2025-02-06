import { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';

import { loadDayName, saveDayName } from '../storage/days';
import { screenProps } from '../utils/types';
import { deleteDay } from '../storage/both';

const DaySettings: React.FC<screenProps> = (props: screenProps) => {
    const [name, setName] = useState('');
    useEffect(() => {
        props.setHeaderRight(
            <Button
                title={'Delete'}
                onPress={() => {
                    props.newProps({
                        delete: async () => { await deleteDay(props.getProps().day!) },
                        getName: async () => await loadDayName(props.getProps().day!),
                    });
                    props.newPage('Delete');
                }}
            />
        )
        loadDayName(props.getProps().day!).then(result => {setName(result)});
    }, []);
    return (
        <View>
            <TextInput value={name} onChangeText={setName}/>
            <Button
                title="Save"
                onPress={async () => {
                    await saveDayName(props.getProps().day!, name)
                    props.goBack();
                }}
            />
        </View>
    );
}

export default DaySettings;