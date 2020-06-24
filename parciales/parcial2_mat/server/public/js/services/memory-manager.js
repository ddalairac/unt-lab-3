import { Table } from '../components/table.js';
import { Form } from '../components/form.js';
import { restXHR, restFetch } from './rest.js';
import { Validate } from './validations.js';
import { fieldsModel } from "../config/field-model.js";
import { ASCIIArt } from '../config/ascii-art.js';
import { Anuncio_Mascota } from '../config/datos-modelo.js';
export class MemoryManager {
    constructor() {
        this.data = [];
        if (MemoryManager._instance) {
            throw "No se puede crear otra instancia de MemoryManager";
        }
        MemoryManager._instance = this;
        console.log(ASCIIArt);
        this.formInstance = new Form();
    }
    static get instance() {
        if (!this._instance)
            new MemoryManager();
        return this._instance;
    }
    validateTypes(data) {
        console.log(" ");
        console.log("%cValidate types", "color: green;");
        if (data[0]) {
            for (let rItem in data[0]) {
                let valid = false;
                for (let fm of fieldsModel) {
                    if (fm.nombre == rItem)
                        valid = true;
                }
                let validColor = valid ? "green" : "red";
                console.log(`  ${rItem}:%c ${valid}`, `color: ${validColor};`);
            }
        }
    }
    crearObjetoAnuncio(data) {
        console.log("data", data);
        let lista = [];
        data.forEach(item => {
            let anuncio = new Anuncio_Mascota(item.id, item.titulo, item.transaccion, item.descripcion, item.precio, item.animal, item.raza, item.fecha_de_nacimiento, item.vacunas);
            lista.push(anuncio);
        });
        console.log("anuncios", lista);
        return lista;
    }
    readAndRender() {
        restXHR.get("traer").then((response) => {
            if (!this.containerElement)
                this.containerElement = document.getElementById("container");
            if (this.tableElement)
                this.containerElement.removeChild(this.tableElement);
            let noDataEl = document.querySelector(".sindatos");
            if (noDataEl)
                this.containerElement.removeChild(noDataEl);
            this.validateTypes(response.data);
            this.data = this.crearObjetoAnuncio(response.data);
            this.tableElement = Table.render(this.data);
            this.containerElement.appendChild(this.tableElement);
        });
    }
    saveEditData() {
        let dto = this.formInstance.readFormValues();
        if (Validate.form(dto)) {
            if (this.formInstance.isEdit) {
                console.log("%cDTO Edit: ", "color:blue", dto);
                restFetch.post("modificar", dto).then(() => {
                    this.formInstance.formClose();
                    this.readAndRender();
                });
            }
            else {
                console.log("%cDTO New: ", "color:blue", dto);
                restXHR.post("alta", dto).then(() => {
                    this.formInstance.formClose();
                    this.readAndRender();
                });
            }
        }
    }
    removeData() {
        let id = this.formInstance.readFormValues().id;
        let params = `id=${id}`;
        console.log("%cDelete: ", "color:blue", params);
        let header = [{ att: "content-type", value: "application/x-www-form-urlencoded" }];
        restXHR.post("baja", params, header).then(() => {
            this.formInstance.formClose();
            this.readAndRender();
        });
    }
}
//# sourceMappingURL=memory-manager.js.map