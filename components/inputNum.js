import { Text, View, TextInput, Button } from 'react-native';

import { getColour } from '../utils/utils';

const InputNum = (props) => {
    return (
        <View style={[{backgroundColor: getColour()}, {flexDirection: 'row', justifyContent: 'center'}]}>
            <Text>{props.title}</Text>
            <Button title='-' onPress={() => {
                props.changeValue(props.value - 1);
            }}/>
            <TextInput onChangeText={props.changeValue} value={props.value.toString()}/>
            <Button title='+' onPress={() => {
                props.changeValue(props.value + 1);
            }}/>
        </View>
    );
}

export default InputNum;