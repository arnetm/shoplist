import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAsyncStorage = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      await AsyncStorage.multiRemove(keys)
    } catch (error) {
      console.log(error);
    }
  };

export const addProductItem = async (slug, isFavourite) => {
    let state = isFavourite;
    try {
        const newState = !isFavourite;
        const value = await AsyncStorage.getItem(slug);
        if (value) {
        let casesDataStorage = JSON.parse(value);
        let updatedFavourite = {...casesDataStorage, ...{"isFavourite": !isFavourite}}
        await AsyncStorage.setItem(slug, JSON.stringify(updatedFavourite));
        state = !isFavourite;
        }
        return {
        "state": state,
        }
    } catch (error) {
        return {
        "error": `Ha ocurrido un error al ${(isFavourite) ? "quitar" : "agregar"} el favorito. Intente nuevamente.`,
        "state": state,
        };
    }
}

export const removeProductItem = async (slug, isFavourite) => {
    let state = isFavourite;
    try {
        const newState = !isFavourite;
        const value = await AsyncStorage.getItem(slug);
        if (value) {
        let casesDataStorage = JSON.parse(value);
        let updatedFavourite = {...casesDataStorage, ...{"isFavourite": !isFavourite}}
        await AsyncStorage.setItem(slug, JSON.stringify(updatedFavourite));
        state = !isFavourite;
        }
        return {
        "state": state,
        }
    } catch (error) {
        return {
        "error": `Ha ocurrido un error al ${(isFavourite) ? "quitar" : "agregar"} el favorito. Intente nuevamente.`,
        "state": state,
        };
    }
}

export const getProductItems = async () => {
    try {

        const productItems = await AsyncStorage.getItem(STORAGE_KEY)
        return productItems;
            
    } catch (error) {
        return {
        "error": `Cannot retrieve current products`
        };
    }
};

export const STORAGE_KEY = 'random';