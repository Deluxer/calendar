import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
  type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';
  const initialState = localStorage.getItem('lastView') as View || 'week';
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setlastView] = useState<View>(initialState);
  
  const eventStyleGetter = ( ) => {
    const style = {
      backgroundColor: '#347CF',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  }

  const onDoubleClick = (event: any) => {
    openDateModal()
  }

  const onSelect = (event: any) => {
    setActiveEvent(event);
  }

  const onViewChange = (event: any) => {
    localStorage.setItem('lastView', event);
    setlastView(event)
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        } }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

      <FabAddNew />
      <FabDelete />
      <CalendarModal />
    </>
  )
}
