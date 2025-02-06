import { Pressable } from 'react-native';

import { getColour } from '../utils/utils';
import Item from './item';
import { listItemProps } from '../utils/types';

const ListItem: React.FC<listItemProps> = (props: listItemProps) => {
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