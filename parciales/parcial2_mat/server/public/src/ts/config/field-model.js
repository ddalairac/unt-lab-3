"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
/**
 * Configuracion del modelo de datos para form y tabla
 */
exports.fieldsModel = [
    { type: interfaces_1.eType.text, nombre: "id", placeholder: "Ingrese id", isRequired: true, isDisabled: true, isVisible: false, min: 1 },
    { type: interfaces_1.eType.text, nombre: "titulo", placeholder: "Ingrese el titulo", isRequired: true, isDisabled: false, isVisible: true },
    { type: interfaces_1.eType.text, nombre: "transaccion", placeholder: "Ingrese la transaccion", isRequired: true, isDisabled: true, isVisible: true },
    { type: interfaces_1.eType.textarea, nombre: "descripcion", placeholder: "Ingrese la descripcion", isRequired: true, isDisabled: false, isVisible: true, rows: 2 },
    { type: interfaces_1.eType.number, nombre: "precio", placeholder: "Ingrese numero", isRequired: true, isDisabled: false, isVisible: true, min: 1 },
    {
        type: interfaces_1.eType.radio, nombre: "animal", placeholder: "Selecione un animal", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "perro", label: "Perro" },
            { value: "gato", label: "Gato" }
        ]
    },
    { type: interfaces_1.eType.text, nombre: "raza", placeholder: "Ingrese la raza", isRequired: true, isDisabled: false, isVisible: true, maxlength: 10 },
    { type: interfaces_1.eType.date, nombre: "fecha_de_nacimiento", placeholder: "Ingrese fecha", isRequired: true, isDisabled: false, isVisible: true },
    {
        type: interfaces_1.eType.select, nombre: "vacunas", placeholder: "----Elegir----", isRequired: true, isDisabled: false, isVisible: true, options: [
            { value: "si", label: "Si" },
            { value: "no", label: "No" }
        ]
    },
];
/*
text, email :: maxlength="10"
number      :: min="0" max="5"
textarea:   :: rows="10"
checkbox
date        :: min="2000-01-02" max="2020-12-31"
radio       :: options
select:     :: options
*/ 
