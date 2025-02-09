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
    style?: globalStyle;
}

type listItemProps = {
    text?: string;
    getText?: () => Promise<string>;
    onPress?: () => void;
    selected?: boolean;
}

type rowProps = {
    data: (number|string)[];
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

export { hashSet, set, screenProps, navigatorProps, pageProps, inputNumProps, itemProps, listItemProps, rowProps, selectorProps, weightListRow, globalStyle, contextDetails, contextAccess, buttonProps };