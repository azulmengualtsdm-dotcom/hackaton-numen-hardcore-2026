import { StrictMode } from 'react'
 //Trae una herramienta de control de React 
//que revisa tu código en segundo plano mientras programas y te avisa en la consola si 
// cometiste algún error o usaste código obsoleto.

import { createRoot } from 'react-dom/client'
// el "puente de renderizado". react-dom es la librería encargada de 
// traducir los componentes de React al idioma que entienden los navegadores web (HTML comun).


import './index.css'
import App from './App.jsx'


//se adueña del id=root de el index.html y puede manipularlo, como crear, eliminar o editar
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
