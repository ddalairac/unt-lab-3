import { Table } from '../components/table.js';
import { restXHR, restFetch } from './rest.js';
export class MemoryManager {
    constructor() {
        if (MemoryManager._instance) {
            throw "No se puede crear otra instancia de MemoryManager";
        }
        MemoryManager._instance = this;
        this.setButons();
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
    formElement;
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
                    this.editDataInForm(this.selectID)
                }
            }
        } else {
            this.cancelEditDataInForm();
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
    editDataInForm(id) {
        let item = this.data.find(row => row.id == id);
        console.log(item)
        // return item
        if (!this.formElement)
            this.formElement = document.querySelector(".form");
        this.formBGElement = document.querySelector(".grey-background");

        this.formElement.classList.remove("close");
    }
    cancelEditDataInForm() {
        this.formElement.classList.add("close");
    }

    setButons() {
        document.getElementById("btnSubmit").onclick = this.onSubmit;
        document.getElementById("btnRemove").onclick = this.onRemove;
        document.getElementById("btnCancel").onclick = this.onCancel;
    }
    onSubmit() {
        event.preventDefault();
    }
    onRemove() {
        event.preventDefault();
    }
    onCancel() {
        event.preventDefault();
        MemoryManager.instance.cancelEditDataInForm();
    }
}