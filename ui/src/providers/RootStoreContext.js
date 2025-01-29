import React, { createContext } from "react";
import RootStore from "../RootStore";

export const RootStoreContext = createContext();

export const RootStoreProvider = ({children}) => {
    let rootStore = new RootStore();

    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    )
}