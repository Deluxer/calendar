import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( (state: any) => state.calendar );

    const setActiveEvent = (calendarEvent: any) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async(calendarEvent: any) => {
        //TODO legar al backend
        if(calendarEvent._id) {
            //actualizado
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            // creado
            dispatch( onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
        
    }

    const startdeletingEvent = () => {

        dispatch(onDeleteEvent())
    }
  
    return {
        // * properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // * methods
        setActiveEvent,
        startSavingEvent,
        startdeletingEvent
    };
}
