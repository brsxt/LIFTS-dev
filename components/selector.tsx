import { Text, View, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';

import { selectorProps } from '../utils/types';
import { getStyle } from '../utils/styles';
import { titleCase } from '../utils/utils';

const Selector: React.FC<selectorProps> = (props: selectorProps) => {
    let padding = 5;
    return (
        <View style={[getStyle(), {width: '100%'}]}>
            {props.data.map((item, index) => {
                return (
                    <Pressable
                        style={[getStyle(), {flexDirection: 'row', alignItems: 'center', paddingLeft: padding}]}
                        key={index}
                        onPress={() => { props.setSelected(index); }}
                    >
                        <Checkbox
                            value={index==props.selected}
                        />
                        <Text style={[getStyle(), {padding: padding}]}>{titleCase(item)}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default Selector;