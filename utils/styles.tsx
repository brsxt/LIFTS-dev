import { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { globalStyle } from './types';
import { globalContext } from '../context';

const styles = StyleSheet.create({
    listItemText: {
        padding: 5,
        fontSize: 15,
    },
    buttonStyle: {
        padding: 5,
        justifyContent: 'center',
    }
});

const STYLES = ['dev', 'light', 'dark']

function getColour(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(8 + Math.random() * 8)];
    }
    return color;
}

function getStyle(): globalStyle {
    let res: globalStyle;
    switch(useContext(globalContext).state.theme) {
        case 'dev':
            res = {
                backgroundColor: getColour(),
                backgroundDark: getColour(),
                color: 'black',
                accent: 'black',
            };
            break;
        case 'light':
            res = {
                backgroundColor: '#fafafa',
                backgroundDark: '#dedede',
                color: '#262626',
                accent: '#478af5',
            };
            break;
        case 'dark':
            res = {
                backgroundColor: '#303030',
                backgroundDark: '#282828',
                color: 'white',
                accent: '#ffac30',
            };
            break;
        default:
            throw new Error();
    }
    return res;
}

export default styles;

export { getStyle, STYLES };