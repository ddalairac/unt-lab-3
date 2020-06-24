import { FieldCheckbox } from './fields.js';
import { filterModel } from '../config/field-model.js';
import { MemoryManager } from '../services/memory-manager.js';
export class Filters {
    constructor() {
        this.cols = [];
        this.elements = document.getElementById("f_columns");
        this.addCols();
        this.setButons();
    }
    addCols() {
        filterModel.forEach((fm) => {
            let field = new FieldCheckbox("fcol-" + fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible);
            this.cols.push(field);
            field.element.childNodes[1].remove();
            field.element.childNodes[2].checked = fm.isVisible;
            field.element.addEventListener('change', (event) => {
                let checkElement = event.target;
                let checkboxField = this.cols.find((ckbx) => ckbx.nombre == checkElement.id);
                checkboxField.isVisible = checkElement.checked;
                MemoryManager.instance.filterAndRender();
            });
            this.elements.appendChild(field.element);
        });
    }
    filterCols(list) {
        this.cols.forEach(field => {
            if (!field.isVisible) {
                list.forEach((row) => {
                    let att = field.nombre.split("-")[1];
                    delete row[att];
                });
            }
        });
        return list;
    }
    applyFilters(data) {
        let txtInRow;
        txtInRow = (!txtInRow) ? document.getElementById("f_txtInRow") : txtInRow;
        let list = data;
        if (txtInRow.value) {
            let search = txtInRow.value;
            list = list.filter((row) => {
                return (row.titulo.toLowerCase().includes(search.toLowerCase()) ||
                    row.transaccion.toLowerCase().includes(search.toLowerCase()) ||
                    row.descripcion.toLowerCase().includes(search.toLowerCase()) ||
                    row.animal.toLowerCase().includes(search.toLowerCase()) ||
                    row.raza.toLowerCase().includes(search.toLowerCase()) ||
                    row.vacunas.toLowerCase().includes(search.toLowerCase()));
            });
        }
        list = this.filterCols(JSON.parse(JSON.stringify(list)));
        return list;
    }
    setButons() {
        document.getElementById("btnSearch").onclick = this.onSerch;
    }
    onSerch() {
        MemoryManager.instance.filterAndRender();
    }
}
//# sourceMappingURL=filters.js.map