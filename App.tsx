import { SafeAreaView, View, StatusBar } from 'react-native';
import { useState } from 'react';

import Exercise from './screens/exercise';
import ExerciseList from './screens/exerciseList';
import DayList from './screens/dayList';
import Item from './components/item';
import ExerciseSettings from './screens/exerciseSettings';
import DaySettings from './screens/daySettings';
import { navigatorProps } from './utils/types';
import Confirm from './screens/confirm';
import Profile from './screens/profile';
import { ContextProvider } from './context';
import { getStyle } from './utils/styles';
import Button from './components/button';
import { exportData } from './storage/_helpers';
import JSON from './screens/json';

exportData()

export default function App() {
    //page and props are arrays to implement back functionality
    const [page, setPage] = useState(['DayList']);
    const [props, setProps] = useState([{}]);
    const [title, setTitle] = useState('LIFTS');
    const [headerRight, setHeaderRight] = useState<React.JSX.Element|undefined>(undefined);
    const getPage = (): string => page[page.length-1];
    const newPage = (s: string): void => setPage([...page, s]);
    const getProps = (): navigatorProps => props[props.length-1];
    const newProps = (p: navigatorProps): void => setProps([...props, p]);
    const goBack = (x:number=1): void => {
        if (x < 1)
            throw new Error(`Bad back parameter: ${1}`);
        setPage((a) => a.slice(0, -x));
        setProps((a) => a.slice(0, -x));
    }
    return (
        <ContextProvider>
            <SafeAreaView style={{width: '100%', height: '100%', marginTop:StatusBar.currentHeight}}>
                <View style={[getStyle(), {flexDirection: 'row'}]}>
                        {page.length > 1 && <Button title='Back' onPress={() => goBack(1)}/>}
                        <Item
                            text={title}
                        />
                        {headerRight}
                </View>
                <View
                    style={[getStyle(), {flex: 1}]}
                >
                    {getPage() == 'DayList' && <DayList newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight} goBack={goBack}/>}
                    {getPage() == 'ExerciseList' && <ExerciseList newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight} goBack={goBack}/>}
                    {getPage() == 'Exercise' && <Exercise newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight} goBack={goBack}/>}
                    {getPage() == 'ExerciseSettings' && <ExerciseSettings newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight} goBack={goBack}/>}
                    {getPage() == 'DaySettings' && <DaySettings newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight} goBack={goBack}/>}
                    {getPage() == 'Confirm' && <Confirm newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight} goBack={goBack}/>}
                    {getPage() == 'Profile' && <Profile newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight} goBack={goBack}/>}
                    {getPage() == 'JSON' && <JSON newPage={newPage} newProps={newProps} getProps={getProps} setTitle={setTitle} setHeaderRight={setHeaderRight} goBack={goBack}/>}
                </View>
            </SafeAreaView>
        </ContextProvider>
    );
}