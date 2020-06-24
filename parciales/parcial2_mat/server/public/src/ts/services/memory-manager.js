"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table_1 = require("../components/table");
var form_1 = require("../components/form");
var rest_1 = require("./rest");
var validations_1 = require("./validations");
var field_model_1 = require("../config/field-model");
var ascii_art_1 = require("../config/ascii-art");
var datos_modelo_1 = require("../config/datos-modelo");
/**
 * Administra la memoria de la aplicacion
 */
var MemoryManager = /** @class */ (function () {
    function MemoryManager() {
        this.data = [];
        if (MemoryManager._instance) {
            throw "No se puede crear otra instancia de MemoryManager";
        }
        MemoryManager._instance = this;
        console.log(ascii_art_1.ASCIIArt);
        this.formInstance = new form_1.Form();
        // this.data = [];
    }
    Object.defineProperty(MemoryManager, "instance", {
        get: function () {
            if (!this._instance)
                new MemoryManager();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    // selectID;
    /**
     * Valida que la informacion recibida sea este correctamente modelada
     */
    MemoryManager.prototype.validateTypes = function (data) {
        console.log(" ");
        console.log("%cValidate types", "color: green;");
        if (data[0]) {
            for (var rItem in data[0]) {
                var valid = false;
                for (var _i = 0, fieldsModel_1 = field_model_1.fieldsModel; _i < fieldsModel_1.length; _i++) {
                    var fm = fieldsModel_1[_i];
                    if (fm.nombre == rItem)
                        valid = true;
                    // console.log("  -",fm.nombre)
                }
                var validColor = valid ? "green" : "red";
                console.log("  " + rItem + ":%c " + valid, "color: " + validColor + ";");
            }
        }
    };
    MemoryManager.prototype.crearObjetoAnuncio = function (data) {
        console.log("data", data);
        var lista = [];
        data.forEach(function (item) {
            var anuncio = new datos_modelo_1.Anuncio_Mascota(item.id, item.titulo, item.transaccion, item.descripcion, item.precio, item.animal, item.raza, item.fecha_de_nacimiento, item.vacunas);
            lista.push(anuncio);
        });
        console.log("anuncios", lista);
        return lista;
    };
    /**
     * Ejecuta la llamada para obtener la info
     */
    MemoryManager.prototype.readAndRender = function () {
        var _this = this;
        rest_1.restXHR.get("traer").then(
        // restFetch.get("traer").then(
        function (response) {
            if (!_this.containerElement)
                _this.containerElement = document.getElementById("container");
            if (_this.tableElement)
                _this.containerElement.removeChild(_this.tableElement);
            var noDataEl = document.querySelector(".sindatos");
            if (noDataEl)
                _this.containerElement.removeChild(noDataEl);
            _this.data = _this.validateTypes(response.data);
            _this.data = _this.crearObjetoAnuncio(response.data);
            _this.tableElement = table_1.Table.render(_this.data);
            _this.containerElement.appendChild(_this.tableElement);
        });
    };
    /**
     * Ejecuta las llamadas para agregar o editar un item
     */
    MemoryManager.prototype.saveEditData = function () {
        var _this = this;
        var dto = this.formInstance.readFormValues();
        if (validations_1.Validate.form(dto)) {
            if (this.formInstance.isEdit) {
                console.log("%cDTO Edit: ", "color:blue", dto);
                // restXHR.post("modificar", dto).then(
                rest_1.restFetch.post("modificar", dto).then(function () {
                    _this.formInstance.formClose();
                    _this.readAndRender();
                });
            }
            else {
                console.log("%cDTO New: ", "color:blue", dto);
                rest_1.restXHR.post("alta", dto).then(
                // restFetch.post("alta", dto).then(
                function () {
                    _this.formInstance.formClose();
                    _this.readAndRender();
                });
            }
        }
    };
    /**
     * Ejecuta la llamada para borrar un item
     */
    MemoryManager.prototype.removeData = function () {
        var _this = this;
        var id = this.formInstance.readFormValues().id;
        var params = "id=" + id;
        console.log("%cDelete: ", "color:blue", params);
        var header = [{ att: "content-type", value: "application/x-www-form-urlencoded" }];
        rest_1.restXHR.post("baja", params, header).then(
        // let headerFetch = { "content-type": "application/x-www-form-urlencoded" }
        // restFetch.post("baja", params, headerFetch).then(
        function () {
            _this.formInstance.formClose();
            _this.readAndRender();
        });
    };
    return MemoryManager;
}());
exports.MemoryManager = MemoryManager;
