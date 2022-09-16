import { useCalendarStore } from "../../hooks/useCalendarStore"

export const FabDelete = () => {

  const { startdeletingEvent, hasEventSelected } = useCalendarStore();

  const handlDelete = () => {
    startdeletingEvent()
  }

  return (
    <button className='btn btn-danger fab-danger'
    onClick={ handlDelete }
    style={ {
      'display': hasEventSelected ? '' : 'none'
      } } >
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}
