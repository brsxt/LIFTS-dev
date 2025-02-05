import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import { getColour } from '../utils/utils';

const Selector = (props) => {
    return (
        <View style={[{backgroundColor: getColour(), flex: 1}]}>
            {props.data.map((item, index) => {
                return (
                    <View
                        style={[{backgroundColor: getColour()}, {flexDirection: 'row'}]}
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