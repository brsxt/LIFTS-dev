import { TextStyle } from 'react-native';

type hashSet = Record<number, number>;

type set = {
    time: number;
    reps: number;
    weight: number;
}

type screenProps = {
    newPage: (s: string) => void;
    newProps: (p: navigatorProps) => void;
    getProps: () => navigatorProps;
    setTitle: (s: string) => void;
    setHeaderRight: (x: React.JSX.Element|undefined) => void;
    goBack: (x?: number) => void;
    disableBack?: (x: boolean) => void;
    backDisabled?: boolean;
};

type navigatorProps = {
    day?: number;
    exercise?: number;
    loadExercises?: () => Promise<number[]>;
    saveNewExercise?: () => Promise<number>;
    execute?: () => Promise<void>;
    getName?: () => Promise<string>;
    backDistance?: number;
    action?: string;
    data?: any;
    saveNewStack?: () => Promise<number>;
    stack?: number;
}

type pageProps = {
    exercise: number;
    weight?: string;
    changeWeight?: (x: string) => void;
    reps?: string;
    changeReps?: (x: string) => void;
    extra?: number;
    screenProps?: screenProps;
}

type inputNumProps = {
    value: string;
    changeValue: (x: string) => void;
    title: string;
    min?: number;
    max?: number;
    delta: number;
    decimals: boolean;
}

type itemProps = {
    text?: string;
    getText?: () => Promise<string>;
    style?: {};
}

type listItemProps = {
    text?: string;
    getText?: () => Promise<string>;
    onPress?: () => void;
    selected?: boolean;
    style?: {};
}

type rowProps = {
    data: string[];
    selected?: boolean;
}

type selectorProps = {
    selected: number;
    setSelected: (x: number) => void;
    data: string[];
}

type weightListRow = {
    weight: number|string,
    reps: number,
    rec: number;
}

type globalStyle = {
    backgroundColor: string;
    backgroundDark: string;
    color: string;
    accent: string;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
}

type contextDetails = {
    theme: string;
}

type contextAccess = {
    state: contextDetails;
    setState: (x: contextDetails) => void;
}

type buttonProps = {
    onPress: () => void;
    title: string;
    bold?: boolean;
}

type navigationBarProps = {
    title: string;
    page: string[];
    headerRight: React.JSX.Element | undefined;
    goBack: (x?: number) => void;
    backDisabled: boolean;
}

type cellProps = {
    style: (globalStyle | TextStyle)[];
    text: string;
}

export { hashSet, set, screenProps, navigatorProps, pageProps, inputNumProps, itemProps, listItemProps, rowProps, selectorProps, weightListRow, globalStyle, contextDetails, contextAccess, buttonProps, navigationBarProps, cellProps };