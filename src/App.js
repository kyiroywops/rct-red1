import React, {useState} from 'react';
import styled from 'styled-components';
import {NavLink, Routes, Route} from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Tienda from './componentes/Tienda';
import Blog from './componentes/Blog';
import Error404 from './componentes/Error404';
import Carrito from './componentes/Carrito';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/tiendaReducer';

const App = () => {
  

  const [carrito, cambiarCarrito] = useState([]);

  const agregarProductoAlCarrito = (idProductoAAgregar, nombre) => {
    if(carrito.length === 0){
      cambiarCarrito([{id: idProductoAAgregar, nombre: nombre, cantidad: 1}]);
    } else{
      const nuevoCarrito = [...carrito];
    
      const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
      return productoDeCarrito.id === idProductoAAgregar;

     }).length > 0;

      if(yaEstaEnCarrito){
        nuevoCarrito.forEach((productoDeCarrito, index) => {
          if(productoDeCarrito.id === idProductoAAgregar){
            const cantidad = nuevoCarrito[index].cantidad;
            nuevoCarrito[index] = {id: idProductoAAgregar, nombre: nombre, cantidad: cantidad + 1};

          }
        });

      } else {
          nuevoCarrito.push({id: idProductoAAgregar, nombre: nombre, cantidad: 1});
        
        
      
      }



      cambiarCarrito(nuevoCarrito);
      }
  }

// usaremos createstore para crear el store, que en realidad podriamos usar redux toolkit que nos facilitaria la vida.

const store = createStore(reducer);

  return ( 
    <Provider store={store}>
      <Contenedor>
        <Menu>

          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/tienda">Tienda</NavLink>
        </Menu>
        <main>
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tienda" element={<Tienda agregarProductoAlCarrito={agregarProductoAlCarrito} />} />

          </Routes>
        </main>
        <aside>
          <Carrito carrito={carrito} />
        </aside>

      </Contenedor>
    </Provider>
   );
}

// cs styled-components

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;
 
export default App;