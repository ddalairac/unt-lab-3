import { Table } from '../components/table.js';
import { Form } from '../components/form.js';
import { restXHR, restFetch } from './rest.js';
export class MemoryManager {
    constructor() {
        if (MemoryManager._instance) {
            throw "No se puede crear otra instancia de MemoryManager";
        }
        MemoryManager._instance = this;
        this.formInstance = new Form();
        
    }
    static get instance() {
        if (!this._instance)
            new MemoryManager();
        return this._instance;
    }
    static _instance;

    _selectedRowElement;
    tableElement;
    containerElement;
    formInstance;
    data;
    selectID

    get selectedRowElement() {
        return this._selectedRowElement;
    }
    set selectedRowElement(value) {
        this._selectedRowElement = value;
        if (value) {
            for (const dom of value.childNodes) {
                if (dom.getAttribute("data-before") == "id") {
                    console.log("selectID: " + dom.innerText);
                    this.selectID = parseInt(dom.innerText);
                    this.formInstance.editDataInForm(this.selectID, value);
                }
            }
        } else {
            this.formInstance.cancelEditDataInForm();
            this.selectID = null;
        }
    }
    readAndRender() {
        // restXHR.get("traer").then(
        restFetch.get("traer").then(
            (response) => {
                if (!this.containerElement)
                    this.containerElement = document.getElementById("container");
                if (this.tableElement)
                    this.containerElement.removeChild(this.tableElement);
                this.data = response.data;
                this.tableElement = Table.render(this.data);
                this.containerElement.appendChild(this.tableElement);
            }
        )
    }

}