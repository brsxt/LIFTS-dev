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
    delete?: () => Promise<void>;
    getName?: () => Promise<string>;
}

type pageProps = {
    exercise: number;
    weight?: number;
    changeWeight?: (x: number) => void;
    reps?: number;
    changeReps?: (x: number) => void;
}

type inputNumProps = {
    value: number;
    changeValue: (x: number) => void;
    title: string;
    min?: number;
    max?: number;
}

type itemProps = {
    text?: string;
    getText?: () => Promise<string>;
}

type listItemProps = {
    text?: string;
    getText?: () => Promise<string>;
    onPress: () => void;
}

type rowProps = {
    data: (number|string)[];
}

type selectorProps = {
    selected: number;
    setSelected: (x: number) => void;
    data: string[];
}

export { hashSet, set, screenProps, navigatorProps, pageProps, inputNumProps, itemProps, listItemProps, rowProps, selectorProps };