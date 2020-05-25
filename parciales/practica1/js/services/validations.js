import { fieldsModel } from "../config/field-model.js";

/**
 * Administra las validaciones de la aplicacion
 */
export class Validate {
    static mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    /**
     * Limpia los errores renderizados en el form
     */
    static cleanErrors() {
        let fields = document.querySelectorAll(".field");
        for (let field of fields) {
            field.classList.remove("error");
        }
    }

    /**
     * renderiza un error
     */
    static addError(fieldName, msj) {
        document.getElementById(`field_${fieldName}`).classList.add("error");
        document.getElementById(`error_${fieldName}`).innerText = msj;
    }

    /**
     * Validaciones custom del form
     */
    static form(formdata) {
        console.log(" ");
        console.log("%cValidate Form", "color: green;", formdata);
        let valid = true;
        Validate.cleanErrors();

        valid = Validate.vRquired(formdata);

        if (Validate.vEmail(formdata.email)) {
            Validate.addError("email", "El mail no es valido")
            valid = false
        }

        let date = new Date(formdata.date)
        if (date > Date.now()) {
            Validate.addError("date", "La fecha debe ser anterior a la fechad e hoy")
            valid = false
        }

        if (formdata.checkbox == false) {
            Validate.addError("checkbox", "Debe aceptar el checkbox'")
            valid = false
        }

        if (formdata.number < 2) {
            Validate.addError("number", "El numero debe ser mayor a 2")
            valid = false
        }

        if (formdata.radio != "Hombre") {
            Validate.addError("radio", "Debe ser hombre")
            valid = false
        }

        if (formdata.select != "AR") {
            Validate.addError("select", "Debe ser Argentina")
            valid = false
        }

        if (formdata.text != "valido") {
            Validate.addError("text", "Agregar el texto 'valido'")
            valid = false
        }




        let color = valid ? "green" : "red";
        console.log(`  isValid:%c${valid}`, `color: ${color};`);

        return valid;
    }

    /** Helper: grega validacion email */
    static vEmail(field) {
        return !Validate.mailformat.test(field);
    }

    /** Helper: grega validacion de requerido en los campos */
    static vRquired(formdata) {
        let valid = true;
        for (let fm of fieldsModel) {
            for (let id in formdata) {
                if (fm.nombre == id) {
                    if (fm.isRequired && !formdata[id]) {
                        Validate.addError(id, "Este Campo es oblicatorio");
                        valid = false
                    }
                }
            }
        }
        return valid;
    }
}