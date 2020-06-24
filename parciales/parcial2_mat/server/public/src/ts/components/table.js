"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memory_manager_1 = require("../services/memory-manager");
var field_model_1 = require("../config/field-model");
/**
 * Administra el componente tabla
 */
var Table = /** @class */ (function () {
    function Table() {
    }
    /*
    * Crea el elemento tabla y lo retorna
    */
    Table.render = function (tableData) {
        var tableEl = document.createElement('table');
        var theadEl = document.createElement('thead');
        var trEl = document.createElement('tr');
        var key;
        for (var _i = 0, fieldsModel_1 = field_model_1.fieldsModel; _i < fieldsModel_1.length; _i++) {
            var fm = fieldsModel_1[_i];
            key = fm.nombre;
            var thEl = document.createElement('th');
            var title = key.toLowerCase().split(' ').join('_').split('-').join('');
            thEl.innerHTML = title;
            trEl.appendChild(thEl);
        }
        theadEl.appendChild(trEl);
        tableEl.appendChild(theadEl);
        var tbodyEl = document.createElement('tbody');
        tableData.forEach(function (trData) {
            var trEl = document.createElement('tr');
            for (var key_1 in trData) {
                var tdEl = document.createElement('td');
                var value = Table.tdValue(key_1, trData[key_1]);
                tdEl.innerHTML = value; //trData[key];
                tdEl.setAttribute('data-before', key_1.toLowerCase().split(' ').join('_').split('-').join(''));
                trEl.appendChild(tdEl);
            }
            trEl.onclick = Table.rowClick;
            tbodyEl.appendChild(trEl);
        });
        tableEl.appendChild(tbodyEl);
        return tableEl;
    };
    /*
    * Evalua como se debe renderizar el valor del item en la tabla
     */
    Table.tdValue = function (key, value) {
        var renderValue = value;
        for (var _i = 0, fieldsModel_2 = field_model_1.fieldsModel; _i < fieldsModel_2.length; _i++) {
            var fm = fieldsModel_2[_i];
            try {
                if (key == fm.nombre) {
                    switch (fm.type) {
                        case "select":
                        case "radio":
                            fm.options.forEach(function (opt) {
                                if (value == opt.value)
                                    renderValue = opt.label;
                            });
                            break;
                        case "checkbox":
                            renderValue = JSON.parse(value)
                                ? "<i class=\"fas fa-check\"></i>"
                                : "<i class=\"fas fa-times\"></i>";
                            break;
                    }
                }
            }
            catch (error) {
                console.error("error tdValue() en key: " + key);
                console.error(error);
            }
        }
        return renderValue;
    };
    /**
     * Evento Click en row de la tabla
    */
    Table.rowClick = function () {
        /*
        * Inicialmente hice un toogle del row, pero no me parecio una buena experiencia modificar el item a mitad de la edicion,
        * y lo cambie a que solo seleccione el item, y se cierre el form solo desde el form.
        */
        if (memory_manager_1.MemoryManager.instance.formInstance.formElement.classList.contains("close")) {
            var rows = document.querySelectorAll("tbody tr");
            var index = 0;
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                if (row == event.path[1]) {
                    // if (row.classList.contains("active")) {
                    //     row.classList.remove("active");
                    //     MemoryManager.instance.formInstance.cancelEditDataInForm();
                    // } else {
                    memory_manager_1.MemoryManager.instance.formInstance.editDataInForm(index, row.offsetTop);
                    row.classList.add("active");
                    // }
                    // } else {
                    //     row.classList.remove("active");
                }
                index++;
            }
        }
    };
    return Table;
}());
exports.Table = Table;
