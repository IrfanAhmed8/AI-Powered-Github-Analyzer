import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AllRepo from '../pages/AllRepo'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getRepo" element={<AllRepo/>} />
    </Routes>
  )
}

export default App