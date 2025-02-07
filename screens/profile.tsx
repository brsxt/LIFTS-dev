import { useEffect, useState } from 'react';
import { View, Button } from 'react-native';

import { screenProps } from '../utils/types';
import { loadBodyWeight, saveBodyWeight } from '../storage/body';
import InputNum from '../components/inputNum';

const Profile: React.FC<screenProps> = (props: screenProps) => {
    const [bodyweight, setBodyweight] = useState(0);
    useEffect(() => {
        props.setHeaderRight(undefined)
        loadBodyWeight().then(result => { setBodyweight(result) });
    }, []);
    return (
        <View>
            <InputNum
                value={bodyweight}
                changeValue={setBodyweight}
                title={'bodyweight'}
                delta={1}
            />
            <Button
                title="Save"
                onPress={async () => {
                    await saveBodyWeight(bodyweight);
                    props.goBack();
                }}
            />
        </View>
    );
}

export default Profile;