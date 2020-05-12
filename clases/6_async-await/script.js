import { callTo, askForHelp } from "./modulo.js";
import {  } from "./selectors.js";

askForHelp("Police");

console.log("Log sincronico")


var data = {};
fetch('./translations.json')
    .then(function (response) {
        return response.json();
    })
    .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
    .then(function (d) {
        data = d;
        console.log('data:', d);
        // renderComponents()
    });