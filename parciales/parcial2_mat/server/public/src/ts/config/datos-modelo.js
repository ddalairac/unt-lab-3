"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Anuncio = /** @class */ (function () {
    function Anuncio(id, titulo, transaccion, descripcion, precio) {
        if (transaccion === void 0) { transaccion = "ventas"; }
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    return Anuncio;
}());
exports.Anuncio = Anuncio;
var Anuncio_Mascota = /** @class */ (function (_super) {
    __extends(Anuncio_Mascota, _super);
    function Anuncio_Mascota(id, titulo, transaccion, descripcion, precio, animal, raza, fecha_de_nacimiento, vacunas) {
        var _this = _super.call(this, id, titulo, transaccion, descripcion, precio) || this;
        _this.animal = animal;
        _this.raza = raza;
        _this.fecha_de_nacimiento = fecha_de_nacimiento;
        _this.vacunas = vacunas;
        return _this;
    }
    return Anuncio_Mascota;
}(Anuncio));
exports.Anuncio_Mascota = Anuncio_Mascota;
