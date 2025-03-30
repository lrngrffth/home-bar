import React, { createContext, useEffect } from "react";
import RootStore from "../RootStore";

export const RootStoreContext = createContext();

export const RootStoreProvider = ({children}) => {
    let rootStore = new RootStore();
    useEffect(() => {rootStore.orderPageStore.getSpecialtyDrinks()}, []);

    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    )
}