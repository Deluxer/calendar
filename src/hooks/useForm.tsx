import { useState } from 'react';

export const useForm = ( initialForm: any = {} ) => {
    
    const [formState, setFormState] = useState( initialForm );
    const onInputChange = ({ target }: any) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onChange = (target: any) => {
        setFormState(target);
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        onChange
    }
}