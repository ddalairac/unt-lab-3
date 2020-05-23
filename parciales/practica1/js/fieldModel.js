export const fieldsModel = [
    { type: "text", nombre: "text", placeholder: "Ingrese texto", isRequired: true, isDisabled: false, maxlength: 10 },
    { type: "email", nombre: "email", placeholder: "Ingrese email", isRequired: true, isDisabled: false, maxlength: 10 },
    { type: "number", nombre: "number", placeholder: "Ingrese numero", isRequired: true, isDisabled: false, min: 1, max: 5 },
    { type: "date", nombre: "date", placeholder: "Ingrese fecha", isRequired: true, isDisabled: false, min: "2000-01-02", max: "2020-12-31" },
    { type: "checkbox", nombre: "checkbox", placeholder: "Ingrese checkbox", isRequired: true, isDisabled: false },
    { type: "textarea", nombre: "textarea", placeholder: "Ingrese textarea", isRequired: true, isDisabled: false, rows: 4 },
    { type: "radio", nombre: "radio", placeholder: "selecione un radio", isRequired: true, isDisabled: false, options:["Hombre","mujer","otro"]},
    { type: "select", nombre: "select", placeholder: "selecione una opcion", isRequired: true, isDisabled: false, options:["Hombre","mujer","otro"]},


    // { type: "number", nombre: "Id", placeholder: "", isRequired: false, isDisabled: true },
    // { type: "email", nombre: "Titulo", placeholder: "ingrese ", isRequired: true, isDisabled: false },
    // { type: "text", nombre: "Transaccion", placeholder: "ingrese ", isRequired: true, isDisabled: false },
    // { type: "text", nombre: "Descripcion", placeholder: "ingrese ", isRequired: true, isDisabled: false },
    // { type: "number", nombre: "Precio", placeholder: "ingrese ", isRequired: true, isDisabled: false },
    // { type: "text", nombre: "Num_Wc", placeholder: "ingrese ", isRequired: true, isDisabled: false },
    // { type: "text", nombre: "Num_Estacionamiento", placeholder: "ingrese ", isRequired: true, isDisabled: false },
    // { type: "text", nombre: "Num_Dormitorio", placeholder: "ingrese ", isRequired: true, isDisabled: false },
]

/*
text, email :: maxlength="10"
number      :: min="1" max="5"
textarea:   :: rows="10"
checkbox
date        :: min="2000-01-02" max="2020-12-31"
radio       :: options
select:     :: options
*/