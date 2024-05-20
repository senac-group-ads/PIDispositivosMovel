import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_TOKEN_STORAGE } from "./StorageConfig";

export async function storageAuthTokenSave(token: string){
    await AsyncStorage.setItem( USER_TOKEN_STORAGE, token )
}

export async function storageAuthTokenGet() {
    const token = await AsyncStorage.getItem(USER_TOKEN_STORAGE)
    return token
}

export async function storageAuthTokenRemove() {
    await AsyncStorage.removeItem(USER_TOKEN_STORAGE)
}