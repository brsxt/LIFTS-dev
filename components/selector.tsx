import { Text, View, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';

import { selectorProps } from '../utils/types';
import { getStyle, DEFAULT_PADDING } from '../utils/styles';
import { titleCase } from '../utils/utils';

const Selector: React.FC<selectorProps> = (props: selectorProps) => {
    return (
        <View style={[getStyle(), {width: '100%'}]}>
            {props.data.map((item, index) => {
                return (
                    <Pressable
                        style={[getStyle(), {flexDirection: 'row', alignItems: 'center', paddingLeft: DEFAULT_PADDING}]}
                        key={index}
                        onPress={() => { props.setSelected(index); }}
                    >
                        <Checkbox
                            value={index==props.selected}
                        />
                        <Text style={[getStyle(), {padding: DEFAULT_PADDING}]}>{titleCase(item)}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default Selector;