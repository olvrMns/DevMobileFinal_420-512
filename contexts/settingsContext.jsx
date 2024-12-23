import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const [showPlatforms, setShowPlatforms] = useState(false);

    const toggle = () => {
        setShowPlatforms((oldValue) => !oldValue);
    }

    return(
        <SettingsContext.Provider value={{showPlatforms, setShowPlatforms, toggle}}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettingsContext = () => useContext(SettingsContext);