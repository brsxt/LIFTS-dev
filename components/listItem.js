import { Pressable } from 'react-native';

import { getColour } from '../utils/utils';
import Item from './item';

const ListItem = (props) => {
    return (
        <Pressable
            style={[{backgroundColor: getColour(), flex: 1},]}
            onPress={props.onPress}
        >
            <Item
                text={props.text}
                getText={props.getText}
            />
        </Pressable>
    )
}

export default ListItem;