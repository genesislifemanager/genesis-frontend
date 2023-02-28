import { createContext } from 'react';
import React from 'react';

type DateContextType = {
    selectedDate: Date,
    setSelectedDate:React.Dispatch<React.SetStateAction<Date>>
}

export const DateContext = createContext<DateContextType>({} as DateContextType);