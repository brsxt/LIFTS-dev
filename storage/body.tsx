import { load, save } from './_helpers';

const bodyWeight = () => 'bodyweight';
const loadBodyWeight = async (): Promise<number> => Number(await load(bodyWeight(), 41.2));
const saveBodyWeight = async (val: number): Promise<void> => await save(bodyWeight(), val);

export { loadBodyWeight, saveBodyWeight };