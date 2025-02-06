import AsyncStorage from '@react-native-async-storage/async-storage';

import { hashSet } from '../utils/types';

// AsyncStorage.clear();

async function load(key: string, val: any): Promise<any> {
    try {
        let data = await AsyncStorage.getItem(key);
        if (typeof data === 'string') {
            let result = JSON.parse(data);
            return result;
        }
    } catch (error) {
        console.log(error);
    }
    return val;
}

async function save(key: string, val: any): Promise<void> {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
        console.log(error);
    }
}

async function del(key: string): Promise<void> {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
}

async function addToHashSet(val: any, loadObject: () => Promise<hashSet>, saveObject: (x: hashSet) => Promise<void>): Promise<void> {
    let obj = await loadObject();
    obj[val] = 0;
    await saveObject(obj);
}

async function removeFromHashSet(val: any, loadObject: () => Promise<hashSet>, saveObject: (x: hashSet) => Promise<void>): Promise<void> {
    let obj = await loadObject();
    delete obj[val];
    await saveObject(obj);
}

async function addToList(val: any, loadList: () => Promise<any[]>, saveList: (x: any[]) => Promise<void>): Promise<void> {
    let list = await loadList();
    list.push(val);
    await saveList(list);
}

export { load, save, del, addToHashSet, removeFromHashSet, addToList };