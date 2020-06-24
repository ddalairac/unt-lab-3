import { eType } from './interfaces.js';
export const fieldsModel = [
    { type: eType.text, nombre: "id", placeholder: "Ingrese id", isRequired: true, isDisabled: true, isVisible: false, min: 1 },
    { type: eType.text, nombre: "titulo", placeholder: "Ingrese el titulo", isRequired: true, isDisabled: false, isVisible: true },
    { type: eType.text, nombre: "transaccion", placeholder: "Ingrese la transaccion", isRequired: true, isDisabled: true, isVisible: true },
    { type: eType.textarea, nombre: "descripcion", placeholder: "Ingrese la descripcion", isRequired: true, isDisabled: false, isVisible: true, rows: 2 },
    { type: eType.number, nombre: "precio", placeholder: "Ingrese numero", isRequired: true, isDisabled: false, isVisible: true, min: 1 },
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
];
//# sourceMappingURL=field-model.js.map