"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../config/interfaces");
/** Clase base para fields
 * nombre, type, placeholder, isRequired
    *  @param nombre: string.
    *  @param placeholder: string.
    *  @param isRequired: boolean.
    *  @param isDisabled: boolean.
    *  @param isVisible: boolean.
 */
var Field = /** @class */ (function () {
    function Field(nombre, placeholder, isRequired, isDisabled, isVisible) {
        if (placeholder === void 0) { placeholder = ""; }
        if (isRequired === void 0) { isRequired = false; }
        if (isDisabled === void 0) { isDisabled = false; }
        if (isVisible === void 0) { isVisible = true; }
        if (!nombre) {
            throw "El nombre del field no definido";
        }
        this.nombre = nombre;
        this.label = nombre.toLowerCase().split('_').join(' ');
        this.label = this.label.charAt(0).toUpperCase() + this.label.slice(1);
        this.placeholder = placeholder;
        this.isRequired = isRequired;
        this.isDisabled = isDisabled;
        this.isVisible = isVisible;
    }
    Field.prototype.createFieldElement = function () {
        var fieldEl = document.createElement('div');
        fieldEl.setAttribute("id", "field_" + this.nombre);
        fieldEl.classList.add("field");
        if (!this.isVisible)
            fieldEl.classList.add("hidden");
        return fieldEl;
    };
    return Field;
}());
exports.Field = Field;
/**
 * Administra el componente field text/email
 */
var FieldTextEmail = /** @class */ (function (_super) {
    __extends(FieldTextEmail, _super);
    function FieldTextEmail(nombre, placeholder, isRequired, isDisabled, isVisible, type, maxlength) {
        if (type === void 0) { type = interfaces_1.eType.text; }
        if (maxlength === void 0) { maxlength = 0; }
        var _this = _super.call(this, nombre, placeholder, isRequired, isDisabled, isVisible) || this;
        _this.type = type;
        _this.maxlength = maxlength;
        _this.renderField();
        return _this;
    }
    FieldTextEmail.prototype.renderField = function () {
        var fieldEl = this.createFieldElement();
        var maxlength = this.maxlength ? "maxlength=" + this.maxlength : '';
        fieldEl.innerHTML = "\n        <label id=\"label_" + this.nombre + "\" for=\"" + this.nombre + "\">" + this.label + "</label>\n        <input id=\"" + this.nombre + "\" type=\"" + this.type + "\" name=\"" + this.nombre + "\" placeholder=\"" + this.placeholder + "\" " + maxlength + ">\n        <span id=\"error_" + this.nombre + "\" class=\"error-msj\">error del campo</span>";
        var inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    };
    return FieldTextEmail;
}(Field));
exports.FieldTextEmail = FieldTextEmail;
/**
 * Administra el componente field numero
 */
var FieldNumber = /** @class */ (function (_super) {
    __extends(FieldNumber, _super);
    function FieldNumber(nombre, placeholder, isRequired, isDisabled, isVisible, min, max) {
        var _this = _super.call(this, nombre, placeholder, isRequired, isDisabled, isVisible) || this;
        _this.min = min;
        _this.max = max;
        _this.renderField();
        return _this;
    }
    FieldNumber.prototype.renderField = function () {
        var fieldEl = this.createFieldElement();
        var minimo;
        var maximo;
        if (this.min != undefined)
            minimo = "min=" + this.min;
        else
            minimo = '';
        if (this.max != undefined)
            maximo = "max=" + this.max;
        else
            maximo = '';
        fieldEl.innerHTML = "\n        <label id=\"label_" + this.nombre + "\" for=\"" + this.nombre + "\">" + this.label + "</label>\n        <input id=\"" + this.nombre + "\" type=\"number\" name=\"" + this.nombre + "\" placeholder=\"" + this.placeholder + "\" " + minimo + " " + maximo + ">\n        <span id=\"error_" + this.nombre + "\" class=\"error-msj\">error del campo</span>";
        var inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    };
    return FieldNumber;
}(Field));
exports.FieldNumber = FieldNumber;
/**
 * Administra el componente field checkbox
 */
var FieldCheckbox = /** @class */ (function (_super) {
    __extends(FieldCheckbox, _super);
    function FieldCheckbox(nombre, placeholder, isRequired, isDisabled, isVisible) {
        var _this = _super.call(this, nombre, placeholder, isRequired, isDisabled, isVisible) || this;
        _this.renderField();
        return _this;
    }
    FieldCheckbox.prototype.renderField = function () {
        var fieldEl = this.createFieldElement();
        fieldEl.classList.add("checkbox");
        fieldEl.innerHTML = "\n        <p>" + this.label + "</p>\n        <input id=\"" + this.nombre + "\" type=\"checkbox\" name=\"" + this.nombre + "\">\n        <label id=\"label_" + this.nombre + "\" for=\"" + this.nombre + "\">" + this.placeholder + "</label>\n        <span id=\"error_" + this.nombre + "\" class=\"error-msj\">error del campo</span>";
        var inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    };
    return FieldCheckbox;
}(Field));
exports.FieldCheckbox = FieldCheckbox;
/**
 * Administra el componente field textarea
 */
