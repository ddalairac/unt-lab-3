/** Field de texto o email
 * nombre, type, placeholder, isRequired
    *  @param nombre: string.
    *  @param placeholder: string.
    *  @param isRequired: boolean.
    *  @param isDisabled: boolean.
 */
export class Field {
    constructor(nombre, placeholder = "", isRequired = false, isDisabled = false) {
        if (!nombre) {
            throw "El nombre del field no definido";
        }
        this.nombre = nombre;
        this.label = nombre.toLowerCase().split('_').join(' ');
        this.placeholder = placeholder;
        this.isRequired = isRequired;
        this.isDisabled = isDisabled;
    }
    element;

    label;
    nombre;
    type;
    placeholder;
    isRequired;
    isDisabled;
}

export class FieldTextEmail extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, type = "text", maxlength = 0) {
        super(nombre, placeholder, isRequired, isDisabled);
        this.type = type;
        this.maxlength = maxlength;
        this.renderField();
    }
    maxlength;
    renderField() {
        let fieldEl = document.createElement('div');
        fieldEl.classList.add("field");
        let maxlength = this.maxlength ? `maxlength=${this.maxlength}` : '';
        fieldEl.innerHTML = `
        <label for="${this.nombre}">${this.label}</label>
        <input id="${this.nombre}" type="${this.type}" name="${this.nombre}" placeholder="${this.placeholder}" ${maxlength}>`;

        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;

        this.element = fieldEl;
    }
}

export class FieldNumber extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, min = 0, max = 0) {
        super(nombre, placeholder, isRequired, isDisabled);
        this.min = min;
        this.max = max;
        this.renderField();
    }
    min;
    max;
    renderField() {
        let fieldEl = document.createElement('div');
        fieldEl.classList.add("field");
        let minimo = this.min ? `min=${this.min}` : '';
        let maximo = this.max ? `max=${this.max}` : '';
        fieldEl.innerHTML = `
        <label for="${this.nombre}">${this.label}</label>
        <input id="${this.nombre}" type="number" name="${this.nombre}" placeholder="${this.placeholder}" ${minimo} ${maximo}>`;

        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;

        this.element = fieldEl;
    }
}

export class FieldCheckbox extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled) {
        super(nombre, placeholder, isRequired, isDisabled);
        this.renderField();
    }
    renderField() {
        let fieldEl = document.createElement('div');
        fieldEl.classList.add("field");
        fieldEl.classList.add("checkbox");

        fieldEl.innerHTML = `
        <p>${this.label}</p>
        <input id="${this.nombre}" type="checkbox" name="${this.nombre}">
        <label for="${this.nombre}">${this.placeholder}</label>`;

        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;

        this.element = fieldEl;
    }
}

export class FieldTextarea extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, rows = 0) {
        super(nombre, placeholder, isRequired, isDisabled);
        this.rows = rows;
        this.renderField();
    }
    rows;
    renderField() {
        let fieldEl = document.createElement('div');
        fieldEl.classList.add("field");
        fieldEl.classList.add("w-100");
        let rows = this.rows ? `rows="${this.rows}"` : '';
        fieldEl.innerHTML = `
        <label for="${this.nombre}">${this.label}</label>
        <textarea id="${this.nombre}"${this.placeholder}  type="checkbox" name="${this.nombre}" ${rows} ></textarea>`;

        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;

        this.element = fieldEl;
    }
}

export class FieldDate extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, min = '', max = '') {
        super(nombre, placeholder, isRequired, isDisabled);
        this.min = min;
        this.max = max;
        this.renderField();
    }
    min;
    max;
    renderField() {
        let fieldEl = document.createElement('div');
        fieldEl.classList.add("field");
        let minimo = this.min ? `min="${this.min}"` : '';
        let maximo = this.max ? `max="${this.max}"` : '';
        fieldEl.innerHTML = `
        <label for="${this.nombre}">${this.label}</label>
        <input id="${this.nombre}" type="date" name="${this.nombre}" placeholder="${this.placeholder}" ${minimo} ${maximo}>`;

        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;

        this.element = fieldEl;
    }
}

export class FieldRadio extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, options=[""]) {
        super(nombre, placeholder, isRequired, isDisabled);
        this.options = options;
        this.renderField();
    }
    options;
    renderField() {
        let fieldEl = document.createElement('div');
        fieldEl.classList.add("field");
        fieldEl.classList.add("radio");

        let disabled = this.isDisabled ? `disabled` : '';
        let optionsElements = "";
        this.options.forEach(option => {
            optionsElements += `
            <input type="radio" id="${option}" name="${this.nombre}" value="${option}" ${disabled}>
            <label for="${option}">${option.toLowerCase().split('_').join(' ')}</label>`
        });
        fieldEl.innerHTML = `
                <p>${this.placeholder}</p>
                ${optionsElements}`;
        let inputEl = fieldEl.childNodes[3];
        // inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;

        this.element = fieldEl;
    }
}

export class FieldSelect extends Field {
    constructor(nombre, placeholder, isRequired, isDisabled, options=[""]) {
        super(nombre, placeholder, isRequired, isDisabled);
        this.options = options;
        this.renderField();
    }
    options;
    renderField() {
        let fieldEl = document.createElement('div');
        fieldEl.classList.add("field");

        let optionsElements = `<option value="" disabled selected hidden>${this.placeholder}</option>`;
        this.options.forEach(option => {
            optionsElements += `
            <option value="${option}">${option.toLowerCase().split('_').join(' ')}</option>`
        });
        fieldEl.innerHTML = `
                <label for="${this.nombre}">${this.label}</label>
                <select id="${this.nombre}" name="${this.nombre}">
                    ${optionsElements}
                </select>`;
        let inputEl = fieldEl.childNodes[3];
        inputEl.disabled = this.isDisabled;
        inputEl.required = this.isRequired;

        this.element = fieldEl;
    }
}