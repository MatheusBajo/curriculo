import { createContext, useContext, useState } from 'react';

const SensitiveContext = createContext<
    { visivel: boolean; toggle: () => void }
>({
    visivel: false,
    toggle: () => {},
});

export const SensitiveProvider = ({ children }: { children: React.ReactNode }) => {
    const [visivel, setVisivel] = useState(false);
    const toggle = () => setVisivel(v => !v);          // muda para on/off
    return (
        <SensitiveContext.Provider value={{ visivel, toggle }}>
            {children}
        </SensitiveContext.Provider>
    );
};

export const useSensitive = () => useContext(SensitiveContext);
