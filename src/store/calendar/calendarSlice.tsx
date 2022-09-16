import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


type InitialStateType = {
    events: [{}],
    activeEvent: {
        _id: number,
        title: string,
        notes: string,
        start: Date,
        end: Date,
        bgColor: string
        user: {
            _id: string
            name: string
        }
    } | null
}

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

const initialState: InitialStateType = {
    events: [eventTemp],
    activeEvent: eventTemp
}

export const calendarSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
        onSetActiveEvent: (state: any, { payload }: any ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state: any, { payload }: any) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state: any, { payload }: any) => {
            state.events = state.events.map( (event: any) => {
                if(event._id === payload._id) {
                    return payload;
                }
            } );
        },
        onDeleteEvent: (state: any) => {
            if( state.activeEvent) {
                state.events = state.events.filter((event: any) => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        }
    }
});


export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;