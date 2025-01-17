import { Text, View } from 'react-native';

import { getColour } from '../utils/utils';

const Row = (props) => {
    return (
        <View style={[{backgroundColor: getColour(), flex: 1}, {flexDirection: 'row'}]}>
            {props.data.map((item, index) => <Text key={index} style={[{backgroundColor: getColour(), flex: 1}, {textAlign: 'center'}]}>{item}</Text>)}
        </View>
    );
}

export default Row;