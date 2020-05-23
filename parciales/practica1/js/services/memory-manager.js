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
                console.log(`  ${rItem}:%c ${valid}`, `color: ${validColor};`);
            }
        }
    }
    readAndRender() {
        restXHR.get("traer").then(
        // restFetch.get("traer").then(
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
        // .catch(() => { alert("No se pudieron obtener los datos"); });
    }
    saveEditData() {
        let dto = this.formInstance.readFormValues();
        if (this.formInstance.isEdit) {
            console.log("%cDTO Edit: ", "color:blue", dto)
            // restXHR.post("modificar", dto).then(
            restFetch.post("modificar", dto).then(
                () => {
                    console.log("this: ",this)
                    this.formInstance.formClose();
                    this.readAndRender()
                }
            )
            // .catch(() => { alert("No se pudieron guardar los datos"); });

        } else {
            console.log("%cDTO New: ", "color:blue", dto)
            restXHR.post("alta", dto).then(
            // restFetch.post("alta", dto).then(
                () => {
                    this.formInstance.formClose();
                    this.readAndRender()
                }
            )
            // .catch(() => { alert("No se pudo completar la operacion"); });
        }
    }
    removeData() {
        let dto = this.formInstance.readFormValues();
        let params = `id=${dto.id}`;
        console.log("%cDelete: ", "color:blue", params)
        let header = [{ att: "content-type", value: "application/x-www-form-urlencoded" }]
        restXHR.post("baja", params, header).then(
        // let headerFetch = { "content-type": "application/x-www-form-urlencoded" }
        // restFetch.post("baja", params, headerFetch).then(
            () => {
                this.formInstance.formClose();
                this.readAndRender()
            }
        )
        // .catch(() => { alert("No se pudo eliminar el item"); });
    }

}