import { SafeAreaView, View, Text, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';

import { getColour } from './utils/utils';
import Exercise from './screens/exercise';
import ExerciseList from './screens/exerciseList';
import DayList from './screens/dayList';
import Item from './components/item';

export default function App() {
    //page and props are arrays to implement back functionality
    const [page, setPage] = useState(['DayList']);
    const [props, setProps] = useState([{}]);
    const [title, setTitle] = useState('LIFTS');
    const [headerLeft, setHeaderLeft] = useState(undefined);
    const [headerRight, setHeaderRight] = useState(undefined);
    const getPage = () => page[page.length-1];
    const newPage = (s) => setPage([...page, s]);
    const getProps = () => props[props.length-1];
    const newProps = (p) => setProps([...props, p]);
    useEffect(() => {
        console.log(props);
        newProps({});
        console.log(props);
    }, []);
    const goBack = () => {
        setPage((a) => a.slice(0, -1));
        setProps((a) => a.slice(0, -1));
    }
    return (
        <SafeAreaView style={{width: '100%', height: '100%', marginTop:StatusBar.currentHeight}}>
            <View style={[{backgroundColor: getColour()}, {flexDirection: 'row'}]}>
                    {headerLeft}
                    <Item
                        text={title}
                    />
                    {headerRight}
            </View>
            <View
                style={[{backgroundColor: getColour(), flex: 1}]}
            >
                {getPage() == 'DayList' && <DayList newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle}/>}
                {getPage() == 'ExerciseList' && <ExerciseList newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle}/>}
                {getPage() == 'Exercise' && <Exercise newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight}/>}
            </View>
        </SafeAreaView>
    );
}