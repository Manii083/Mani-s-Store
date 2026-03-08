import {Routes , Route} from 'react-router'
import { HomePage } from './Pages/HomePage'


import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<div>Testing Purpose</div>} />
    </Routes>
  );
}

export default App
