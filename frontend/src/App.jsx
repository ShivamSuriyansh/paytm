import './App.css'
import {BrowserRouter , Routes,Route} from 'react-router-dom';
import Signup from './components/Signup/Signup.jsx';
import Signin from './components/Signin/Signin.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import SendMoney from './components/SendMoney/SendMoney.jsx';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
  </BrowserRouter>
  )
}

export default App
