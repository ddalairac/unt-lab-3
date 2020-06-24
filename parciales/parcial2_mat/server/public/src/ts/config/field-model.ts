import { iFieldsModel, eType } from './interfaces';

/**
 * Configuracion del modelo de datos para form y tabla
 */
export const fieldsModel:iFieldsModel[] = [
    { type: eType.text, nombre: "id", placeholder: "Ingrese id", isRequired: true, isDisabled: true, isVisible: false, min: 1 },
    { type: eType.text, nombre: "titulo", placeholder: "Ingrese el titulo", isRequired: true, isDisabled: false, isVisible: true},
    { type: eType.text, nombre: "transaccion", placeholder: "Ingrese la transaccion", isRequired: true, isDisabled: true, isVisible: true},
    { type: eType.textarea, nombre: "descripcion", placeholder: "Ingrese la descripcion", isRequired: true, isDisabled: false, isVisible: true, rows: 2 },
    { type: eType.number, nombre: "precio", placeholder: "Ingrese numero", isRequired: true, isDisabled: false, isVisible: true, min: 1},
    {
        type: eType.radio, nombre: "animal", placeholder: "Selecione un animal", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "perro", label: "Perro" },
            { value: "gato", label: "Gato" }
        ]
    },
    
    { type: eType.text, nombre: "raza", placeholder: "Ingrese la raza", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    { type: eType.date, nombre: "fecha_de_nacimiento", placeholder: "Ingrese fecha", isRequired: true, isDisabled: false, isVisible: true },
    {
        type: eType.select, nombre: "vacunas", placeholder: "----Elegir----", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "si", label: "Si" },
            { value: "no", label: "No" }
        ]
    },



    // { type: eType.email, nombre: "email", placeholder: "Ingrese email", isRequired: true, isDisabled: false, isVisible: true, maxlength: 40 },
    // { type: eType.checkbox, nombre: "checkbox", placeholder: "Ingrese checkbox", isRequired: true, isDisabled: false, isVisible: true },


    
    // { type: eType.text, nombre: "id", placeholder: "Ingrese id", isRequired: true, isDisabled: true, isVisible: false, min: 1 },
    // { type: eType.text, nombre: "titulo", placeholder: "Ingrese el titulo", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    // { type: eType.text, nombre: "Transaccion", placeholder: "Ingrese la transaccion", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    // { type: eType.textarea, nombre: "descripcion", placeholder: "Ingrese la descripcion", isRequired: true, isDisabled: false, isVisible: true, rows: 4 },
    // { type: eType.number, nombre: "precio", placeholder: "Ingrese numero", isRequired: true, isDisabled: false, isVisible: true, min: 1, max: 5 },
    // {
    //     type: eType.radio, nombre: "animal", placeholder: "Selecione un animal", isRequired: true, isDisabled: false, isVisible: true, options: [
    //         { value: "Perro", label: "Perro" },
    //         { value: "Gato", label: "Gato" }
    //     ]
    // },
    
    // { type: eType.text, nombre: "Raza", placeholder: "Ingrese la raza", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    // { type: eType.date, nombre: "Fecha de nacimiento", placeholder: "Ingrese fecha", isRequired: true, isDisabled: false, isVisible: true, min: "2000-01-02", max: "2020-12-31" },
    // {
    //     type: eType.select, nombre: "Vacunas", placeholder: "----Elegir----", isRequired: true, isDisabled: false, isVisible: true, options: [
    //         { value: "Si", label: "Si" },
    //         { value: "No", label: "No" }
    //     ]
    // },
]

/*
text, email :: maxlength="10"
number      :: min="0" max="5"
textarea:   :: rows="10"
checkbox
date        :: min="2000-01-02" max="2020-12-31"
radio       :: options
select:     :: options
*/