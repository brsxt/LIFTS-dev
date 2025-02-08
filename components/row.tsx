import { Text, View, TextStyle } from 'react-native';

import { globalStyle, rowProps } from '../utils/types';
import { getStyle } from '../utils/styles';

const Row: React.FC<rowProps> = (props: rowProps) => {
    let customStyle: TextStyle = {textAlign: 'center'};
    let style: globalStyle = getStyle();
    if (props.selected)
        style.color=style.accent;
    return (
        <View style={[style, {flex: 1}, {flexDirection: 'row'}]}>
            {props.data.map((item, index) => <Text key={index} style={[style, {flex: 1}, customStyle]}>{item}</Text>)}
        </View>
    );
}

export default Row;