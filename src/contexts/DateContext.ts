import { createContext } from 'react';
import React from 'react';
import dayjs from 'dayjs';

type DateContextType = {
    selectedDate: dayjs.Dayjs,
    setSelectedDate:React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
}

export const DateContext = createContext({} as DateContextType);