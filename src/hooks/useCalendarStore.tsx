import { useSelector, useDispatch } from 'react-redux';
import { onSetActiveEvent } from "../store";

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( (state: any) => state.calendar );

    const setActiveEvent = (calendarEvent: any) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }
  
    return {
        // * properties
        events,
        activeEvent,

        // * methods
        setActiveEvent
    };
}
