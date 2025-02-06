import { Text } from 'react-native';
import { useEffect, useState } from 'react';

import { getColour } from '../utils/utils';
import styles from '../utils/styles';
import { itemProps } from '../utils/types';

const Item: React.FC<itemProps> = (props: itemProps) => {
    const [text, setText] = useState(props.text);
    useEffect(() => {
        if (props.getText)
            props.getText().then((result) => setText(result));
    }, []);
    return (
        <Text style={[{backgroundColor: getColour(), flex: 1}, styles.listItemText]}>{text}</Text>
    )
}

export default Item;