import { createContext, useState, ReactNode, useEffect } from 'react';

import { contextDetails, contextAccess } from './utils/types';
import { loadTheme } from './storage/profile';

const value: contextDetails = {
    theme: 'dark',
}

const globalContext = createContext<contextAccess>({
    state: value,
    setState: (x: contextDetails) => {},
});

export const ContextProvider = ({ children }: { children: ReactNode; }) => {
    const [state, setState] = useState<contextDetails>(value);
    useEffect(() => {
        (async () => {
            setState({
                theme: await loadTheme(),
            })
        })();
    }, []);
    return (
        <globalContext.Provider value={{ state, setState }}>
            {children}
        </globalContext.Provider>
    );
};

export { globalContext };