
var data = {};
fetch('./assets/json/translations.json')
    .then(function (response) {
        return response.json();
    })
    .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
    .then(function (d) {
        data = d;
        renderComponents()
    });

class AboutComponent {
    static setTtem(img, title, text) {
        let divElement = document.createElement('div');
        divElement.classList.add("col-4");
        divElement.classList.add("md");
        divElement.innerHTML = `
            <img src="${img}" alt="icon ${title}">
            <h3 class="title-3 uppercase">${title}</h3>
            <p>${text}</p>`;
        return divElement;
    }
}

class PropertiesComponent {
    static setTtem(img, title, text, price, bath, garage, bed) {
        let divElement = document.createElement('div');
        divElement.classList.add("col-4");
        divElement.classList.add("md");
        divElement.innerHTML = ` 
        <img src="${img}" alt="Foto propiedad">
        <div class="info">
            <h3 class="title-3">${title}</h3>
            <p>${text}</p>
            <strong class="c-secondary">$${price}</strong>
            <div class="row icons">
                <div class="col"><img src="./assets/img/icono_wc.svg" alt=""> ${bath}</div>
                <div class="col"><img src="./assets/img/icono_estacionamiento.svg" alt="">${garage}</div>
                <div class="col"><img src="./assets/img/icono_dormitorio.svg" alt=""> ${bed}</div>
            </div>
            <button onclick="PropertiesComponent.action('${title}') ">Ver propiedad</button>
        </div>`
        return divElement;
    }
    static action(title) {
        alert("prop " + title)
    }
}

class BlogComponent {
    static setTtem(img, title, text, date, by) {
        let articleElement = document.createElement('article');
        articleElement.classList.add("row");
        articleElement.innerHTML = ` 
            <div class="col-4 sm "><img src="${img}" alt="Foto propiedad"></div>
            <div class="col-8 sm ">
                <h3 class="title-3">${title}</h3>
                <hr>
                <p>Escrito el: <strong class="c-secondary">${date}</strong> por: <strong class="c-secondary">${by}</strong></p>
                <p>${text}</p>
            </div>`;
        return articleElement;
    }
}

function renderStaticComponents() {
    var aboutCont = document.getElementById("aboutData");
    data.about.us.forEach(item => {
        let element = AboutComponent.setTtem(item.img, item.title, item.text);
        aboutCont.appendChild(element)
    });
    var propertiesCont = document.getElementById("propertiesData");
    data.properties.prop.forEach(item => {
        let element = PropertiesComponent.setTtem(item.img, item.title, item.text, item.price, item.bath, item.garage, item.bed);
        propertiesCont.appendChild(element)
    });
}
function renderBlogComponents() {
    // var blogArticles = [];
    // data.blog.articles.forEach(item => {
    //     blogArticles.push(BlogComponent.setTtem(item.img, item.title, item.text, item.date, item.by));
    // });

    var blogCont = document.getElementById("blogData");
    
    function removeArticle() {
        let articles = blogCont.getElementsByTagName("article")
        // console.log("remove", articles)
        if (articles && articles.length > 1 ) {
            // console.log("remove", articles[0])
            articles[0].remove()
        }
    }
    function addArticle() {
        let edata = data.blog.articles[i]
        let element = BlogComponent.setTtem(edata.img, edata.title, edata.text, edata.date, edata.by)
        blogCont.appendChild(element)
        setTimeout(() => {
            element.classList.add('in');
            // console.log(element)
            
            // console.log(i)
        }, 10);
    }
    var i = 0
    addArticle()
    setInterval(() => {
        removeArticle();
        setTimeout(() => {
            i++
            if (i >= data.blog.articles.length) {
                i = 0;
            }
            addArticle();
        }, 0);
    }, 7000);
}
function renderComponents() {
    renderStaticComponents()
    renderBlogComponents()
}