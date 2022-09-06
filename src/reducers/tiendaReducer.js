import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const estadoInicial = {
    productos:
        [
            {id: 1, nombre: 'Camisa ReactJS', precio: 50},
            {id: 2, nombre: 'Camisa VueJS', precio: 40},
            {id: 3, nombre: 'Camisa Node.js', precio: 30}
           
        ],
    carrito: []
    
}


const reducer = (estado = estadoInicial, accion) => {

    return estado;
}

export default reducer;