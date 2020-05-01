var info = {};
fetch('./assets/json/translations.json')
    .then(function (response) {
        return response.json();
    })
    .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
    .then(function (data) {
        info = data;
        console.log(data);
    });