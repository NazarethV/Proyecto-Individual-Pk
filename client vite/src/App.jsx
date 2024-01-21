//Herramientas de Routing
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

//Componentes principales
import Home from './Views/Home/Home'
import Detail from './Views/Details/Detail'
import NewPokemon from './Views/Form/NewPokemon'
import Landing from './Views/Landing/Landing'
import Navbar from './Components/Navbar/Navbar'

//Acá se renderiza los principales componentes
function App() {
  const { pathname } = useLocation()

  return (
    <div>
      <div>{pathname != '/' && <Navbar/>}</div>

      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/newPokemon' element={<NewPokemon/>}/>
      </Routes>
    </div>
      
  )
}

export default App
