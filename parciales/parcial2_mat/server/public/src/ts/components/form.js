"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var memory_manager_1 = require("../services/memory-manager");
var fields_1 = require("./fields");
var field_model_1 = require("../config/field-model");
var validations_1 = require("../services/validations");
var interfaces_1 = require("../config/interfaces");
/**
 * Administra el componente Form
 */
var Form = /** @class */ (function () {
    function Form() {
        this.fields = [];
        this.formElement = document.querySelector(".form");
        this.btnNewElement = document.getElementById("btnNew");
        this.titleElement = document.getElementById("formTitle");
        this.fieldContElement = document.querySelector(".fieldContainer");
        this.renderFields();
        this.setButons();
    }
    // #region Form
    Form.prototype.formOpen = function () {
        validations_1.Validate.cleanErrors();
        this.formElement.classList.remove("close");
        this.btnNewElement.disabled = true;
    };
    Form.prototype.formClose = function () {
        this.formElement.classList.add("close");
        this.formElement.classList.remove("edit");
        this.btnNewElement.disabled = false;
    };
    Form.prototype.newDataInForm = function () {
        this.cleanFormValues();
        this.formOpen();
        this.formElement.setAttribute("style", "top: 0;");
        this.titleElement.innerHTML = "<i class='fas fa-plus'></i> Nuevo anuncio";
        this.formElement.classList.remove("edit");
        document.getElementById("btnSubmit").innerHTML = "<i class=\"fas fa-save\"></i> Guardar nuevo";
        document.getElementById("btnRemove").classList.add("hidden");
        this.addIconAndDefaults();
        this.isEdit = false;
    };
    Form.prototype.addIconAndDefaults = function () {
        this.formElement.transaccion.value = "venta";
        var lVaElement = document.getElementById("label_vacunas");
        var lvaText = lVaElement.innerText;
        lVaElement.innerHTML = "<i class=\"fas fa-syringe\"></i> " + lvaText;
        var lFeElement = document.getElementById("label_fecha_de_nacimiento");
        var lFeText = lFeElement.innerText;
        lFeElement.innerHTML = "<i class=\"fas fa-birthday-cake\"></i> " + lFeText;
        var lRaElement = document.getElementById("label_raza");
        var lRText = lRaElement.innerText;
        lRaElement.innerHTML = "<i class=\"fas fa-paw\"></i> " + lRText;
    };
    // editDataInForm(id, trElement) {
    Form.prototype.editDataInForm = function (index, topPosition) {
        this.cleanFormValues();
        var formData = memory_manager_1.MemoryManager.instance.data[index];
        this.populateFormValues(formData);
        this.formOpen();
        this.formElement.setAttribute("style", "top: " + (topPosition - 25) + "px;");
        this.formElement.classList.add("edit");
        this.titleElement.innerHTML = "<i class='fas fa-edit'></i> Editar anuncio " + formData.id;
        document.getElementById("btnSubmit").innerHTML = "<i class=\"fas fa-save\"></i> Guardar cambios";
        document.getElementById("btnRemove").classList.remove("hidden");
        // this.addIconAndDefaults();
        this.isEdit = true;
    };
    Form.prototype.cancelEditDataInForm = function () {
        this.formClose();
        var rows = document.querySelectorAll("tbody tr");
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            row.classList.remove("active");
        }
    };
    Form.prototype.populateFormValues = function (formData) {
        var _loop_1 = function (fm) {
            try {
                switch (fm.type) {
                    case interfaces_1.eType.radio:
                        fm.options.forEach(function (opt) {
                            var id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            var element = document.getElementById(id);
                            element.checked = (formData[fm.nombre] == element.value);
                        });
                        break;
                    case interfaces_1.eType.select:
                        fm.options.forEach(function (opt) {
                            var id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            var element = document.getElementById(id);
                            element.selected = (formData[fm.nombre] == element.value);
                        });
                        break;
                    case interfaces_1.eType.checkbox:
                        document.getElementById(fm.nombre).checked = JSON.parse(formData[fm.nombre]);
                        break;
                    default:
                        document.getElementById(fm.nombre).value = formData[fm.nombre];
                        break;
                }
            }
            catch (error) {
                console.error("error populateFormValues() en id: " + fm.nombre);
                console.error(error);
            }
        };
        for (var _i = 0, fieldsModel_1 = field_model_1.fieldsModel; _i < fieldsModel_1.length; _i++) {
            var fm = fieldsModel_1[_i];
            _loop_1(fm);
        }
        // }
    };
    Form.prototype.readFormValues = function () {
        var request = {};
        var _loop_2 = function (fm) {
            var _a;
            var value = "";
            var keyValue = void 0;
            try {
                switch (fm.type) {
                    case "radio":
                        fm.options.forEach(function (opt) {
                            var id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                            var element = document.getElementById(id);
                            if (element.checked) {
                                value = element.value;
                            }
                        });
                        break;
                    case "select":
                        value = document.getElementById(fm.nombre).value;
                        break;
                    case "checkbox":
                        value = document.getElementById(fm.nombre).checked;
                        break;
                    case "number":
                        value = parseInt(document.getElementById(fm.nombre).value);
                        break;
                    default:
                        value = document.getElementById(fm.nombre).value;
                        break;
                }
                keyValue = (_a = {}, _a[fm.nombre] = value, _a);
                request = __assign(__assign({}, request), keyValue);
            }
            catch (error) {
                console.error("error readFormValues() en id: " + fm.nombre + " " + value);
                console.error(error);
            }
        };
        for (var _i = 0, fieldsModel_2 = field_model_1.fieldsModel; _i < fieldsModel_2.length; _i++) {
            var fm = fieldsModel_2[_i];
            _loop_2(fm);
        }
        return request;
    };
    Form.prototype.cleanFormValues = function (cleanID) {
        if (cleanID === void 0) { cleanID = true; }
        for (var _i = 0, fieldsModel_3 = field_model_1.fieldsModel; _i < fieldsModel_3.length; _i++) {
            var fm = fieldsModel_3[_i];
            if (!(!cleanID && fm.nombre == "id")) {
                try {
                    switch (fm.type) {
                        case "radio":
                            fm.options.forEach(function (opt) {
                                var id = opt.value.toLowerCase().split(' ').join('_').split('-').join('');
                                var element = document.getElementById(id);
                                element.checked = false;
                            });
                            break;
                        case "checkbox":
                            document.getElementById(fm.nombre).checked = false;
                            break;
                        default:
                            document.getElementById(fm.nombre).value = "";
                            break;
                    }
                }
                catch (error) {
                    console.error("error cleanFormValues() en id: " + fm.nombre);
                    console.error(error);
                }
            }
        }
    };
    // #endregion
    // #region Fields
    Form.prototype.renderFields = function () {
        var _this = this;
        field_model_1.fieldsModel.forEach(function (field) {
            var fInst;
            switch (field.type) {
                case "number":
                    fInst = new fields_1.FieldNumber(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.min, field.max);
                    break;
                case "date":
                    fInst = new fields_1.FieldDate(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.min, field.max);
                    break;
                case "checkbox":
                    fInst = new fields_1.FieldCheckbox(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible);
                    break;
                case "textarea":
                    fInst = new fields_1.FieldTextarea(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.rows, field.cols);
                    break;
                case "radio":
                    fInst = new fields_1.FieldRadio(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.options);
                    break;
                case "select":
                    fInst = new fields_1.FieldSelect(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.options);
                    break;
                default:
                    fInst = new fields_1.FieldTextEmail(field.nombre, field.placeholder, field.isRequired, field.isDisabled, field.isVisible, field.type, field.maxlength);
                    break;
            }
            _this.fields.push(fInst);
            _this.fieldContElement.appendChild(fInst.element);
        });
        console.log("%cFields instances: ", "color: green", this.fields);
    };
    // #endregion
    // #region Buttons
    Form.prototype.setButons = function () {
        // this.formElement.onclick = this.onSubmit;
        document.getElementById("btnSubmit").onclick = this.onSubmit;
        document.getElementById("btnRemove").onclick = this.onRemove;
        document.getElementById("btnClear").onclick = this.onClear;
        document.getElementById("btnCancel").onclick = this.onCancel;
        document.getElementById("btnCancelX").onclick = this.onCancel;
        document.getElementById("btnNew").onclick = this.onNew;
    };
    Form.prototype.onNew = function () {
        memory_manager_1.MemoryManager.instance.formInstance.newDataInForm();
    };
    Form.prototype.onSubmit = function () {
        event.preventDefault();
        memory_manager_1.MemoryManager.instance.saveEditData();
    };
    Form.prototype.onRemove = function () {
        event.preventDefault();
        if (confirm("¿Esta seguro que desea eliminar los datos?"))
            memory_manager_1.MemoryManager.instance.removeData();
    };
    Form.prototype.onCancel = function () {
        event.preventDefault();
        memory_manager_1.MemoryManager.instance.formInstance.cancelEditDataInForm();
    };
    Form.prototype.onClear = function () {
        event.preventDefault();
        if (confirm("¿Esta seguro que desea vaciar los campos?"))
            memory_manager_1.MemoryManager.instance.formInstance.cleanFormValues(false);
    };
    return Form;
}());
exports.Form = Form;
