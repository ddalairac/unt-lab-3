import { MemoryManager } from "../services/memory-manager.js";

export class Table {
    static render(tableData) {
        let tableEl = document.createElement('table');


        let theadEl = document.createElement('thead');
        let trEl = document.createElement('tr');
        for (let key in tableData[0]) {
            let thEl = document.createElement('th');
            let title = key.toLowerCase().split('_').join(' ');
            thEl.innerHTML = title
            trEl.appendChild(thEl)
        }
        theadEl.appendChild(trEl)
        tableEl.appendChild(theadEl)


        let tbodyEl = document.createElement('tbody');
        tableData.forEach(trData => {
            let trEl = document.createElement('tr');
            for (let key in trData) {
                let tdEl = document.createElement('td');
                tdEl.innerText = trData[key];
                tdEl.setAttribute('data-before', key.toLowerCase().split('_').join(' '));
                trEl.appendChild(tdEl);
            }
            trEl.onclick = Table.rowClick
            tbodyEl.appendChild(trEl)
        });
        tableEl.appendChild(tbodyEl)

        return tableEl;
    }

    static rowClick() {
        let rows = document.querySelectorAll("tbody tr");
        for (let row of rows) {
            if (row == event.path[1]) {
                if (row.classList.contains("active")) {
                    row.classList.remove("active");
                    MemoryManager.instance.selectedRowElement = null
                } else {
                    row.classList.add("active");
                    MemoryManager.instance.selectedRowElement = row
                }
            } else {
                row.classList.remove("active");
            }
        }
    }
}