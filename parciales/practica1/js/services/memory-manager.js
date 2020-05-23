import { Table } from '../components/table.js';
import { Form } from '../components/form.js';
import { restXHR, restFetch } from './rest.js';
import { fieldsModel } from "../fieldModel.js";
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

    // _selectedRowElement;
    tableElement;
    containerElement;
    formInstance;
    data;
    selectID

    // get selectedRowElement() {
    //     return this._selectedRowElement;
    // }
    // set selectedRowElement(selRoeEl) {
    //     console.log("selRoeEl",selRoeEl) 
    //     this._selectedRowElement = selRoeEl;
    //     if (selRoeEl) {
    //         for (const dom of selRoeEl.childNodes) {
    //             if (dom.getAttribute("data-before") == "id") {
    //                 console.log("selectID: " + dom.innerText);
    //                 this.selectID = parseInt(dom.innerText);
    //                 this.formInstance.editDataInForm(this.selectID, selRoeEl);
    //             }
    //         }
    //     } else {
    //         this.formInstance.cancelEditDataInForm();
    //         this.selectID = null;
    //     }
    // }
    readAndRender() {
        // restXHR.get("traer").then(
        restFetch.get("traer").then(
            (response) => {
                if (!this.containerElement)
                    this.containerElement = document.getElementById("container");
                if (this.tableElement)
                    this.containerElement.removeChild(this.tableElement);
                this.data = response.data;
                this.validateTypes()
                this.tableElement = Table.render(this.data);
                this.containerElement.appendChild(this.tableElement);
            }
        )
    }
    validateTypes() {
        console.log("%cValidate types", "color: green;")
        if (this.data[0]) {
            for (let rItem in this.data[0]) {
                let valid = false;
                for (let fm of fieldsModel) {
                    if (fm.nombre == rItem) valid = true;
                    // console.log("  -",fm.nombre)
                }
                let validColor = valid ? "green" : "red";
                console.log(`%cres ${rItem}": ${valid}`, `color: ${validColor};`);
            }
        }
    }
    saveData() {
        let dto = this.formInstance.readFormValues();
        console.log("save data ")
        console.log("%cDTO: ", "color:blue", dto)
        restFetch.post("modificar",dto).then( 
            this.readAndRender() 
        )
    }

}