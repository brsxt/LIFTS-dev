import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage.clear();

async function load(key, val) {
    try {
        let result = JSON.parse(await AsyncStorage.getItem(key));
        if (result !== null) return result;
    } catch (error) {
        console.log(error);
    }
    return val;
}

async function save(key, val) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
        console.log(error);
    }
    return val;
}

async function del(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
}

const addToObject = async (val, loadObject, saveObject) => {
    let object = await loadObject();
    object[val] = 0;
    await saveObject(object);
    return val;
}

const removeFromObject = async (val, loadObject, saveObject) => {
    let object = await loadObject();
    delete object[val];
    await saveObject(object);
    return val;
}

const addToList = async (val, loadList, saveList) => {
    let list = await loadList();
    list.push(val);
    await saveList(list);
    return val;
}

export { load, save, del, addToObject, removeFromObject, addToList };