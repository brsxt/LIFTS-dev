import { Text, View, TextInput } from 'react-native';

import { round } from '../utils/utils';
import { inputNumProps } from '../utils/types';
import { getStyle } from '../utils/styles';
import Button from './button';

const InputNum: React.FC<inputNumProps> = (props: inputNumProps) => {
    return (
        <View style={[getStyle(), {flexDirection: 'row', justifyContent: 'center'}]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={[getStyle(), {textAlign: 'right'}]}>{`${props.title}:`}</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <Button bold={true} title='-' onPress={() => {
                    props.changeValue(Math.max(props.min || 0, round(props.value - props.delta)));
                }}/>
                <TextInput style={getStyle()} onChangeText={(x: string): void => { props.changeValue(Number(x)); }} value={props.value.toString()}/>
                <Button bold={true} title='+' onPress={() => {
                    props.changeValue(Math.min(props.max || 999999, round(props.value + props.delta)));
                }}/>
            </View>
        </View>
    );
}

export default InputNum;