var FieldTextarea = /** @class */ (function (_super) {
    __extends(FieldTextarea, _super);
    function FieldTextarea(nombre, placeholder, isRequired, isDisabled, isVisible, rows) {
        if (rows === void 0) { rows = 0; }
        var _this = _super.call(this, nombre, placeholder, isRequired, isDisabled, isVisible) || this;
        _this.rows = rows;
        _this.renderField();
        return _this;
    }
    FieldTextarea.prototype.renderField = function () {
        var fieldEl = this.createFieldElement();
        fieldEl.classList.add("w-100");
        var rows = this.rows ? "rows=\"" + this.rows + "\"" : '';
        fieldEl.innerHTML = "\n        <label id=\"label_" + this.nombre + "\" for=\"" + this.nombre + "\">" + this.label + "</label>\n        <textarea id=\"" + this.nombre + "\"" + this.placeholder + "  type=\"checkbox\" name=\"" + this.nombre + "\" " + rows + " ></textarea>\n        <span id=\"error_" + this.nombre + "\" class=\"error-msj\">error del campo</span>";
        var inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    };
    return FieldTextarea;
}(Field));
exports.FieldTextarea = FieldTextarea;
/**
 * Administra el componente field date
 */
var FieldDate = /** @class */ (function (_super) {
    __extends(FieldDate, _super);
    function FieldDate(nombre, placeholder, isRequired, isDisabled, isVisible, min, max) {
        if (min === void 0) { min = ''; }
        if (max === void 0) { max = ''; }
        var _this = _super.call(this, nombre, placeholder, isRequired, isDisabled, isVisible) || this;
        _this.min = min;
        _this.max = max;
        _this.renderField();
        return _this;
    }
    FieldDate.prototype.renderField = function () {
        var fieldEl = this.createFieldElement();
        var minimo = this.min ? "min=\"" + this.min + "\"" : '';
        var maximo = this.max ? "max=\"" + this.max + "\"" : '';
        fieldEl.innerHTML = "\n        <label id=\"label_" + this.nombre + "\" for=\"" + this.nombre + "\">" + this.label + "</label>\n        <input id=\"" + this.nombre + "\" type=\"date\" name=\"" + this.nombre + "\" placeholder=\"" + this.placeholder + "\" " + minimo + " " + maximo + ">\n        <span id=\"error_" + this.nombre + "\" class=\"error-msj\">error del campo</span>";
        var inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    };
    return FieldDate;
}(Field));
exports.FieldDate = FieldDate;
/**
 * Administra el componente field radio
 */
var FieldRadio = /** @class */ (function (_super) {
    __extends(FieldRadio, _super);
    function FieldRadio(nombre, placeholder, isRequired, isDisabled, isVisible, options) {
        if (options === void 0) { options = []; }
        var _this = _super.call(this, nombre, placeholder, isRequired, isDisabled, isVisible) || this;
        _this.options = options;
        _this.renderField();
        return _this;
    }
    FieldRadio.prototype.renderField = function () {
        var _this = this;
        var fieldEl = this.createFieldElement();
        fieldEl.classList.add("radio");
        var disabled = this.isDisabled ? "disabled" : '';
        var required = this.isRequired ? "required" : '';
        var optionsElements = "";
        this.options.forEach(function (option) {
            var key = option.value.toLowerCase().split(' ').join('_').split('-').join('');
            optionsElements += "\n            <input type=\"radio\" id=\"" + key + "\" name=\"" + _this.nombre + "\" value=\"" + option.value + "\" " + disabled + " " + required + ">\n            <label id=\"label_" + _this.nombre + "\" for=\"" + key + "\">" + option.label + "</label>";
        });
        fieldEl.innerHTML = "\n                <p>" + this.label + "</p>\n                " + optionsElements + "\n                <span id=\"error_" + this.nombre + "\" class=\"error-msj\">error del campo</span>";
        // let inputEl = fieldEl.childNodes[3];
        // inputEl.disabled = this.isDisabled;
        // inputEl.required = this.isRequired;
        this.element = fieldEl;
    };
    return FieldRadio;
}(Field));
exports.FieldRadio = FieldRadio;
/**
 * Administra el componente field select
 */
var FieldSelect = /** @class */ (function (_super) {
    __extends(FieldSelect, _super);
    function FieldSelect(nombre, placeholder, isRequired, isDisabled, isVisible, options) {
        if (options === void 0) { options = []; }
        var _this = _super.call(this, nombre, placeholder, isRequired, isDisabled, isVisible) || this;
        _this.options = options;
        _this.renderField();
        return _this;
    }
    FieldSelect.prototype.renderField = function () {
        var fieldEl = this.createFieldElement();
        var optionsElements = "<option value=\"\" disabled selected hidden>" + this.placeholder + "</option>";
        this.options.forEach(function (option) {
            // let label = option.label;
            // let label = option.toLowerCase().split('_').join(' ');
            // label = label.charAt(0).toUpperCase() + label.slice(1);
            var key = option.value.toLowerCase().split(' ').join('_').split('-').join('');
            optionsElements += "\n            <option id=\"" + key + "\" value=\"" + option.value + "\">" + option.label + "</option>";
        });
        fieldEl.innerHTML = "\n                <label id=\"label_" + this.nombre + "\" for=\"" + this.nombre + "\">" + this.label + "</label>\n                <select id=\"" + this.nombre + "\" name=\"" + this.nombre + "\">\n                    " + optionsElements + "\n                </select>\n                <span id=\"error_" + this.nombre + "\" class=\"error-msj\">error del campo</span>";
        var inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;
        this.element = fieldEl;
    };
    return FieldSelect;
}(Field));
exports.FieldSelect = FieldSelect;
