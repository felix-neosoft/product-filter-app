import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/register" exact element={<Register/>} />
            <Route path="/" exact  element={<Login/>} />
            <Route path="/dashboard" exact element={<Dashboard/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
