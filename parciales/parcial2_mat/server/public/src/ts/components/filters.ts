import { FieldCheckbox } from './fields.js';
import { filterModel } from '../config/field-model.js';
import { Anuncio_Mascota } from '../config/datos-modelo.js';
import { MemoryManager } from '../services/memory-manager.js';


export class Filters {
    constructor() {
        this.elements = document.getElementById("f_columns");
        this.addCols();
        this.setButons();
    }
    elements: HTMLElement
    cols: FieldCheckbox[] = []

    addCols() {
        filterModel.forEach((fm) => {
            let field: FieldCheckbox = new FieldCheckbox("fcol-" + fm.nombre, fm.placeholder, fm.isRequired, fm.isDisabled, fm.isVisible);
            this.cols.push(field);
            field.element.childNodes[1].remove();
            (field.element.childNodes[2] as HTMLInputElement).checked = fm.isVisible

            field.element.addEventListener('change', (event) => {
                let checkElement:HTMLInputElement = event.target as HTMLInputElement;
                let checkboxField:FieldCheckbox = this.cols.find((ckbx)=>ckbx.nombre == checkElement.id); 
                checkboxField.isVisible = checkElement.checked;
                MemoryManager.instance.filterAndRender();
            })
            
            this.elements.appendChild(field.element)
        });
    }

    filterCols(list:any[]):any[]{
        this.cols.forEach(field => {
            if(!field.isVisible){
                list.forEach((row)=>{
                    let att:string = (field.nombre as string).split("-")[1];    
                    delete row[att];
                })
            }
        });
        return list;
    }
    applyFilters(data: Anuncio_Mascota[]): any[] {
        let txtInRow: HTMLInputElement
        txtInRow = (!txtInRow) ? document.getElementById("f_txtInRow") as HTMLInputElement : txtInRow;
        let list: Anuncio_Mascota[] = data

        if (txtInRow.value) {
            let search: string = txtInRow.value
            list = list.filter((row) => {
                return (
                    (row.titulo as string).toLowerCase().includes(search.toLowerCase()) ||
                    (row.transaccion as string).toLowerCase().includes(search.toLowerCase()) ||
                    (row.descripcion as string).toLowerCase().includes(search.toLowerCase()) ||
                    (row.animal as string).toLowerCase().includes(search.toLowerCase()) ||
                    (row.raza as string).toLowerCase().includes(search.toLowerCase()) ||
                    (row.vacunas as string).toLowerCase().includes(search.toLowerCase())
                )
            });
        }

        list = this.filterCols(JSON.parse(JSON.stringify(list)));

        return list
    }
    

    setButons() {
        document.getElementById("btnSearch").onclick = this.onSerch;
    }
    onSerch() {
        MemoryManager.instance.filterAndRender();
    }

}