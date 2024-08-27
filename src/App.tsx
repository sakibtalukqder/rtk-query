import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './Components/Home'
import Create from './Components/Services/Create'
import View from './Components/Services/View'

function App() {
  return (
    <div className='mx-0 md:mx-16 lg:mx-20'>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/view/:id' element={<View/>}/>
        <Route path='/edit/:id' element={<Create/>}/>
      </Routes>
      
    </div>
  )
}

export default App
