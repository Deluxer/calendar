import { addHours, differenceInSeconds } from 'date-fns/esm';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { useForm } from '../../hooks/useForm';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        zIndex: 4
    }
};

Modal.setAppElement('#root');

const initialValues = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
}
export const CalendarModal = () => {
    
    const [formSubmitted, setFormSubmitted] = useState(false)
    const { title, notes, start, end, onInputChange, onChange } = useForm(initialValues);
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent } = useCalendarStore();

    useEffect(() => {
      if(activeEvent !== null ) {
        onChange(activeEvent);
      }
    }, [activeEvent]);

    const titleCass = useMemo(() => {
        if(!formSubmitted) return '';
        return (title.length > 0) ? 'is-valid' : 'is-invalid';
    }, [title, formSubmitted])


    const onCloseModal = () => {
        closeDateModal()
    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds( end, start);
        
        if( isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'error');
            return;
        }

        if( title.length <= 0) return;

        console.log(event);
        // TODO
        // Cerrar modal
        
    }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 } >
        
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker 
                    selected={ start }
                    className="form-control"
                    onChange={ (event: Date) => onInputChange({target: {name: 'start', value: event}}) }
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                    />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker 
                    minDate={ start }
                    selected={ end }
                    className="form-control"
                    onChange={ (event: Date) => onInputChange({target: {name: 'end', value: event}}) }
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${ titleCass }`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title}
                    onChange={ onInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    className="form-control"
                    placeholder="Notas"
                    rows={ 5 }
                    name="notes"
                    value={ notes}
                    onChange={ onInputChange }
                    ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
