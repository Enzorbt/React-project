import React, { createContext, useContext, useEffect, useState } from 'react';
import FlashMessageType from "../types/FlashMessageType.tsx";
import FlashedContextType from "../types/FlashedContextType.tsx";

const FlashedContext = createContext<FlashedContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useFlashes = () => {
    const context = useContext(FlashedContext);
    if (!context) {
        throw new Error('useFlashed must be used within a FlashedProvider');
    }
    return context;
};

interface FlashedProviderProps {
    children: React.ReactNode;
}

const FlashesProvider: React.FC<FlashedProviderProps> = ({ children }) => {
    const [flashMessage, setFlashMessage] = useState<FlashMessageType | null>(() => {
        const storedFlashMessage = localStorage.getItem('flashMessage');
        return storedFlashMessage ? JSON.parse(storedFlashMessage) : null;
    });

    useEffect(() => {
        if (flashMessage) {
            localStorage.setItem('flashMessage', JSON.stringify(flashMessage));
        } else {
            localStorage.removeItem('flashMessage');
        }
    }, [flashMessage]);

    const clearFlashMessage = () => {
        setFlashMessage(null);
    };

    const flashedContextValue: FlashedContextType = {
        flashMessage,
        setFlashMessage,
        clearFlashMessage,
    };

    return (
        <FlashedContext.Provider value={flashedContextValue}>
            {children}
        </FlashedContext.Provider>
    );
};

export default FlashesProvider;
