import ContextProvider from './app/context';
import Navigator from './app/navigator';

export default function App() {
    return (
        <ContextProvider>
            <Navigator/>
        </ContextProvider>
    );
}