var domByid = document.getElementById("aceptar")

var domsByclass = document.getElementsByClassName("parrafo")
var domsByTag = document.getElementsByTagName("p")
var domsByName = document.getElementsByName("nombre") // query selector no lo reemplaza

// reemplazan los primeros 3 selectores
//? var domsByQuery = document.querySelector() // el primero que encuentre
//? var domsByQuery = document.querySelectorAll() // coleccion
var domByid2 = document.querySelector("#aceptar") 
var domsByclass2 = document.querySelector(".parrafo") 
var domsByTag2 = document.querySelector("p") 
var domByid3 = document.querySelectorAll("#aceptar") // coleccion
var domsByclass3 = document.querySelectorAll(".parrafo") // coleccion
var domsByTag3 = document.querySelectorAll("p") // coleccion
var domsByTag3 = document.querySelectorAll("div p") // coleccion

console.log({domByid,domsByclass,domsByTag,domsByName})
console.log({domByid2,domsByclass2,domsByTag2})
console.log({domByid3,domsByclass3,domsByTag3})
