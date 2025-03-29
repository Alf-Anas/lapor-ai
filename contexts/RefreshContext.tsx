'use client';

import { createContext } from 'react';

interface RefreshContextProps {
    refresh: number;
    setRefresh: () => void;
}

export const RefreshContext = createContext<RefreshContextProps>({
    refresh: 0,
    setRefresh: () => {},
});
