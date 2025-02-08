import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import { selectorProps } from '../utils/types';
import { getStyle } from '../utils/styles';

const Selector: React.FC<selectorProps> = (props: selectorProps) => {
    return (
        <View style={[getStyle(), {flex: 1}]}>
            {props.data.map((item, index) => {
                return (
                    <View
                        style={[getStyle(), {flexDirection: 'row'}]}
                        key={index}
                    >
                        <Checkbox
                            value={index==props.selected}
                            onValueChange={() => {props.setSelected(index)}}
                        />
                        <Text>{item}</Text>
                    </View>
                );
            })}
        </View>
    );
}

export default Selector;