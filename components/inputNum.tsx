import { Text, View, TextInput, Button } from 'react-native';

import { round } from '../utils/utils';
import { inputNumProps } from '../utils/types';
import { getStyle } from '../utils/styles';

const InputNum: React.FC<inputNumProps> = (props: inputNumProps) => {
    return (
        <View style={[getStyle(), {flexDirection: 'row', justifyContent: 'center'}]}>
            <Text style={getStyle()}>{props.title}</Text>
            <Button title='-' onPress={() => {
                props.changeValue(Math.max(props.min || 0, round(props.value - props.delta)));
            }}/>
            <TextInput style={getStyle()} onChangeText={(x: string): void => { props.changeValue(Number(x)); }} value={props.value.toString()}/>
            <Button title='+' onPress={() => {
                props.changeValue(Math.min(props.max || 999999, round(props.value + props.delta)));
            }}/>
        </View>
    );
}

export default InputNum;