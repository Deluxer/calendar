import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const eventTemp = {
    _id: new Date().getTime(),
    title: 'Birth Day Boss',
    notes: 'Buy cake',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Gerardo'
    }
}

export const calendarSlice = createSlice({
    name: 'name',
    initialState: {
        events: [eventTemp],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload } ) => {
            state.activeEvent = payload;
        },
    }
});


export const { onSetActiveEvent } = calendarSlice.actions;