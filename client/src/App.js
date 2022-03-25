import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage  from './components/LandingPage';
import Home from './components/Home';
import DogBreedCreated  from './components/DogBreedCreated';
import Detail from './components/Detail';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route exact path="/"  element={<LandingPage/>} />
      <Route exact path="/home" element={<Home/>} />
      <Route exact path="dogs" element={<DogBreedCreated/>} />
      <Route exact path='/dogs/:id' element={<Detail/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
