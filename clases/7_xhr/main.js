

function saludar() {
    console.log("event")
    console.log(event)
}
btn1.onclick = saludar
btn2.onclick = () => { console.log(event) }

// addEventListener genera una cola de funciones asociadas al evento
btn3.addEventListener('click', saludar)
btn3.addEventListener('click', () => {
    console.log("func anonima")
    btn3.removeEventListener('click', this)// no funciona, las anonimas no se pueden sacars
    btn3.removeEventListener('click', saludar)
})



function callXHRGet() {
    console.log("callXHRGet");
    let xhr = new XMLHttpRequest();

    // Manejador de eventos
    xhr.onreadystatechange = () => {
        // readystate: estado de la peticion (4 = done)
        console.log("xhr.readyState", xhr.readyState);
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("xhr.responseText", JSON.parse(xhr.responseText))
                console.log(JSON.stringify(xhr.responseText))
            } else {
                console.log(xhr.status + " " + xhr.statusText)
            }
        }
    }

    xhr.open('GET', 'http://localhost:3000/traerPersonas');
    xhr.send() // en post irian los parametros
}


function callXHRPost(persona) {
    console.log("callXHRPost");
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        console.log("xhr.readyState", xhr.readyState);
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("xhr.responseText", JSON.parse(xhr.responseText))
            } else {
                console.log(xhr.status + " " + xhr.statusText)
            }
        }
    }
    xhr.open('POST', 'http://localhost:3000/altaPersona');
    // siempre hay que setear header para post
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(persona)) // post parametros
}


function callXHRDelete() {
    let id = idDelete.value
    console.log("callXHRDelete");
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        console.log("xhr.readyState", xhr.readyState);
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("xhr.responseText", JSON.parse(xhr.responseText))
            } else {
                console.log(xhr.status + " " + xhr.statusText)
            }
        }
    }
    xhr.open('POST', 'http://localhost:3000/bajaPersona');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // se envian como metodo get: 'key=value&key=value'
    xhr.send(`id=${id}`) // post parametros
    // xhr.send('id=20000') // parametros
}

let formulario = document.forms[0];
formulario.onsubmit = (event) => {
    event.preventDefault(); // evita que recargue
    let name = idname.value
    let lastname = idlastname.value
    let age = idage.value
    let persona = { nombre: name, apellido: lastname, edad: age };
    callXHRPost(persona)
}

btnget.onclick = callXHRGet;
btndelete.onclick = callXHRDelete;