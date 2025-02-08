import { Pressable } from 'react-native';

import { getStyle } from '../utils/styles';
import Item from './item';
import { globalStyle, listItemProps } from '../utils/types';

const ListItem: React.FC<listItemProps> = (props: listItemProps) => {
    let style: globalStyle = getStyle();
    if (props.selected !== undefined && !props.selected)
        style.backgroundColor = style.backgroundDark;
    console.log(props.text, style);
    return (
        <Pressable
            style={[{flex: 1}, style]}
            onPress={props.onPress}
        >
            <Item
                text={props.text}
                getText={props.getText}
                style={style}
            />
        </Pressable>
    )
}

export default ListItem;