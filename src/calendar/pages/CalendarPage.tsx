import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent } from '../';
import { addHours } from 'date-fns'
import { localizer, getMessagesES } from '../../helpers';

export const CalendarPage = () => {
  const events = [ {
    title: 'BirthDay',
    notes: 'Buy cake',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Gerardo'
    }
  }]

  
  const eventStyleGetter = ( title: any, start: Date, end: Date ) => {

    const style =  {
      backgroundColor: '#347CF',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }
  

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        } }
      />

    </>
  )
}
