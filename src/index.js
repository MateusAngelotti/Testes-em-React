import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Rotas from './simular-login/router-simular';
import BlogApp from './BlogPost/BlogApp';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rotas/>

    
  </React.StrictMode>
);


