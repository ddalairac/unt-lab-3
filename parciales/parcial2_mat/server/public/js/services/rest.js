var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class restXHR {
    static get(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            loading.addL();
            return new Promise((resolve, reject) => {
                console.log("%crestXHR.get", "color:blue");
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        loading.removeL();
                        if (xhr.status == 200) {
                            console.log("xhr.responseText", JSON.parse(xhr.responseText));
                            resolve(JSON.parse(xhr.responseText));
                        }
                        else {
                            console.log(xhr.status + " " + xhr.statusText);
                            resolve(null);
                            alert("No se pudieron obtener los datos");
                        }
                    }
                };
                xhr.open('GET', `${restXHR.url}${resource}`);
                xhr.send();
            });
        });
    }
    static post(resource, params, header) {
        return __awaiter(this, void 0, void 0, function* () {
            loading.addL();
            return new Promise((resolve, reject) => {
                console.log("%crestXHR.post", "color:blue");
                let rBody;
                let rHeader;
                if (params && typeof params === 'object') {
                    rBody = JSON.stringify(params);
                }
                else {
                    rBody = params;
                }
                rHeader = !header ? [{ att: "content-type", value: "application/json" }] : header;
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        loading.removeL();
                        if (xhr.status == 200) {
                            console.log("xhr.responseText", JSON.parse(xhr.responseText));
                            resolve(JSON.parse(xhr.responseText));
                        }
                        else {
                            console.log(xhr.status + " " + xhr.statusText);
                            resolve(null);
                            alert("No se pudo completar la operacion");
                        }
                    }
                };
                xhr.open('POST', `${restXHR.url}${resource}`);
                console.log(rHeader);
                rHeader.forEach(h => {
                    xhr.setRequestHeader(h.att, h.value);
                });
                xhr.send(rBody);
            });
        });
    }
}
restXHR.url = "http://localhost:3000/";
export class loading {
    static addL() {
        let loadingEl = document.createElement('div');
        loadingEl.classList.add("loading");
        loadingEl.innerHTML = `<img src="./assets/img/loading.png" class="spiner" alt="loading" >`;
        let bodyEl = document.querySelector("body");
        bodyEl.appendChild(loadingEl);
    }
    static removeL() {
        let bodyEl = document.querySelector("body");
        bodyEl.removeChild(document.querySelector(".loading"));
    }
}
export class restFetch {
    static get(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("%crestFetch.get", "color:blue");
            loading.addL();
            return new Promise((resolve, reject) => {
                fetch(`${restXHR.url}${resource}`)
                    .then((res) => {
                    return res.json();
                })
                    .then((data) => {
                    console.log("%cResponse: ", "color:blue", data);
                    loading.removeL();
                    resolve(data);
                })
                    .catch((err) => {
                    loading.removeL();
                    resolve(null);
                    alert("No se pudieron obtener los datos");
                });
            });
        });
    }
    static post(resource, params, header) {
        return __awaiter(this, void 0, void 0, function* () {
            loading.addL();
            return new Promise((resolve, reject) => {
                console.log("%crestFetch.post", "color:blue");
                let rBody;
                let rHeader;
                if (params && typeof params === 'object') {
                    rBody = JSON.stringify(params);
                }
                else {
                    rBody = params;
                }
                rHeader = !header ? { "content-type": "application/json" } : header;
                fetch(`${restXHR.url}${resource}`, {
                    method: 'post',
                    headers: rHeader,
                    body: rBody
                })
                    .then((res) => {
                    return res.json();
                })
                    .then((data) => {
                    console.log("%cResponse: ", "color:blue", data);
                    loading.removeL();
                    resolve(data);
                })
                    .catch((err) => {
                    loading.removeL();
                    resolve(null);
                    alert("No se pudo completar la operacion");
                });
            });
        });
    }
}
restFetch.url = "http://localhost:3000/";
//# sourceMappingURL=rest.js.map