import { Text, View, TextStyle } from 'react-native';

import { getColour } from '../utils/utils';
import { rowProps } from '../utils/types';

const Row: React.FC<rowProps> = (props: rowProps) => {
    let customStyle: TextStyle = {textAlign: 'center', color: 'black'};
    if (props.selected)
        customStyle.color='white'
    return (
        <View style={[{backgroundColor: getColour(), flex: 1}, {flexDirection: 'row'}]}>
            {props.data.map((item, index) => <Text key={index} style={[{backgroundColor: getColour(), flex: 1}, customStyle]}>{item}</Text>)}
        </View>
    );
}

export default Row;