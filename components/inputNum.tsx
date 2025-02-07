import { Text, View, TextInput, Button } from 'react-native';

import { getColour, round } from '../utils/utils';
import { inputNumProps } from '../utils/types';

const InputNum: React.FC<inputNumProps> = (props: inputNumProps) => {
    return (
        <View style={[{backgroundColor: getColour()}, {flexDirection: 'row', justifyContent: 'center'}]}>
            <Text>{props.title}</Text>
            <Button title='-' onPress={() => {
                props.changeValue(Math.max(props.min || 0, round(props.value - props.delta)));
            }}/>
            <TextInput onChangeText={(x: string): void => { props.changeValue(Number(x)); }} value={props.value.toString()}/>
            <Button title='+' onPress={() => {
                props.changeValue(Math.min(props.max || 999999, round(props.value + props.delta)));
            }}/>
        </View>
    );
}

export default InputNum;