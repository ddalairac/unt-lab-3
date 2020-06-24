"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var field_model_1 = require("../config/field-model");
/**
 * Administra las validaciones de la aplicacion
 */
var Validate = /** @class */ (function () {
    function Validate() {
    }
    /**
     * Limpia los errores renderizados en el form
     */
    Validate.cleanErrors = function () {
        var fields = document.querySelectorAll(".field");
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            field.classList.remove("error");
        }
    };
    /**
     * renderiza un error
     */
    Validate.addError = function (fieldName, msj) {
        document.getElementById("field_" + fieldName).classList.add("error");
        document.getElementById("error_" + fieldName).innerText = msj;
    };
    /**
     * Validaciones custom del form
     */
    Validate.form = function (formdata) {
        console.log(" ");
        console.log("%cValidate Form", "color: green;", formdata);
        var valid = true;
        Validate.cleanErrors();
        // if (Validate.vEmail(formdata.email)) {
        //     Validate.addError("email", "El mail no es valido")
        //     valid = false
        // }
        var date = new Date(formdata.fecha_de_nacimiento);
        if (date > Date.now()) {
            Validate.addError("fecha_de_nacimiento", "La fecha debe ser anterior a la fecha de hoy");
            valid = false;
        }
        // if (formdata.checkbox == false) {
        //     Validate.addError("checkbox", "Debe aceptar el checkbox'")
        //     valid = false
        // }
        // if (formdata.number < 2) {
        //     Validate.addError("number", "El numero debe ser mayor a 2")
        //     valid = false
        // }
        // if (formdata.radio != "Hombre") {
        //     Validate.addError("radio", "Debe ser hombre")
        //     valid = false
        // }
        // if (formdata.select != "AR") {
        //     Validate.addError("select", "Debe ser Argentina")
        //     valid = false
        // }
        // if (formdata.text != "valido") {
        //     Validate.addError("text", "Agregar el texto 'valido'")
        //     valid = false
        // }
        valid = Validate.vRquired(formdata, valid);
        var color = valid ? "green" : "red";
        console.log("  isValid:%c" + valid, "color: " + color + ";");
        return valid;
    };
    /** Helper: grega validacion email */
    Validate.vEmail = function (field) {
        return !Validate.mailformat.test(field);
    };
    /** Helper: grega validacion de requerido en los campos */
    Validate.vRquired = function (formdata, valid) {
        for (var _i = 0, fieldsModel_1 = field_model_1.fieldsModel; _i < fieldsModel_1.length; _i++) {
            var fm = fieldsModel_1[_i];
            for (var id in formdata) {
                if (fm.nombre == id) {
                    if (fm.isRequired && !formdata[id] && id != "id") {
                        Validate.addError(id, "Este Campo es oblicatorio");
                        valid = false;
                    }
                }
            }
        }
        return valid;
    };
    Validate.mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return Validate;
}());
exports.Validate = Validate;
