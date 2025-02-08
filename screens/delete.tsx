import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { screenProps } from '../utils/types';
import Button from '../components/button';
import { getStyle } from '../utils/styles';

const Delete: React.FC<screenProps> = (props: screenProps) => {
    const [name, setName] = useState('');
    useEffect(() => {
        props.setHeaderRight(undefined);
        props.getProps().getName!().then((name: string): void => { setName(name); });
    }, []);
    return (
        <View>
            <Text style={getStyle()}>{`Are you sure you want to delete ${name}?`}</Text>
            <Button
                title="Confirm"
                onPress={async () => {
                    await props.getProps().delete!();
                    props.goBack(props.getProps().backDistance!);
                }}
            />
        </View>
    );
}

export default Delete;