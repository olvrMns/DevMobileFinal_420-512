import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const [showPlatforms, setShowPlatforms] = useState(false);

    return(
        <SettingsContext.Provider value={{showPlatforms, setShowPlatforms}}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettingsContext = () => useContext(SettingsContext);