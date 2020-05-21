
var data = {};
fetch('./tableData.json')
    .then(function (response) {
        return response.json();
    })
    .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
    .then(function (d) {
        data = d;
        console.log('data:', d);
        let tableElement = Table.render(d);
        console.log('table:', tableElement);
        let bodyElement = document.querySelectorAll("body");
        bodyElement[0].appendChild(tableElement)
        // renderComponents()
    });



export class Table {
    static render(tableData) {
        let tableEl = document.createElement('table');
        tableEl.classList.add("table");

        let theadEl = document.createElement('thead');
        tableData.head  .forEach(thData => {
            let thEl = document.createElement('th');
            thEl.innerHTML = `<p>${thData}</p>`
            theadEl.appendChild(thEl)
        });
        tableEl.appendChild(theadEl)
        
        let tbodyEl = document.createElement('tbody');
        tableData.body.forEach(trData => {
            let trEl = document.createElement('tr');
            for (let key in trData) {
                let tdEl = document.createElement('td');
                tdEl.innerHTML = `<p>${trData[key]}</p>`
                trEl.appendChild(tdEl)
              }
              tbodyEl.appendChild(trEl)
        });
        tableEl.appendChild(tbodyEl)

        return tableEl;
    }
}
