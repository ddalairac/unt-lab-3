import { MemoryManager } from "../services/memory-manager.js";
import { FieldTextEmail, FieldNumber, FieldDate, FieldCheckbox, FieldTextarea, FieldRadio, FieldSelect } from './fields.js';
import { fieldsModel } from '../fieldModel.js';
export class Form {

    constructor() {
        this.formElement = document.querySelector(".form");
        this.btnNewElement = document.getElementById("btnNew");
        this.titleElement = document.getElementById("formTitle");
        this.fieldContElement = document.querySelector(".fieldContainer");
        this.renderFields();
        this.setButons();
    }
    formElement;
    fieldContElement;
    btnNewElement;
    titleElement;

    // #region Form
    formOpen() {
        this.formElement.classList.remove("close");
        this.btnNewElement.disabled = true;
    }
    formClose() {
        this.formElement.classList.add("close");
        this.btnNewElement.disabled = false;

    }
    // #endregion

    // #region Fields
    renderFields() {
        fieldsModel.forEach(field => {
            let fInst;
            // console.log(field)
            switch (field.type) {
                case "number":
                    fInst = new FieldNumber(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.min, field.max);
                    break;
                case "date":
                    fInst = new FieldDate(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.min, field.max);
                    break;
                case "checkbox":
                    fInst = new FieldCheckbox(field.nombre, field.placeholder, field.isRequired, field.isDisabled);
                    break;
                case "textarea":
                    fInst = new FieldTextarea(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.rows, field.cols);
                    break;
                case "radio":
                    fInst = new FieldRadio(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.options);
                    break;
                case "select":
                    fInst = new FieldSelect(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.options);
                    break;

                default:
                    fInst = new FieldTextEmail(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.type, field.maxlength);
                    break;
            }
            this.fieldContElement.appendChild(fInst.element);
        });
    }
    // #endregion

    // #region Buttons
    newDataInForm() {
        this.formOpen();
        this.formElement.setAttribute("style", `top: 80px;`);
        this.titleElement.innerText = "Nuevo item";
    }
    editDataInForm(id, trElement) {
        let item = MemoryManager.instance.data.find(row => row.id == id);
        console.log(item)
        console.log(trElement.offsetTop)

        this.formOpen();
        this.formElement.setAttribute("style", `top: ${trElement.offsetTop + 80}px;`);
        this.titleElement.innerText = "Editar ID: " + id;
    }
    cancelEditDataInForm() {
        this.formClose();

        let rows = document.querySelectorAll("tbody tr");
        for (let row of rows) {
            row.classList.remove("active");
        }
    }

    setButons() {
        document.getElementById("btnSubmit").onclick = this.onSubmit;
        document.getElementById("btnRemove").onclick = this.onRemove;
        document.getElementById("btnCancel").onclick = this.onCancel;
        document.getElementById("btnCancelX").onclick = this.onCancel;
        document.getElementById("btnNew").onclick = this.onNew;
    }
    onNew() {
        event.preventDefault();
        MemoryManager.instance.formInstance.newDataInForm();
    }
    onSubmit() {
        event.preventDefault();
    }
    onRemove() {
        event.preventDefault();
    }
    onCancel() {
        event.preventDefault();
        MemoryManager.instance.formInstance.cancelEditDataInForm();
    }
    // #endregion

}