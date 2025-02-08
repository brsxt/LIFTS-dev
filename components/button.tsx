import { TouchableOpacity, Text } from 'react-native';

import styles from '../utils/styles';
import { getStyle } from '../utils/styles';
import { buttonProps, globalStyle } from '../utils/types';

const Button: React.FC<buttonProps> = (props: buttonProps) => {
    let style: globalStyle = getStyle();
    style.color = style.accent;
    return (
        <TouchableOpacity style={[style, styles.buttonStyle]} onPress={props.onPress}>
            <Text style={[style, props.bold && {fontSize: 20}]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Button;