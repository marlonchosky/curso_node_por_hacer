const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let tarea = listadoPorHacer.find(x => x.descripcion === descripcion);
    if (tarea) {
        tarea.completado = completado;
        guardarDB();
        return true;
    }

    return false;
};

const borrar = (descripcion) => {
    cargarDB();
    let tarea = listadoPorHacer.find(x => x.descripcion === descripcion);
    if (!tarea)
        return false;
    
    listadoPorHacer = listadoPorHacer.filter(x => x.descripcion !== descripcion);
    guardarDB();
    return true;
};

module.exports = {
    crear, getListado, actualizar, borrar
};
