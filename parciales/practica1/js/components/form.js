import { MemoryManager } from "../services/memory-manager.js";
export class Form {

    constructor() {
        this.setButons();
    }
    formElement;
    btnNewElement;
    titleElement;

    formOpen() {
        if (!this.formElement)
            this.formElement = document.querySelector(".form");
        if (!this.btnNewElement)
            this.btnNewElement = document.getElementById("btnNew")
        if (!this.titleElement)
            this.titleElement = document.getElementById("formTitle")

        this.formElement.classList.remove("close");
        this.btnNewElement.disabled = true;
    }
    formClose() {
        // if (!this.formElement)
        //     this.formElement = document.querySelector(".form");
        this.formElement.classList.add("close");
        this.btnNewElement.disabled = false;

    }

    newDataInForm() {
        this.formOpen();
        this.formElement.setAttribute("style", `top: 80px;`);
        this.titleElement.innerText = "Nuevo item";
    }
    editDataInForm(id,trElement) {
        let item = MemoryManager.instance.data.find(row => row.id == id);
        console.log(item)
        console.log(trElement.offsetTop)
        
        this.formOpen();
        this.formElement.setAttribute("style", `top: ${trElement.offsetTop + 80}px;`);
        this.titleElement.innerText = "Editar ID: "+id;
    }
    cancelEditDataInForm() {
        this.formClose();

        let rows = document.querySelectorAll("tbody tr");
        for (let row of rows) {
            row.classList.remove("active");
        }
    }


    setButons() {
        document.getElementById("btnSubmit").onclick = this.onSubmit;
        document.getElementById("btnRemove").onclick = this.onRemove;
        document.getElementById("btnCancel").onclick = this.onCancel;
        document.getElementById("btnCancelX").onclick = this.onCancel;
        document.getElementById("btnNew").onclick = this.onNew;
    }
    onNew() {
        event.preventDefault();
        MemoryManager.instance.formInstance.newDataInForm();
    }
    onSubmit() {
        event.preventDefault();
    }
    onRemove() {
        event.preventDefault();
    }
    onCancel() {
        event.preventDefault();
        MemoryManager.instance.formInstance.cancelEditDataInForm();
    }

}