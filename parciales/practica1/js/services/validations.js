/**
 * Administra las validaciones de la aplicacion
 */
export class Validate {
    
    /**
     * Limpia los errores renderizados en el form
     */
    static cleanErrors() {
        let fields = document.querySelectorAll(".field");
        for (let field of fields) {
            field.classList.remove("error");
        }
    }
    static mailformat = `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/`;

    
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
        console.log("%cValidate Form", "color: green;",formdata);
        let valid = true;
        Validate.cleanErrors();

        if (!formdata.checkbox || formdata.checkbox == false) {
            Validate.addError("checkbox", "Debe aceptar el checkbox'")
            valid = false
        }

        let date = new Date(formdata.date)
        if (!formdata.date || date > Date.now()) {
            Validate.addError("date", "La fecha debe ser anterior a la fechad e hoy")
            valid = false
        }

        if (!formdata.email || formdata.email.match(Validate.mailformat)) {
            Validate.addError("email", "El mail no es valido")
            valid = false
        }

        if (!formdata.number || formdata.number < 2) {
            Validate.addError("number", "El numero debe ser mayor a 2")
            valid = false
        }

        if (!formdata.radio || formdata.radio != "Hombre") {
            Validate.addError("radio", "Debe ser hombre")
            valid = false
        }

        if (!formdata.select || formdata.select != "Argentina") {
            Validate.addError("select", "Debe ser Argentina")
            valid = false
        }

        if (!formdata.text || formdata.text != "valido") {
            Validate.addError("text", "Agregar el texto 'valido'")
            valid = false
        }

        if (!formdata.textarea) {
            Validate.addError("textarea", "Textarea es obligatorio")
            valid = false
        }

        

        let color = valid ? "green" : "red";
        console.log(`  isValid:%c${valid}`, `color: ${color};`);

        return valid;
    }
}