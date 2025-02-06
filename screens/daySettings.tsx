import { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';

import { loadDayName, saveDayName } from '../storage/days';
import { screenProps } from '../utils/types';

const DaySettings: React.FC<screenProps> = (props: screenProps) => {
    const [name, setName] = useState('');
    useEffect(() => {
        props.setHeaderRight(undefined);
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