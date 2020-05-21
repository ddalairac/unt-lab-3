import { Table } from '../components/table.js';
import { restXHR, restFetch } from './rest.js';
export class Memorymanager {
    data
    rowSelected
    readAndRender() {
        restFetch.get("traer").then(
            (response) => {
                this.data = response.data
                let tableEl = Table.render(this.data)
                let containerEl = document.getElementById("container");
                containerEl.appendChild(tableEl)
            }
        )
    }
}