console.log("Scripts");

let refInputText = "";
window.addEventListener('load',manejadores);

function  manejadores(){
    refInputText = document.getElementById("field_text");
    console.log(refInputText)
    refInputText.value ="fsdfzdfsfs"
    refInputText.addEventListener('keyup',(e)=>{
        console.log(e.target.value)
    })

    var btnPlay = document.getElementById("play");
    btnPlay.addEventListener("click",()=>{
        document.getElementById("video").play()
    })
    var btnPause= document.getElementById("pausa");
    btnPause.addEventListener("click",()=>{
        document.getElementById("video").pause()
    })

}
function cerrar(){
    document.getElementById("idDialog").removeAttribute('open');
    console.log("removeAttribute")
}
function abrir(){
    document.getElementById("idDialog").setAttribute('open',true)
    console.log("setAttribute")
}