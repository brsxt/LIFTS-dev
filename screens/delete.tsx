import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

import { screenProps } from '../utils/types';

const Delete: React.FC<screenProps> = (props: screenProps) => {
    const [name, setName] = useState('');
    useEffect(() => {
        props.setHeaderRight(undefined);
        props.getProps().getName!().then((name: string): void => { setName(name); });
    }, []);
    return (
        <View>
            <Text>{`Are you sure you want to delete ${name}?`}</Text>
            <Button
                title="Confirm"
                onPress={async () => {
                    await props.getProps().delete!();
                    props.goBack(3);
                }}
            />
        </View>
    );
}

export default Delete;