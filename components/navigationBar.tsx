import { Text, View } from 'react-native';

import { navigationBarProps } from '../utils/types';
import { getStyle, DEFAULT_PADDING } from '../utils/styles';
import Button from './button';

const NavigationBar: React.FC<navigationBarProps> = (props: navigationBarProps) => {
    return (
        <View style={[getStyle(), {flexDirection: 'row', alignItems: 'center', backgroundColor: getStyle().backgroundDark}]}>
            {props.page.length > 1 && !props.backDisabled && <Button title='Back' onPress={() => props.goBack(1)}/>}
            <Text style={[getStyle(), {flex: 1, padding: DEFAULT_PADDING, backgroundColor: getStyle().backgroundDark}]}>{props.title}</Text>
            {props.headerRight}
        </View>
    );
}

export default NavigationBar;